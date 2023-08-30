package br.com.maidahealth.telemedapi.migration;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import br.com.maidahealth.telemedapi.migration.InsuredImportService.InsuredVO;
import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.repositories.InsuredRepository;
import br.com.maidahealth.telemedapi.utils.Utils;

@Service
public class InsuredUpdateDocwayId {

	private static final Logger logger = Logger.getLogger(InsuredUpdateDocwayId.class.getName());

	private static final String pathFile = "/home/files/Atualizacao_beneficiariosIPM_baseDocway_250620_ajustada.csv";
	
	@Autowired
	InsuredRepository repository;
	
	public void execute() {
		logger.log(Level.INFO, "Atualizando ids docway dos segurados");
//		if(repository.countIdDocway() == 0) {
			List<InsuredVO> insureds = readFile();
			if(!CollectionUtils.isEmpty(insureds)) {
				System.out.println("Segurados lidos:"+insureds.size());
				checkForDuplicates(insureds);
				processInsureds(insureds);
			}
//		}
	}
	
	private void checkForDuplicates(List<InsuredVO> insureds) {
		Map<String,String> map = new HashMap<String, String>();
		Set<InsuredVO> duplicates = new HashSet<InsuredVO>();
		for (InsuredVO insuredVO : insureds) {
			String key = insuredVO.getRegistrationNumber()+insuredVO.getName();
			String docwayId = insuredVO.getDocwayId();
			if(map.containsKey(key)) {
				String docwayidFromMap = map.get(key);
				if(!docwayId.equals(docwayidFromMap)) {
					duplicates.add(insuredVO);
					duplicates.add(getDuplicatesFromList(insureds, insuredVO));
				}
			}else {
				map.put(key, insuredVO.getDocwayId());
			}
		}
		if(!CollectionUtils.isEmpty(duplicates)) {
			System.err.println("Segurados duplicados com docwayids diferentes: ");
			duplicates.stream().forEach(System.err::println);
			insureds.removeAll(duplicates);
		}
	}

	private InsuredVO getDuplicatesFromList(List<InsuredVO> insureds, InsuredVO insuredVO) {
		Optional<InsuredVO> optional = insureds.stream().filter(i -> i.getName().equals(insuredVO.getName())
				&& i.getRegistrationNumber().equals(insuredVO.getRegistrationNumber())).findFirst();
		if(optional.isPresent())
			return optional.get();
		return null;
	}

	private void processInsureds(List<InsuredVO> insureds) {
		Map<String, List<InsuredVO>> mapDocwayId = insureds.stream().collect(Collectors.groupingBy(InsuredVO::getRegistrationNumber));
		List<Insured> insuredsDb = repository.getInsuredsByRegistrationNumber(mapDocwayId.keySet());
		System.out.println("Segurados do banco de dados: "+insuredsDb.size());
		Map<String, List<Insured>> mapInsuredDb = insuredsDb.stream().collect(Collectors.groupingBy(Insured::getRegistrationNumber));
		matchInsureds(mapDocwayId,mapInsuredDb);
	}

	
	private void matchInsureds(Map<String, List<InsuredVO>> mapDocwayId, Map<String, List<Insured>> mapInsuredDb) {
		Set<String> registrationNumbers = mapDocwayId.keySet();
		List<Insured> updatedInsureds = new ArrayList<Insured>();
		for (String registrationNumber : registrationNumbers) {
			System.out.println("processando matrícula: "+registrationNumber);
			List<InsuredVO> insuredsDocwayId = mapDocwayId.get(registrationNumber);
			List<Insured> insuredsDb = mapInsuredDb.get(registrationNumber);
			updateInsureds(insuredsDocwayId, insuredsDb, updatedInsureds);
		}
		if(!CollectionUtils.isEmpty(updatedInsureds)) {
			repository.saveAll(updatedInsureds);
			System.out.println("==============RESULTADO==============");
			System.out.println("Segurados atualizados: "+updatedInsureds.size());
		}
	}

	private void updateInsureds(List<InsuredVO> insuredsDocwayId, List<Insured> insuredsDb, List<Insured> updatedInsureds) {
		if(CollectionUtils.isEmpty(insuredsDocwayId)) {
			System.err.println("Matrícula sem correspondencia no banco");
			return;
		}
		for (InsuredVO insuredVO : insuredsDocwayId) {
			Insured insured = match(insuredVO, insuredsDb);
			if(insured != null) {
				insured.setDocwayId(insuredVO.getDocwayId());
				updatedInsureds.add(insured);
			}
		}
	}

	private Insured match(InsuredVO insuredVO, List<Insured> insuredsDb) {
		List<Insured> matches = insuredsDb.stream().filter(
															i -> i.getName().equals(insuredVO.getName())
															).collect(Collectors.toList());
		if(CollectionUtils.isEmpty(matches)) {
			System.err.println("Não foi encontrado segurado com o nome correspondente. Matrícula: "+insuredVO.getRegistrationNumber() +" | nome: "+insuredVO.getName());
			return null;
		}
		if(matches.size() > 1) {
			System.err.println("Foram encontrados mais de um segurado com o nome correspondente. Matrícula: "+insuredVO.getRegistrationNumber() +" | nome: "+insuredVO.getName());
			return null;
		}
		return matches.get(0);
	}
	
	@SuppressWarnings("unused")
	private boolean cpfEqualsIgnoreNull(String str1, String str2){
		if(StringUtils.isEmpty(str1) || StringUtils.isEmpty(str2)) {
			return true;
		}
		String cpf1 = Utils.complete(str1, 11, "0");
		String cpf2 = Utils.complete(str2, 11, "0");
		if(cpf1.equals(cpf2)) {
			return true;
		}
		return false;
	}

	private List<InsuredVO> readFile() {
		List<InsuredVO> insureds = new ArrayList<InsuredVO>();
		BufferedReader br = null;
		String line = "";
		String csvDivisor = ",|;(?=([^\"]*\"[^\"]*\")*[^\"]*$)";
		try {
			br = new BufferedReader(new InputStreamReader(new FileInputStream(pathFile), "ISO-8859-15"));
			br.readLine(); // Cabecalho
			int lineCount = 2;
			while ((line = br.readLine()) != null) {
				String[] info = line.split(csvDivisor);
				
				String docwayId = get(info, 0);
				String cpf = get(info, 1);		
				String name = get(info, 2);
				String registrationNumber = get(info, 3);
				InsuredVO insuredVO = new InsuredVO(docwayId, registrationNumber, cpf, name, lineCount);
//				insuredVO.validate();
				insureds.add(insuredVO);
				lineCount++;
			}
			return insureds;
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			logger.log(Level.WARNING ,e.getMessage());
		} catch (IOException e) {
			e.printStackTrace();
			logger.log(Level.WARNING ,e.getMessage());
		} finally {
			if (br != null) {
				try {
					br.close();
				} catch (IOException e) {
					e.printStackTrace();
					logger.log(Level.WARNING ,e.getMessage());
				}
			}
		}
		return null;
	}
	
	public String get(String[] array, int id) {
		try{
			return array[id].replace("\"","").trim().replaceAll(";", ",");
		}catch (ArrayIndexOutOfBoundsException e) {
			return "";
		}
	}
	
}

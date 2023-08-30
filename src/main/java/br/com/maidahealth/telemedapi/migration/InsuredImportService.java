package br.com.maidahealth.telemedapi.migration;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import br.com.maidahealth.telemedapi.dto.MessageDto;
import br.com.maidahealth.telemedapi.enums.GenderEnum;
import br.com.maidahealth.telemedapi.exceptions.InvalidException;
import br.com.maidahealth.telemedapi.models.Insured;
import br.com.maidahealth.telemedapi.models.InsuredType;
import br.com.maidahealth.telemedapi.models.Profile;
import br.com.maidahealth.telemedapi.models.User;
import br.com.maidahealth.telemedapi.models.UserType;
import br.com.maidahealth.telemedapi.repositories.InsuredRepository;
import br.com.maidahealth.telemedapi.repositories.ProfileRepository;
import br.com.maidahealth.telemedapi.repositories.UserRepository;
import br.com.maidahealth.telemedapi.utils.Utils;

@Service
public class InsuredImportService {
	
	private static final Logger logger = LoggerFactory.getLogger(InsuredImportService.class);
	
	@Autowired
	InsuredRepository repository;

	@Autowired
	private ProfileRepository profileRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private InsuredRepository insuredRepository;

	private Profile insuredProfile;
	
	public ResponseEntity<Object> process(MultipartFile multipartFile) {
			
			validateFile(multipartFile);
			
			try {
				File file = new File(Utils.getTempDir()+multipartFile.getOriginalFilename());
				FileUtils.writeByteArrayToFile(file, multipartFile.getBytes());
				List<InsuredVO> insureds = readFile(file);
				List<InsuredVO> insuredsWithError = new ArrayList<InsuredImportService.InsuredVO>();
				if(!CollectionUtils.isEmpty(insureds)) {
					logger.info("Segurados lidos:"+insureds.size());
					Set<InsuredVO> dups = validateDuplicateds(insureds);
					insuredsWithError.addAll(dups);
					logger.info("Segurados para processamento:"+insureds.size());
	//				validate(insureds);
					processInsureds(insureds, insuredsWithError);
					ResultDto result = computeResults(insureds, insuredsWithError);
					return ResponseEntity.ok(result);
				}
			} catch (Exception e) {
				return ResponseEntity.unprocessableEntity().body(new MessageDto(e.getMessage()));
			}
			
			return null;
		}

	private ResultDto computeResults(List<InsuredVO> insureds, List<InsuredVO> insuredsWithError) {
		int withErrors = insuredsWithError.size();
		int alreadyRegistered = insureds.stream().filter(InsuredVO::isAlreadyRegistered).collect(Collectors.toList()).size();
		int totalRegistered = insureds.size();
		return new ResultDto(totalRegistered, withErrors, alreadyRegistered, insuredsWithError);
	}

	private void validateFile(MultipartFile multipartFile) {
		if(multipartFile == null || multipartFile.isEmpty()) {
			throw new InvalidException("O arquivo de importação não pode ser vazio.");
		}
		String extension = FilenameUtils.getExtension(multipartFile.getOriginalFilename());
		if(StringUtils.isEmpty(extension) || !extension.toUpperCase().equals("CSV")) {
			throw new InvalidException("O arquivo de importação deve estar na extensão .csv");
		}
	}

	/**
	 * Método usado para validar inconsistências na importação de segurados. Lista
	 * todas as matrículas presentes no arquivo de importação que não estão no banco
	 * de dados.
	 * 
	 * @param insureds
	 */
	@SuppressWarnings("unused")
	private void validate(List<InsuredVO> insureds) {
		Set<String> todasMatriculas = insureds.stream().map(InsuredVO::getRegistrationNumber).collect(Collectors.toSet());
		List<String> todasMatriculasBanco = insuredRepository.getAllRegistrationNumbers();
		todasMatriculas.removeAll(todasMatriculasBanco);
		System.out.println("======Matrículas não persistidas==============");
		todasMatriculas.stream().forEach(System.err::println);
	}

	private Set<InsuredVO> validateDuplicateds(List<InsuredVO> insureds) {
//		Set<String> cpfs = new HashSet<String>();
		Set<String> numbers = new HashSet<String>();
		Set<InsuredVO> duplicateds = new HashSet<InsuredVO>();
		insureds.stream().forEach(i->{
//			if(!StringUtils.isEmpty(i.getCpf())) {
//				boolean added = cpfs.add(i.getCpf());
//				if(!added) {
//					includeDuplicatedsForExclusion(i, insureds, duplicateds);
//				}
//			}
			if(!StringUtils.isEmpty(i.getHealthInsuranceNumber())) {
				boolean added = numbers.add(i.getHealthInsuranceNumber());
				if(!added) {
					List<InsuredVO> dups = insureds.stream().filter(in->in.getHealthInsuranceNumber().equals(i.getRegistrationNumber())).collect(Collectors.toList());
					duplicateds.addAll(dups);
				}
			}
		});
		logger.error("Duplicados: "+duplicateds.size());
		duplicateds.stream().forEach(d->d.setError("Existe outro segurado com o número de matrícula informado."));
		insureds.removeAll(duplicateds);
		return duplicateds;
	}

	@SuppressWarnings("unused")
	private void includeDuplicatedsForExclusion(InsuredVO holder, List<InsuredVO> insureds, Set<InsuredVO> duplicateds) {
		Set<InsuredVO> duplicatedHolders = new HashSet<InsuredImportService.InsuredVO>();
		duplicatedHolders.addAll(getInsuredsByCpf(holder.getCpf(), insureds));
		
		duplicatedHolders.forEach(duplicatedHolder->{
			duplicateds.add(duplicatedHolder);
			if(duplicatedHolder.getType().equals(InsuredType.HOLDER)) {
				List<InsuredVO> dependents = insureds.stream().filter(insured->
									insured.getType().equals(InsuredType.DEPENDENT) && insured.getRegistrationNumber().equals(holder.getRegistrationNumber())
									).collect(Collectors.toList());
				duplicateds.addAll(dependents);
			}
		});
	}
	
	private List<InsuredVO> getInsuredsByCpf(String cpf, List<InsuredVO> insureds) {
		List<InsuredVO> list = insureds.stream().filter(insured->
									insured.getCpf().equals(cpf)
								).collect(Collectors.toList());
		return list;
	}

	private void processInsureds(List<InsuredVO> insureds, List<InsuredVO> insuredsWithError) {
		 Optional<Profile> optional = profileRepository.findByName(UserType.INSURED.name());
		 if(optional.isPresent()) {
			 insuredProfile = optional.get();
		 }
		Map<String, List<InsuredVO>> mapRegistrationNumber = insureds.stream().collect(Collectors.groupingBy(InsuredVO::getRegistrationNumber));
		int counter = 1;
		Set<String> registrationNumbers = mapRegistrationNumber.keySet();
		int total = registrationNumbers.size();
		for (String registrationNumber : registrationNumbers) {
			logger.info(counter+"/"+total+" -> "+registrationNumber);
			List<InsuredVO> holderAndDependents = mapRegistrationNumber.get(registrationNumber);
			if(!StringUtils.isEmpty(registrationNumber)) {
				convertToInsured(holderAndDependents, registrationNumber, insuredsWithError);
			}else {
				InsuredVO insured = holderAndDependents.iterator().next();
				String msg = "linha sem número de matrícula: "+insured.getLine() + " - "+insured.getName();
				insured.setError(msg);	
				insuredsWithError.add(insured);
				logger.error(msg);
			}
			counter++;
		}
		logger.info("===========Fim do processamento===========");
	}

	private Insured convertToInsured(List<InsuredVO> holderAndDependents, String registrationNumber, List<InsuredVO> insuredsWithError) {
		Insured insured = null;
		if(CollectionUtils.isEmpty(holderAndDependents)) {
			logger.error("Matricula sem segurados mapeados: "+registrationNumber);
			return null;
		}
		boolean hasOnlyPublicEmployee = hasOnlyPublicEmployee(holderAndDependents);
		if(hasOnlyPublicEmployee) {
			insured = createInsured(holderAndDependents.iterator().next());
		}else {
			insured = createHolderAndDependents(holderAndDependents, insuredsWithError);
		}
		return insured;
	}

	private Insured createHolderAndDependents(List<InsuredVO> holderAndDependents, List<InsuredVO> insuredsWithError) {
		InsuredVO holder = getHolder(holderAndDependents);
		List<InsuredVO> dependents = getDependents(holderAndDependents);
		if(holder == null) {
			InsuredVO dependent = holderAndDependents.iterator().next();
			Optional<Insured> optionalHolder = insuredRepository.findByRegistrationNumberAndType(dependent.getRegistrationNumber(), InsuredType.HOLDER);
			if(optionalHolder.isPresent()) {
				return createHolderAndDependents(optionalHolder.get(), dependents, insuredsWithError);
			}
			logger.error("Dependente sem titular: "+holderAndDependents.iterator().next().getRegistrationNumber());			
		}
		return createHolderAndDependents(holder, dependents, insuredsWithError);

	}

	private Insured createHolderAndDependents(Insured holder, List<InsuredVO> dependents, List<InsuredVO> insuredsWithError) {	
		for (InsuredVO dependentVO : dependents) {
			createDependent(holder, dependentVO);
		}
		return holder;
	}

	private Insured createHolderAndDependents(InsuredVO holderVO, List<InsuredVO> dependents, List<InsuredVO> insuredsWithError) {
		Insured holderDb = null;
		if(holderVO != null) {
			holderDb = createInsured(holderVO);
		}
		for (InsuredVO dependentVO : dependents) {
			createDependent(holderDb, dependentVO);
		}
		return holderDb;
	}
	
	private Insured createInsured(InsuredVO publicServantVO) {
		Date birthDate = Utils.parse(publicServantVO.getBirthDate());
		String healthInsuranceNumber = getHealthInsuranceNumber(publicServantVO);
		Optional<Insured> optional = insuredRepository.findByHealthInsuranceNumber(healthInsuranceNumber);
		if(optional.isPresent()) {
			Insured insured = optional.get();
			publicServantVO.setAlreadyRegistered(true);
			String msg = "Já existe um beneficiário cadastrado com o número de cartão informado: "+healthInsuranceNumber +" - "+insured.getName();
			logger.error(msg);
			return insured;
		}
		
		String cpf = StringUtils.isEmpty(publicServantVO.getCpf()) ? null : Utils.complete(publicServantVO.getCpf(), 11, "0") ;
		Insured insured = new Insured(cpf, publicServantVO.getName(), healthInsuranceNumber, publicServantVO.getRegistrationNumber(), birthDate, publicServantVO.getType());
		insuredRepository.save(insured);
		createUser(insured);
		return insured;
	}
	
	private String getHealthInsuranceNumber(InsuredVO publicServantVO) {
		String healthInsuranceNumber = "";
		if(publicServantVO.getType().equals(InsuredType.PUBLIC_EMPLOYEE)) {
			healthInsuranceNumber = publicServantVO.getRegistrationNumber();
		}else {
			healthInsuranceNumber = publicServantVO.getHealthInsuranceNumber();
		}
		return healthInsuranceNumber;
	}

	private Insured createDependent(Insured holder, InsuredVO insuredVO){
		Date birthDate = Utils.parse(insuredVO.getBirthDate());
		String cpf = StringUtils.isEmpty(insuredVO.getCpf()) ? null : Utils.complete(insuredVO.getCpf(), 11, "0");
		Optional<Insured> optional = insuredRepository.findByHealthInsuranceNumber(insuredVO.getHealthInsuranceNumber());
		if(optional.isPresent()) {
			Insured insured = optional.get();
			insured.setHolder(holder);
			insuredVO.setAlreadyRegistered(true);
			logger.error("Já existe um beneficiário cadastrado com o número de cartão informado: "+insuredVO.getHealthInsuranceNumber() +" - "+insured.getName());
			return insured;
		}
		Insured dependent = new Insured(cpf, insuredVO.getName(), insuredVO.getHealthInsuranceNumber(), insuredVO.getRegistrationNumber(), birthDate, insuredVO.getType());
		dependent.setHolder(holder);
		insuredRepository.save(dependent);
		createUser(dependent);
		return dependent;
	}
	
	private User createUser(Insured insured) {
		String birthDateString = Utils.parse(insured.getBirthDate());
		String password =  insured.getRegistrationNumber()+birthDateString;
		password = new BCryptPasswordEncoder().encode(password);
		String login = getLoginByInsuredType(insured);
		String email = login+"@ipm.email.com";
		User user = new User(login, insured.getName(), password, email, insured, Arrays.asList(insuredProfile));
		user.setInsured(insured);
		userRepository.save(user);		
		return user;
	}
	
	private String getLoginByInsuredType(Insured insured) {
		String login = "";
		if(insured.getType().equals(InsuredType.PUBLIC_EMPLOYEE)) {
			login = insured.getCpf();
		}else {
			login = insured.getHealthInsuranceNumber();
		}
		return login;
	}

	private InsuredVO getHolder(List<InsuredVO> holderAndDependents) {
		Optional<InsuredVO> optional = holderAndDependents.stream().filter(b-> b.getType().equals(InsuredType.HOLDER)).findFirst();
		if(optional.isPresent()) {
			return optional.get();
		}
		return null;
	}
	
	private List<InsuredVO> getDependents(List<InsuredVO> holderAndDependents) {
		try {
			List<InsuredVO> dependents = holderAndDependents.stream().filter(b-> b.getType().equals(InsuredType.DEPENDENT)).collect(Collectors.toList());
			return dependents;
		}catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}


	private boolean hasOnlyPublicEmployee(List<InsuredVO> holderAndDependents) {
		Optional<InsuredVO> optional = holderAndDependents.stream().filter(i -> !i.getType().equals(InsuredType.PUBLIC_EMPLOYEE)).findFirst();
		if(optional.isPresent()) {
			return false;
		}
		if(holderAndDependents.size() == 1) {
			return true;
		}
		throw new InvalidException("Existem mais de um servidor com o seguinte número de matrícula: "+ holderAndDependents.iterator().next().getRegistrationNumber());
	}
	

	private List<InsuredVO> readFile(File file) {
		List<InsuredVO> insureds = new ArrayList<InsuredVO>();
		BufferedReader br = null;
		String line = "";
		String csvDivisor = ";(?=([^\"]*\"[^\"]*\")*[^\"]*$)";
		try {
			br = new BufferedReader(new InputStreamReader(new FileInputStream(file), "ISO-8859-15"));
			br.readLine(); // Cabecalho
			int lineCount = 2;
			while ((line = br.readLine()) != null) {
				String[] info = line.split(csvDivisor);
				
				String healthNumber = get(info, 0);
				String registrationNumber =get(info, 1);
				String cpf =get(info, 2);
				String name =get(info, 3);
				String birthDate =get(info, 4);
				String sex =get(info, 5);
				String insuredType =get(info, 6);
				InsuredVO insuredVO = new InsuredVO(healthNumber, registrationNumber, cpf, name, birthDate, sex, insuredType, lineCount);
				insuredVO.validate();
				insureds.add(insuredVO);
				lineCount++;
			}
			return insureds;
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			throw new InvalidException(e.getMessage());
		} catch (IOException e) {
			e.printStackTrace();
			throw new InvalidException(e.getMessage());
		} finally {
			if (br != null) {
				try {
					br.close();
				} catch (IOException e) {
					e.printStackTrace();
					throw new InvalidException(e.getMessage());
				}
			}
		}
	}
	
	public String get(String[] array, int id) {
		try{
			return array[id].replace("\"","").trim().replaceAll(";", ",");
		}catch (ArrayIndexOutOfBoundsException e) {
			return "";
		}
	}
	
	public static class ResultDto{
		
		private int totalRegistered;
		
		private int withErrors;
		
		private int alreadyRegistered;
		
		private List<InsuredVO> notRegistered;

		public ResultDto(int totalRegistered, int withErrors, int alreadyRegistered, List<InsuredVO> notRegistered) {
			super();
			this.totalRegistered = totalRegistered;
			this.withErrors = withErrors;
			this.alreadyRegistered = alreadyRegistered;
			this.notRegistered = notRegistered;
		}

		public int getTotalRegistered() {
			return totalRegistered;
		}

		public void setTotalRegistered(int totalRegistered) {
			this.totalRegistered = totalRegistered;
		}

		public int getWithErrors() {
			return withErrors;
		}

		public void setWithErrors(int withErrors) {
			this.withErrors = withErrors;
		}

		public int getAlreadyRegistered() {
			return alreadyRegistered;
		}

		public void setAlreadyRegistered(int alreadyRegistered) {
			this.alreadyRegistered = alreadyRegistered;
		}

		public List<InsuredVO> getNotRegistered() {
			return notRegistered;
		}

		public void setNotRegistered(List<InsuredVO> notRegistered) {
			this.notRegistered = notRegistered;
		}
		
	}
	
	public static class InsuredVO{
		
		private String healthInsuranceNumber;
		
		private String registrationNumber;
		
		private String cpf;
		
		private String name;
		
		private String birthDate;
		
		private GenderEnum sex;
		
		private InsuredType type;
		
		private int line;
		
		private String docwayId;
		
		private String error;
		
		private boolean alreadyRegistered;
		
		public InsuredVO(String healthInsuranceNumber, String registrationNumber, String cpf, String name,
				String birthDate, String sex, String type, int line) {
			super();
			this.healthInsuranceNumber = healthInsuranceNumber;
			this.registrationNumber = registrationNumber;
			this.cpf = cpf;
			this.name = name;
			this.birthDate = birthDate;
			this.sex = GenderEnum.getSexByDescription(sex);
			this.type = getInsuredType(type);
			this.line = line;
		}
		
		public InsuredVO(String docwayId, String registrationNumber, String cpf, String name, int line) {
			super();
			this.docwayId = docwayId;
			this.registrationNumber = registrationNumber;
			this.cpf = cpf;
			this.name = name;
			this.line = line;
		}

		public void validate() {
			if(StringUtils.isEmpty(this.getRegistrationNumber())) {
				this.setError("beneficiário sem matrícula: " + this.getName() + " - " + this.getLine());
			}
			
			if(this.getBirthDate() == null) {
				this.setError("beneficiário sem data de nascimento válida: " + this.getName() + " - " + this.getRegistrationNumber()+ " - "+ this.getLine());
			}
			
			if(this.getType() == null) {
				this.setError("beneficiário sem tipo de segurado válido: " + this.getName() + " - " + this.getRegistrationNumber()+ " - "+ this.getLine());
			}
		}

		public String getHealthInsuranceNumber() {
			return healthInsuranceNumber;
		}

		public void setHealthInsuranceNumber(String healthInsuranceNumber) {
			this.healthInsuranceNumber = healthInsuranceNumber;
		}

		public String getRegistrationNumber() {
			return registrationNumber;
		}

		public void setRegistrationNumber(String registrationNumber) {
			this.registrationNumber = registrationNumber;
		}

		public String getCpf() {
			return cpf;
		}

		public void setCpf(String cpf) {
			this.cpf = cpf;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getBirthDate() {
			return birthDate;
		}

		public void setBirthDate(String birthDate) {
			this.birthDate = birthDate;
		}

		public GenderEnum getSex() {
			return sex;
		}

		public void setSex(GenderEnum sex) {
			this.sex = sex;
		}

		public InsuredType getType() {
			return type;
		}

		public void setType(InsuredType type) {
			this.type = type;
		}

		@SuppressWarnings("serial")
		private InsuredType getInsuredType(String type) {
			Map<String, InsuredType> map  = new HashMap<String, InsuredType>() {{
			    put("TITULAR", InsuredType.HOLDER);
			    put("DEPENDENTE", InsuredType.DEPENDENT);
			    put("SER. COMISSIONADO", InsuredType.PUBLIC_EMPLOYEE);
			}};	
			if(map.containsKey(type)) {
				return map.get(type);
			}
			return null;
		}

		public int getLine() {
			return line;
		}

		public void setLine(int line) {
			this.line = line;
		}

		public String getDocwayId() {
			return docwayId;
		}

		public void setDocwayId(String docwayId) {
			this.docwayId = docwayId;
		}
		
		@Override
		public String toString() {
			return healthInsuranceNumber+";"+registrationNumber+";"+cpf+";"+name+";"+birthDate+";"+sex+";"+type+";"+docwayId;
		}

		public String getError() {
			return error;
		}

		public void setError(String error) {
			this.error = error;
		}

		public boolean isAlreadyRegistered() {
			return alreadyRegistered;
		}

		public void setAlreadyRegistered(boolean alreadyRegistered) {
			this.alreadyRegistered = alreadyRegistered;
		}
	}

}

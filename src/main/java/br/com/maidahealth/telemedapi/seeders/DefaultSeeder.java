package br.com.maidahealth.telemedapi.seeders;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

import br.com.maidahealth.telemedapi.models.City;
import br.com.maidahealth.telemedapi.models.Profile;
import br.com.maidahealth.telemedapi.models.Specialty;
import br.com.maidahealth.telemedapi.models.State;
import br.com.maidahealth.telemedapi.models.SupportConfig;
import br.com.maidahealth.telemedapi.models.SupportReason;
import br.com.maidahealth.telemedapi.models.User;
import br.com.maidahealth.telemedapi.models.UserType;
import br.com.maidahealth.telemedapi.repositories.CityRepository;
import br.com.maidahealth.telemedapi.repositories.ProfileRepository;
import br.com.maidahealth.telemedapi.repositories.StateRepository;
import br.com.maidahealth.telemedapi.repositories.SupportReasonRepository;
import br.com.maidahealth.telemedapi.services.SpecialtyService;
import br.com.maidahealth.telemedapi.services.UserService;

@Service
public class DefaultSeeder {
	
	@Autowired
	private SpecialtyService specialtyService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ProfileRepository profileRepository;
	
	@Autowired
	private StateRepository stateRepository;
	
	@Autowired
	private CityRepository cityRepository;

	@Autowired
	private SupportReasonRepository supportReasonRepository;

	public void seedStatesAndCities() {
		System.out.println(">>>>>>>>>>>>>> CRIANDO ESTADOS E CIDADES >>>>>>>>>>>>>>");
		
		if(stateRepository.count() > 0) return;
		
		try {
			InputStream inputStream = new ClassPathResource("seeders/states.json").getInputStream();

			JsonArray states = JsonParser.parseReader(new InputStreamReader(inputStream, "UTF-8")).getAsJsonArray();

			List<State> allStates = new ArrayList<State>();

			for (JsonElement stateJson : states) {
				String name = stateJson.getAsJsonObject().get("nome").getAsString();
				String uf = stateJson.getAsJsonObject().get("uf").getAsString();
				Integer code = stateJson.getAsJsonObject().get("codigo_uf").getAsInt();

				State state = new State(name, uf, code);

				allStates.add(state);
			}

			stateRepository.saveAll(allStates);

			allStates = stateRepository.findAll();

			HashMap<Integer, State> statesMap = new HashMap<Integer, State>();

			for (State state : allStates) {
				statesMap.put(state.getCode(), state);
			}

			InputStream inputStreamCities = new ClassPathResource("seeders/cities.json").getInputStream();

			JsonArray cities = JsonParser.parseReader(new InputStreamReader(inputStreamCities, "UTF-8"))
					.getAsJsonArray();

			List<City> allCities = new ArrayList<City>();

			int countGeral = 0;
			int countParcial = 0;
			int saveAtual = 1;
			for (JsonElement cityJson : cities) {
				countGeral += 1;
				countParcial += 1;

				System.out.println(">>>>>>>>>>>>>> " + countGeral);

				String name = cityJson.getAsJsonObject().get("nome").getAsString();
				Integer ibgeCode = cityJson.getAsJsonObject().get("codigo_ibge").getAsInt();
				Integer ufCode = cityJson.getAsJsonObject().get("codigo_uf").getAsInt();

				City city = new City(name, ibgeCode, statesMap.get(ufCode));

				allCities.add(city);
				
				if(countParcial % 100 == 0) {
					System.out.println(">>>>>>>>>>>>>> Salvando: " + (saveAtual * 100));
					countParcial = 0;
					cityRepository.saveAll(allCities);
					allCities = new ArrayList<City>();
					saveAtual += 1;
				}

			}

			cityRepository.saveAll(allCities);
			System.out.println(">>>>>>>>>>>>>> Finalizando criação de cidade e estados...");

		} catch (Exception e) {
			System.out.println(">>>>>>>>>>>>>> ERRO AO CRIAR ESTADOS E CIDADES >>>>>>>>>>>>>>");
			e.printStackTrace();
		}
		
	}

	public void updateSpecialtiesWithExternalIds() {
		List<Specialty> allSpecialties = specialtyService.findAll();
		
		JsonArray array = JsonParser.parseString(SPECIALTIES_JSON).getAsJsonArray();
		
		for (JsonElement specialtyJson : array) {
			String specialtyName = specialtyJson.getAsJsonObject().get("name").getAsString();
			String externalId = specialtyJson.getAsJsonObject().get("id").getAsString();
			
			for (Specialty specialty : allSpecialties) {
				if(specialty.getName().toLowerCase().equals(specialtyName.toLowerCase()))
					specialty.setExternalId(externalId);
			}
		}
		
		specialtyService.repository.saveAll(allSpecialties);
		
	}

	public void seedProfiles() {
		if(profileRepository.count() == 0) {
			List<Profile> profiles = Arrays.asList(
				new Profile(UserType.ADMIN.name()),
				new Profile(UserType.INSURED.name()),
				new Profile(UserType.SECRETARY.name()),
				new Profile(UserType.PROFESSIONAL.name()),
				new Profile(UserType.GUEST.name()),
				new Profile(UserType.CALLCENTER.name())
			);
			profileRepository.saveAll(profiles);
		}
		
		Optional<Profile> optional = profileRepository.findByName(UserType.CLIENT_ADMIN.name());
		if(!optional.isPresent()) {
			Profile profileClientAdmin = new Profile(UserType.CLIENT_ADMIN.name());
			profileRepository.save(profileClientAdmin);
		}
	}
	
	public void seedUsers() {
		if(userService.userRepository.count() == 0) {
			User user = new User();
			user.setLogin("admin");
			user.setEmail("admin@maida.health");
			user.setPassword(new BCryptPasswordEncoder().encode("123456"));
			user.setName("Admin User");
			
			Profile adminProfile = profileRepository.findByName(UserType.ADMIN.name()).get();
			user.getProfiles().add(adminProfile);
			
			userService.userRepository.save(user);
		}
		
	}


	public void seedSpecialties() {
			specialtyService.saveSpecialty("1", "ACUPUNTURA", "33");
			specialtyService.saveSpecialty("2", "ALERGIA E IMUNOLOGIA", "39");
			specialtyService.saveSpecialty("3", "ANESTESIOLOGIA", "29");
			specialtyService.saveSpecialty("4", "ANGIOLOGIA", "31");
			specialtyService.saveSpecialty("5", "CANCEROLOGIA/CANCEROLOGIA CLÍNICA", null);
			specialtyService.saveSpecialty("6", "CANCEROLOGIA/CANCEROLOGIA CIRÚRGICA", null );
			specialtyService.saveSpecialty("7", "CANCEROLOGIA/CANCEROLOGIA PEDIÁTRICA", null );
			specialtyService.saveSpecialty("8", "CARDIOLOGIA", "4" );
			specialtyService.saveSpecialty("9", "CIRURGIA CARDIOVASCULAR", "47" );
			specialtyService.saveSpecialty("10", "CIRURGIA DE CABEÇA E PESCOÇO", "42" );
			specialtyService.saveSpecialty("11", "CIRURGIA DO APARELHO DIGESTIVO", null );
			specialtyService.saveSpecialty("12", "CIRURGIA GERAL", "22" );
			specialtyService.saveSpecialty("13", "CIRURGIA PEDIÁTRICA", "37" );
			specialtyService.saveSpecialty("14", "CIRURGIA PLÁSTICA", "23" );
			specialtyService.saveSpecialty("15", "CIRURGIA TORÁCICA", "48" );
			specialtyService.saveSpecialty("16", "CIRURGIA VASCULAR", "30" );
			specialtyService.saveSpecialty("17", "CLÍNICA MÉDICA", "1" );
			specialtyService.saveSpecialty("18", "COLOPROCTOLOGIA", "17" );
			specialtyService.saveSpecialty("19", "DERMATOLOGIA", "8" );
			specialtyService.saveSpecialty("20", "ENDOCRINOLOGIA", "13" );
			specialtyService.saveSpecialty("21", "ENDOSCOPIA", null );
			specialtyService.saveSpecialty("22", "GASTROENTEROLOGIA", "12" );
			specialtyService.saveSpecialty("23", "GENÉTICA MÉDICA", null );
			specialtyService.saveSpecialty("24", "GERIATRIA", "34" );
			specialtyService.saveSpecialty("25", "GINECOLOGIA E OBSTETRÍCIA", "25" );
			specialtyService.saveSpecialty("26", "HEMATOLOGIA E HEMOTERAPIA", "19" );
			specialtyService.saveSpecialty("27", "HOMEOPATIA", "7" );
			specialtyService.saveSpecialty("28", "INFECTOLOGIA", "27" );
			specialtyService.saveSpecialty("29", "MASTOLOGIA", null );
			specialtyService.saveSpecialty("30", "MEDICINA DE FAMÍLIA E COMUNIDADE", "3" );
			specialtyService.saveSpecialty("31", "MEDICINA DO TRABALHO", "44" );
			specialtyService.saveSpecialty("32", "MEDICINA DO TRÁFEGO", null);
			specialtyService.saveSpecialty("33", "MEDICINA ESPORTIVA", "49");
			specialtyService.saveSpecialty("34", "MEDICINA FÍSICA E REABILITAÇÃO", null);
			specialtyService.saveSpecialty("35", "MEDICINA INTENSIVA", null);
			specialtyService.saveSpecialty("36", "MEDICINA LEGAL", null);
			specialtyService.saveSpecialty("37", "MEDICINA NUCLEAR", "46");
			specialtyService.saveSpecialty("38", "MEDICINA PREVENTIVA E SOCIAL", "41");
			specialtyService.saveSpecialty("39", "NEFROLOGIA", "20");
			specialtyService.saveSpecialty("40", "NEUROCIRURGIA", "21");
			specialtyService.saveSpecialty("41", "NEUROLOGIA", "9");
			specialtyService.saveSpecialty("42", "NUTROLOGIA", "11");
			specialtyService.saveSpecialty("43", "OFTALMOLOGIA", "10");
			specialtyService.saveSpecialty("44", "ORTOPEDIA e TRAUMATOLOGIA", "5");
			specialtyService.saveSpecialty("45", "OTORRINOLARINGOLOGIA", "16");
			specialtyService.saveSpecialty("46", "PATOLOGIA", null);
			specialtyService.saveSpecialty("47", "PATOLOGIA CLÍNICA/MEDICINA LABORATORIAL", null);
			specialtyService.saveSpecialty("48", "PEDIATRIA", "2");
			specialtyService.saveSpecialty("49", "PNEUMOLOGIA", "15");
			specialtyService.saveSpecialty("50", "PSIQUIATRIA", "6");
			specialtyService.saveSpecialty("51", "RADIOLOGIA E DIAGNÓSTICO POR IMAGEM", "24" );
			specialtyService.saveSpecialty("52", "DIAGNÓSTICO POR IMAGEM: ATUAÇÃO EXCLUSIVA ULTRA-SONOGRAFIA GERAL", "43" );
			specialtyService.saveSpecialty("53", "DIAGNÓSTICO POR IMAGEM: ATUAÇÃO EXCLUSIVA RADIOLOGIA INTERVENCIONISTA E ANGIORRADIOLOGIA", null );
			specialtyService.saveSpecialty("54", "RADIOTERAPIA", null);
			specialtyService.saveSpecialty("55", "REUMATOLOGIA", "14");
			specialtyService.saveSpecialty("56", "UROLOGIA", "28");
	}

	public static String SPECIALTIES_JSON = "[\n" + 
			"    {\n" + 
			"        \"id\": \"9ad2cb96-e081-493c-9513-8f62ede8fefe\",\n" + 
			"        \"name\": \"Medicina de Família e Comunidade\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"8f5c5ec4-43bc-497c-8b6d-9f48ad3aa56c\",\n" + 
			"        \"name\": \"Angiologia\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"351ab4f3-03af-4b9b-b501-d54dadcdc716\",\n" + 
			"        \"name\": \"Cirurgia do Aparelho Digestivo\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"bfccaa5e-aa3b-441a-b443-f2d89b521ebe\",\n" + 
			"        \"name\": \"Radioterapia\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"f3c7cf99-b8ec-4816-a74e-ae46c763333a\",\n" + 
			"        \"name\": \"Acupuntura\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"286c1a3f-e165-4a61-9462-7aa288ea6146\",\n" + 
			"        \"name\": \"Ortopedia e Traumatologia\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"6823c51b-f575-4aea-b94e-a4389b1fa050\",\n" + 
			"        \"name\": \"Ginecologia e Obstetrícia\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"bf26f68b-3383-4592-b258-c1c49aced848\",\n" + 
			"        \"name\": \"Otorrinolaringologia\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"51c5cd5f-325e-4d80-9dcb-91ee2416c1c9\",\n" + 
			"        \"name\": \"Clínica Médica\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"58ad149e-dc54-4d21-8f7f-48487dd5f6ea\",\n" + 
			"        \"name\": \"Cirurgia Pediátrica\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"213b4760-c6ea-40e9-a80f-c638d8b25ac3\",\n" + 
			"        \"name\": \"Cancerologia/Cancerologia Cirúrgica\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"41e48819-21d3-4618-8e3a-ac95aff00537\",\n" + 
			"        \"name\": \"Hematologia e Hemoterapia\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"7e05bbf2-beaf-4545-ab4e-142829a57bff\",\n" + 
			"        \"name\": \"Mastologia\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"c8893747-6275-44c1-b215-8a966871ea74\",\n" + 
			"        \"name\": \"Cirurgia Geral\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"fbbd03ef-5fc2-4ebe-b1c9-58d56e573a78\",\n" + 
			"        \"name\": \"Geriatria\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"d1e6a332-2206-497a-8330-936d73ce99bc\",\n" + 
			"        \"name\": \"Medicina Nuclear\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"217ee6fa-9102-470c-a626-46b3eba7600a\",\n" + 
			"        \"name\": \"Genética Médica\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"2d52d7c1-d984-41aa-bbe6-d8490d26242c\",\n" + 
			"        \"name\": \"Cirurgia Cardiovascular\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"590ef6a4-cfb3-4a79-86a4-b036a1cffe34\",\n" + 
			"        \"name\": \"Cardiologia\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"24901b08-2f49-4c1b-a2fa-43a6cfeaa08c\",\n" + 
			"        \"name\": \"Medicina Legal\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"27302a0a-16bb-46a3-bd0c-c2d81b53dffa\",\n" + 
			"        \"name\": \"Cirurgia Vascular\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"4817727f-ae4b-441d-8a5c-8bf5ba019fd3\",\n" + 
			"        \"name\": \"Cirurgia Plástica\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"49680476-95ab-4fd4-a2ba-01812337cc97\",\n" + 
			"        \"name\": \"Nutrologia\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"affe0577-2c9d-41fd-a955-77075ecbbf33\",\n" + 
			"        \"name\": \"Cirurgia de Cabeça e Pescoço\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"097a94be-6ef0-455a-a031-f0fd682596d2\",\n" + 
			"        \"name\": \"Alergia e Imunologia\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"f37d4916-bd7a-4118-814c-a4ce5e22f935\",\n" + 
			"        \"name\": \"Reumatologia\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"0c729177-c415-4708-bf7b-c3bc081af508\",\n" + 
			"        \"name\": \"Medicina Preventiva e Social\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"eba62800-f651-471f-a523-a3e500614fe6\",\n" + 
			"        \"name\": \"Cirurgia Torácica\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"41d84000-f8f3-41bd-85c3-14a6398b5487\",\n" + 
			"        \"name\": \"Endocrinologia\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"2de21c63-3b34-4b80-a001-65b601502f4c\",\n" + 
			"        \"name\": \"Diagnóstico Por Imagem: Atuação Exclusiva Ultra-sonografia Geral\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"91ea5c67-b83a-4d05-ad3a-64ef70d64146\",\n" + 
			"        \"name\": \"Neurologia\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"bd56ec43-2dcc-4d73-ad87-02024193fa09\",\n" + 
			"        \"name\": \"Anestesiologia\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"bfc4d066-3d5e-4e5c-b005-0da4f9a84329\",\n" + 
			"        \"name\": \"Endoscopia\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"565b78f0-f7ba-4ea5-a025-be8af65cd50b\",\n" + 
			"        \"name\": \"Patologia\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"302e6b1f-4d4e-4b2e-aa59-7d082ab0938e\",\n" + 
			"        \"name\": \"Gastroenterologia\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"a40ac162-0506-4c7e-b316-497a56b6d4bd\",\n" + 
			"        \"name\": \"Neurocirurgia\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"ad10e43a-ca06-4b85-ad03-999d632f901e\",\n" + 
			"        \"name\": \"Infectologia\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"3ead504b-e7c5-42b3-849c-5f738267e959\",\n" + 
			"        \"name\": \"Homeopatia\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"a1c17a11-bec8-48e3-850e-27d86323c6fd\",\n" + 
			"        \"name\": \"Dermatologia\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"3573bcad-6d2c-473c-b4c9-2147cbfc6aaa\",\n" + 
			"        \"name\": \"Cancerologia/Cancerologia Clínica\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"a6893e29-4e1d-4f24-a304-f7128b36dcf4\",\n" + 
			"        \"name\": \"Cancerologia/Cancerologia Pediátrica\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"e9c3d9aa-d636-4c20-84d8-b4f23be66243\",\n" + 
			"        \"name\": \"Nefrologia\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"6b000d96-e895-482e-99f2-b8759be3fd20\",\n" + 
			"        \"name\": \"Urologia\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"0e1ff21b-ab3e-4b19-97de-13e104316e85\",\n" + 
			"        \"name\": \"Pediatria\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"972841ca-db38-4bee-b4c6-86ad89b34757\",\n" + 
			"        \"name\": \"Oftalmologia\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"a298114b-aad9-4162-a72d-f85d2d48a02d\",\n" + 
			"        \"name\": \"Medicina Intensiva\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"a5005dd3-7246-4a9b-934e-f7c4415ee36d\",\n" + 
			"        \"name\": \"Patologia Clínica/Medicina Laboratorial\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"d7768162-1d3d-4b5b-95ac-4fcaae5c45eb\",\n" + 
			"        \"name\": \"Psiquiatria\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"d0131238-74ea-45ee-857e-732dedcefa8d\",\n" + 
			"        \"name\": \"Medicina Física e Reabilitação\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"45bd8746-249a-4ea9-a7d6-ba2bb8c6245e\",\n" + 
			"        \"name\": \"Medicina do Trabalho\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"a2893b40-9be5-4a78-b39a-4bb0dadd5cd8\",\n" + 
			"        \"name\": \"Coloproctologia\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"e8a26281-b881-4345-ba74-39337dfc8930\",\n" + 
			"        \"name\": \"Pneumologia\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"e5616ed9-58f8-4088-bded-5a01e08855fd\",\n" + 
			"        \"name\": \"Diagnóstico Por Imagem: Atuação Exclusiva Radiologia Intervencionista e Angiorradiologia\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"5902e938-fc82-4660-af29-a864f3ed8850\",\n" + 
			"        \"name\": \"Medicina Esportiva\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"15c7c6c4-65f3-4b6c-ac66-83f9b5654ef8\",\n" + 
			"        \"name\": \"Medicina do Tráfego\"\n" + 
			"    },\n" + 
			"    {\n" + 
			"        \"id\": \"f2343cbd-d846-4505-86d6-8d80d817baa2\",\n" + 
			"        \"name\": \"Radiologia e Diagnóstico Por Imagem\"\n" + 
			"    }\n" + 
			"]";


	public void seedSupportReasons(){
		int deadline = 5;
		List<SupportReason> result = supportReasonRepository.findAll();
		List<SupportReason> lista = Arrays.asList(
			new SupportReason(1L,"Fui cobrado indevidamente","Combrança indevida", new SupportConfig(deadline)),
			new SupportReason(2L,"Ainda não recebi meu estorno", "Não recebeu o extorno", new SupportConfig(deadline)),
			new SupportReason(3L, "Não recebi minha nota fiscal", "Nota fiscal não recebida", new SupportConfig(deadline)),
			new SupportReason(4L,"Não consigo apagar meu cartão", "Erro ao apagar cartão", new SupportConfig(deadline))
		);
		if(result.size() < lista.size()) {
			supportReasonRepository.saveAll(lista);
		}
	}

}

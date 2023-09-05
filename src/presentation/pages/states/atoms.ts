import {atom} from 'recoil';
import * as usecase from 'domain/usecases';

export const signInStates = atom({
	key: ' signInStates',
	default: {
		id: '',
		userCode: '',
		password: '',
		isInvalid: false,
		invalidMsg: '',
	},
});

export const signUpStates = atom({
	key: 'signUpStates',
	default: {
		id: '',
		cdPessoa: '',
		userCode: '',
		userCodeInvalid: false,
		userCodeInvalidMsg: '',
		birthday: '',
		birthdayInvalid: false,
		birthdayInvalidMsg: '',
		phone: '',
		phoneInvalid: false,
		phoneInvalidMsg: '',
		email: '',
		emailInvalid: false,
		emailInvalidMsg: '',
		password: '',
		passwordInvalid: false,
		passwordInvalidMsg: '',
		confirmPassword: '',
		confirmPasswordInvalid: false,
		confirmPasswordInvalidMsg: '',
		isInvalid: false,
		invalidMsg: '',
		isOk: false,
	},
});

export const forgotPasswordStates = atom({
	key: 'forgotPasswordStates',
	default: {
		id: '',
		userCode: '',
		userCodeInvalid: false,
		userCodeInvalidMsg: '',
		birthday: '',
		birthdayInvalid: false,
		birthdayInvalidMsg: '',
		phone: '',
		phoneInvalid: false,
		phoneInvalidMsg: '',
		password: '',
		passwordInvalid: false,
		passwordInvalidMsg: '',
		confirmPassword: '',
		confirmPasswordInvalid: false,
		confirmPasswordInvalidMsg: '',
		isOk: false,
	},
});

export const tokenStates = atom({
	key: 'tokenStates',
	default: {
		cdPessoa: '',
		token: '',
		tokenInvalid: false,
		tokenInvalidMsg: '',
	},
});

export const operationalCostStates = atom({
	key: 'operationalCostStates',
	default: {
		userCode: '',
		invalidMsg: '',
		isInvalid: false,
	},
});

export const contractMenuStates = atom({
	key: 'contractMenuStates',
	default: [
		{
			cdUsuarioC: '',
			cdPessoa: 0,
			cdUsuario: '',
			nuContrato: '',
			nmUsuario: '',
			dtNascimentoUsuario: '',
			nmMaeUsuario: '',
			flSexoUsuario: '',
			nuCpf: '',
			cdPessoaC: 0,
			nuCpfC: '',
			nuCNS: 0,
			nmUsuarioC: '',
			dtNascimentoUsuarioC: '',
			idadeC: 0,
			nmMaeUsuarioC: '',
			nmPaiUsuarioC: 0,
			flSexoUsuarioC: '',
			tipoUsuarioC: '',
			nuContratoC: '',
			dtAdesaoC: '',
			dtCarenciaC: '',
			dtCarenciaOdontoC: '',
			dtFimCarenciaOdontoC: '',
			tipoPlanoC: '',
			tipoDependenteC: 0,
			nmPlano: '',
			nuRegistroPlano: '',
			segmentacaoPlano: '',
			redePlano: '',
			tipoAcomodacaoPlano: '',
			tipoLogradouro: '',
			ruaEndereco: '',
			nuEndereco: '',
			bairroEndereco: '',
			cidadeEndereco: '',
			ufEndereco: '',
			cepEndereco: '',
			tipoContratacao: '',
			cdEmpresaConveniada: '',
			nomeEmpresa: '',
			cdFilial: '',
			nmFilial: '',
			dataReferenciaConsulta: '',
		},
	],
});

export const choosedPlanStates = atom({
	key: 'choosedPlanStates',
	default: {
		cdPessoa: '',
		cdUsuario: '',
		nmPlano: '',
		nmTitular: '',
		nuContrato: '',
		nmUsuarioC: '',
		cdPessoaC: '',
		cdUsuarioC: '',
		nuIdadeC: '',
		tipoPlanoC: '',
		flInadimplente: '',
		flHospitalOnly: '',
		flPad: '',
		cdEmpresa: '',
		ativo: '',
		exigeSenha: '',
		mensagem: '',
		permitirMarcacao: '',
	},
});

export const odontoBookingStates = atom({
	key: 'odontoBookingStates',
	default: {
		stepCounter: '',
		cdUfAux: '',
		nmCidadeAux: '',
		cdAtendimentoAcessoEspecialAux: 'T',
		nmBairroAux: '',
		cdSubEspecialidadeAux: '',
		filtroTurnoAux: '',
		nmUsuarioAux: '',
		nmPrestadorJuridicoAux: '',
		nmPrestadorFisicoAux: '',
		nmEspecialidadeAux: '',
		nmLogradouro: '',
		cdNumero: '',
		nmBairro: '',
		flReagendamento: false,
		nuConsulta: '',
		cdPontoEntrada: '1',
		horarioConsulta: '',
		cdUsuario: '',
		cdEspecialidade: '',
		cdPrestadorJuridico: '',
		cdPrestadorFisico: '',
		dtConsulta: '',
		dtCancelamento: '',
		dtCarenciaOdontoC: '',
	},
});

export const appointmentMedicalStates = atom({
	key: 'appointmentMedicalStates',
	default: {agendamentos: []} as unknown as usecase.GetMedicalAppointmentsModel,
});

export const markdownOdontoStates = atom({
	key: 'markdownOdontoStates',
	default: {
		data: [] as unknown as usecase.PostOdontoRebookModel,
	},
});

export const odontoMarkdownStates = atom({
	key: 'odontoMarkdownStates',
	default: {
		stepCounter: '',
		cdUfAux: '',
		nuConsulta: '',
		nmCidadeAux: '',
		nmLogradouro: '',
		cdNumero: '',
		nmBairro: '',
		cdAtendimentoAcessoEspecialAux: 'T',
		nmBairroAux: '',
		cdSubEspecialidadeAux: '',
		filtroTurnoAux: '',
		nmUsuarioAux: '',
		nmPrestadorJuridicoAux: '',
		nmPrestadorFisicoAux: '',
		nmEspecialidadeAux: '',
		cdPontoEntrada: '1',
		horarioConsulta: '',
		cdUsuario: '',
		cdEspecialidade: '',
		cdPrestadorJuridico: '',
		cdPrestadorFisico: '',
		dtConsulta: '',
		dtCancelamento: '',
		dtCarenciaOdontoC: '',
	},
});

export const scheduledOdontoStates = atom({
	key: 'scheduledOdontoStates',
	default: {
		data: [] as unknown as usecase.PostOdontoBookingConfirmModel,
	},
});

export const healthBookingStates = atom({
	key: 'healthBookingStates',
	default: {
		cdUfAux: '',
		nmCidadeAux: '',
		cdAtendimentoAcessoEspecialAux: 'T',
		nmBairroAux: '',
		flReagendamento: false,
		nuConsulta: '',
		cdSubEspecialidadeAux: '0',
		filtroTurnoAux: '',
		nmPrestadorJuridicoAux: '',
		nmPrestadorFisicoAux: '',
		nmEspecialidadeAux: '',
		nmUsuarioAux: '',
		nmLogradouro: '',
		cdNumero: '',
		nmBairro: '',
		cdPontoEntrada: '1',
		horarioConsulta: '',
		cdUsuario: '',
		cdEspecialidade: '0',
		cdPrestadorJuridico: '',
		cdPrestadorFisico: '',
		dtConsulta: '',
		tpConsulta: '' as unknown,
		dtCancelamento: '',
		dtReferenciaConsulta: '',
		nuProtocolo: '',
		nuTelefone: '',
	},
});

export const scheduledHealthStates = atom({
	key: 'scheduledHealthStates',
	default: {
		// data: {} as unknown as usecase.PostMedicalCreateAppointment,
		data: {},
	},
});

export const healthMarkdownStates = atom({
	key: 'healthMarkdownStates',
	default: {
		cdUfAux: '',
		nmCidadeAux: '',
		nuConsulta: '',
		cdAtendimentoAcessoEspecialAux: 'T',
		nmBairroAux: '',
		cdSubEspecialidadeAux: '0',
		filtroTurnoAux: '',
		nmPrestadorJuridicoAux: '',
		nmPrestadorFisicoAux: '',
		nmEspecialidadeAux: '',
		nmUsuarioAux: '',
		nmLogradouro: '',
		cdNumero: '',
		nmBairro: '',
		cdPontoEntrada: '1',
		horarioConsulta: '',
		cdUsuario: '',
		cdEspecialidade: '',
		cdPrestadorJuridico: '',
		cdPrestadorFisico: '',
		dtConsulta: '',
		tpConsulta: '' as unknown,
		dtCancelamento: '',
		dtReferenciaConsulta: '',
	},
});

export const markdownHealthStates = atom({
	key: 'markdownHealthStates',
	default: {
		data: {} as usecase.PutMedicalRescheduleAppointmentModel,
	},
});

export const telehealthBookingStates = atom({
	key: 'telehealthBookingStates',
	default: {
		cdUfAux: 'CE',
		nmCidadeAux: 'FORTALEZA',
		nuConsulta: '',
		flReagendamento: false,
		cdAtendimentoAcessoEspecialAux: 'T',
		nmBairroAux: '',
		cdSubEspecialidadeAux: '0',
		filtroTurnoAux: '',
		nmPrestadorJuridicoAux: '',
		nmPrestadorFisicoAux: '',
		nmEspecialidadeAux: '',
		nmUsuarioAux: '',
		enderecoAux: '',
		cdPontoEntrada: '1',
		horarioConsulta: '',
		cdUsuario: '',
		cdEspecialidade: '',
		cdPrestadorJuridico: '',
		cdPrestadorFisico: '',
		dtConsulta: '',
		tpConsulta: '' as unknown,
		dtCancelamento: '',
		dtReferenciaConsulta: '',
		nuTelefone: '',
	},
});

export const scheduledTelehealthStates = atom({
	key: 'scheduledTelehealthStates',
	default: {
		data: [] as unknown as usecase.TelehealthBookingModel,
	},
});

export const telehealthMarkdownStates = atom({
	key: 'telehealthMarkdownStates',
	default: {
		cdUfAux: 'CE',
		nmCidadeAux: 'FORTALEZA',
		nuConsulta: '',
		cdAtendimentoAcessoEspecialAux: 'T',
		nmBairroAux: '',
		cdSubEspecialidadeAux: '0',
		filtroTurnoAux: '',
		nmPrestadorJuridicoAux: 'HAPCLINICA DIGITAL',
		nmPrestadorFisicoAux: '',
		nmEspecialidadeAux: '',
		nmUsuarioAux: '',
		enderecoAux: '',
		cdPontoEntrada: '1',
		horarioConsulta: '',
		cdUsuario: '',
		cdEspecialidade: '',
		cdPrestadorJuridico: '127304670',
		cdPrestadorFisico: '',
		dtConsulta: '',
		tpConsulta: '' as unknown,
		dtCancelamento: '',
		dtReferenciaConsulta: '',
	},
});

export const markdownTelehealthStates = atom({
	key: 'markdownTelehealthStates',
	default: {
		data: [] as unknown as usecase.PutMedicalRescheduleAppointmentModel,
	},
});

export const examMarkdownStates = atom({
	key: 'examMarkdownStates',
	default: {
		cdUf: '',
		nmCidade: '',
		nmBairro: '',
		filtroTurno: '',
		nmPrestadorFisico: '',
		nmUsuario: '',
		nmLogradouro: '',
		cdNumero: undefined,
		flAutorizacao: false,
		authCode: '',
		authCodeStatus: '',
		authCodeInvalid: false,
		cdPontoEntrada: '1',
		periodoMarcado: '0',
		periodoRealizado: '1',
		flReagendamento: false,
		nuExameRemarcado: '',
		protocoloCancelamento: '',
		protocoloAgendamento: '',
		nuExame: undefined,
		horarioAgendamento: '',
		cdUsuario: '',
		dtData: '',
		cdTipoExame: '',
		dsTipoExame: '',
		sexo: '',
		nuIdade: undefined,
		dtCancelamento: '',
		cdProcedimento: '',
		dtCarenciaExame: '',
		cdPrestadorJuridico: undefined,
		nmPrestadorJuridicoAux: '',
		cdPrestadorFisico: undefined,
	},
});

export const replaceExamStates = atom({
	key: 'replaceExamStates',
	default: {
		data: [] as unknown as usecase.PostExamsRebookModel,
	},
});

export const prepareExamStates = atom({
	key: 'prepareExamStates',
	default: {
		data: {} as unknown as usecase.GetExamsPreparationModel,
	},
});

export const downloadPDFPrescription = atom({
	key: 'downloadPDFPrescription',
	default: '',
});

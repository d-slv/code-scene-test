import {atom, selector} from 'recoil';
import moment from 'moment';

import {ExamBooked, ExamProvider, ExamTimes, ExamType} from 'domain/usecases';
import {
	makeGetExamsBooked,
	makeGetExamsDates,
	makeGetExamsProviders,
	makeGetExamsTimes,
	makeGetExamsTypes,
} from 'main/factories/usecases';
import {accountDataState} from 'presentation/pages/entry-flow/atoms';
import {makeLocalStorageAdapter} from 'main/factories/cache';
import {selectedUfState, selectedCityState} from '../atoms';

export type ShiftType = 'M' | 'T' | 'N';

type ParsedAccordionData = {
	provider: string;
	cdProviders: string;
	horarios: string[];
};

type ExamBooking = {
	cdUf: string;
	nmCidade: string;
	nmBairro: string;
	filtroTurno: string;
	nmPrestadorFisico: string;
	nmUsuario: string;
	nmLogradouro: string;
	cdNumero: number;
	flAutorizacao: boolean;
	authCode: string;
	authCodeStatus: string;
	authCodeInvalid: boolean;
	cdPontoEntrada: string;
	periodoMarcado: string;
	periodoRealizado: string;
	flReagendamento: boolean;
	nuExameRemarcado: string;
	protocoloCancelamento: string;
	protocoloAgendamento: string;
	protocoloReagendamento: string;
	nuExame: number;
	horarioAgendamento: string;
	cdUsuario: string;
	dtData: string;
	cdTipoExame: number;
	dsTipoExame: string;
	sexo: string;
	nuIdade: number;
	dtCancelamento: string;
	cdProcedimento: string;
	dtCarenciaExame: string;
	cdPrestadorJuridico: number;
	nmPrestadorJuridicoAux: string;
	cdPrestadorFisico: number;
	dsDescricao: string;
	dsInfoComplementar: string;
};

export const examBookingState = atom<ExamBooking>({
	key: 'examBookingState',
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
		protocoloReagendamento: '',
		nuExame: undefined,
		horarioAgendamento: '',
		cdUsuario: '',
		dtData: '',
		cdTipoExame: undefined,
		dsTipoExame: '',
		sexo: '',
		nuIdade: undefined,
		dtCancelamento: '',
		cdProcedimento: '',
		dtCarenciaExame: '',
		cdPrestadorJuridico: undefined,
		nmPrestadorJuridicoAux: '',
		cdPrestadorFisico: undefined,
		dsDescricao: '',
		dsInfoComplementar: '',
	},
	effects: [
		({onSet, setSelf}) => {
			const storedExamBookingData = makeLocalStorageAdapter().get('examBookingDetails');
			if (storedExamBookingData !== null) setSelf(storedExamBookingData);

			onSet((newExamBookingDetailsData, _, isReset) =>
				isReset
					? makeLocalStorageAdapter().set('examBookingDetails')
					: makeLocalStorageAdapter().set(
							'examBookingDetails',
							newExamBookingDetailsData,
					  ),
			);
		},
	],
});

export const examTypesState = selector<ExamType[]>({
	key: 'examTypes',
	get: async ({get}) => {
		const {beneficiary} = get(accountDataState);
		const cdUf = get(selectedUfState('exam'));
		const nmCidade = get(selectedCityState('exam'));
		const {flSexoUsuario, idadeC} = beneficiary;
		try {
			const response = await makeGetExamsTypes().get({
				cdUf,
				nmCidade,
				nuIdade: idadeC,
				sexo: flSexoUsuario,
			});
			return response.tiposExames;
		} catch (error) {
			return [];
		}
	},
});

export const examsFilterQueryState = atom<string>({
	key: 'examsFilterQuery',
	default: '',
});

export const examsFilterLettersState = selector<string[]>({
	key: 'examsFilterLetters',
	get: ({get}) => {
		const exams = get(examTypesState);
		const lettersArr = exams.map(exam => exam.dsTipoExame.charAt(0));
		const uniqueLettersArr = new Set(lettersArr);
		return Array.from(uniqueLettersArr);
	},
});

export const filteredExamTypesState = selector<ExamType[]>({
	key: 'filteredExamTypes',
	get: ({get}) => {
		const exams = get(examTypesState);
		const query = get(examsFilterQueryState);
		if (query.trim() === '') return exams;
		if (query.trim().length === 1)
			return exams.filter(
				exam =>
					exam.dsTipoExame
						.toLowerCase()
						.charAt(0)
						.indexOf(query.toLowerCase().charAt(0)) > -1,
			);
		return exams.filter(
			exam => exam.dsTipoExame.toLowerCase().indexOf(query.toLowerCase()) > -1,
		);
	},
});

export const scheduledExamsHistoryState = selector<ExamBooked[]>({
	key: 'scheduledExamsHistory',
	get: async () => {
		try {
			const response = await makeGetExamsBooked().get({
				cdStatus: '0',
				dtFinal: moment().add(1, 'M').format('DD/MM/YYYY'),
				dtInicial: moment().format('DD/MM/YYYY'),
			});
			return response.exames;
		} catch (error) {
			return [];
		}
	},
});

export const selectedExamState = atom<ExamType | null>({
	key: 'selectedExam',
	default: {
		cdTipoExame: '',
		dsTipoExame: '',
		flPreparo: false,
		dsPreparo: '',
		dsInformacaoComplementar: '',
		flAutorizacao: false,
		flCarencia: false,
		dtCarencia: '',
		cdProcedimento: '',
	},
});

export const bookedExamState = atom<ExamBooked | null>({
	key: 'bookedExam',
	default: null,
});

export const examProvidersState = selector<ExamProvider[]>({
	key: 'examProviders',
	get: async ({get}) => {
		const cdUf = get(selectedUfState('exam'));
		const nmCidade = get(selectedCityState('exam'));
		const {cdTipoExame} = get(selectedExamState);

		try {
			const response = await makeGetExamsProviders().get({
				cdTipoExame: Number(cdTipoExame),
				cdUf,
				nmCidade,
			});
			return response.unidades;
		} catch (error) {
			return [];
		}
	},
});

export const selectedExamProviderState = atom<ExamProvider | null>({
	key: 'selectedExamProvider',
	default: null,
});

export const examsDatesState = selector<string[]>({
	key: 'examsDates',
	get: async ({get}) => {
		const {codigo} = get(selectedExamProviderState);
		const {cdTipoExame, cdProcedimento} = get(selectedExamState);

		if (cdProcedimento === '') {
			const cdUf = get(selectedUfState('exam'));
			const nmCidade = get(selectedCityState('exam'));
			const {beneficiary} = get(accountDataState);
			const {flSexoUsuario, idadeC} = beneficiary;

			const res = await makeGetExamsTypes().get({
				cdUf,
				nmCidade,
				nuIdade: idadeC,
				sexo: flSexoUsuario,
			});

			const examTypes = res.tiposExames;
			const cdProcedimentoFromExamTypes = examTypes.find(
				exam => exam.cdTipoExame === String(cdTipoExame),
			).cdProcedimento;

			try {
				const response = await makeGetExamsDates().get({
					cdTipoExame: Number(cdTipoExame),
					cdProcedimento: cdProcedimentoFromExamTypes,
					cdPrestadorJuridico: String(codigo),
				});
				return response;
			} catch (error) {
				return [];
			}
		} else {
			try {
				const response = await makeGetExamsDates().get({
					cdTipoExame: Number(cdTipoExame),
					cdProcedimento,
					cdPrestadorJuridico: String(codigo),
				});
				return response;
			} catch (error) {
				return [];
			}
		}
	},
});

export const selectedExamDateState = atom<string>({
	key: 'selectedExamDate',
	default: '',
});

export const selectedExamShiftState = atom<ShiftType | ''>({
	key: 'selectedExamShift',
	default: '',
});

export const examAvailableTimeState = selector<ExamTimes[]>({
	key: 'examAvailableTime',
	get: async ({get}) => {
		const {codigo} = get(selectedExamProviderState);
		const {cdTipoExame} = get(selectedExamState);
		const shift = get(selectedExamShiftState);
		const dtData = get(selectedExamDateState);
		try {
			const response = await makeGetExamsTimes().get({
				cdTipoExame,
				dtData,
				filtroTurno: shift,
				cdPrestadorJuridico: String(codigo),
			});
			return response.horariosDisponiveis;
		} catch (error) {
			return [];
		}
	},
});

export const selectedExamTimeState = atom<ParsedAccordionData | null>({
	key: 'selectedExamTime',
	default: null,
});

// Ajustar a tipagem após a refatoração dos outros fluxos de agendamento e do componente Scroll para pegar apenas o horário(<string>)
export const selectedExamHourState = atom<{
	nmPrestadorFisico: string;
	cdPrestadorFisico: string;
	horarioAgendamento: string;
}>({
	key: 'selectedExamHour',
	default: null,
});

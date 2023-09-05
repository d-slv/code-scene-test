import {atom, selector, atomFamily} from 'recoil';
import moment from 'moment';

import {
	CoparticipationContract,
	IncomeTaxDetails,
	GetObligationHistoryModel,
} from 'domain/usecases';
import {
	makeGetIncomeTaxYears,
	makeGetHistoryYears,
	makeGetCoparticipation,
	makePostIncomeTaxDetails,
	makeGetObligationHistory,
} from 'main/factories/usecases';
import {formatText} from 'presentation/utils';
import {refresherIdState, homeState} from '../entry-flow/atoms';

type TabSlang = 'openBills' | 'history' | 'incomeTax' | 'coparticipationExtract';

interface Tab {
	slang: TabSlang;
	title: string;
	onlyIndividualContract: boolean;
}

export const allTabs: Tab[] = [
	{slang: 'openBills', title: 'Em aberto', onlyIndividualContract: false},
	{slang: 'history', title: 'Histórico de pagamentos', onlyIndividualContract: false},
	{slang: 'incomeTax', title: 'Imposto de renda', onlyIndividualContract: false},
	{
		slang: 'coparticipationExtract',
		title: 'Extrato de coparticipação',
		onlyIndividualContract: false,
	},
];

export const tabIndexState = atom({
	key: 'tabIndex',
	default: 0,
});

export const tabState = selector({
	key: 'tab',
	get: ({get}) => allTabs[get(tabIndexState)],
});

export const availableYearsState = selector({
	key: 'availableYears',
	get: async ({get}) => {
		get(refresherIdState);
		const tab = get(tabState);
		if (tab.slang === 'incomeTax') {
			try {
				const response = await makeGetIncomeTaxYears().get();
				const years = response.map(year => year.ano);
				return years;
			} catch (error) {
				return [];
			}
		}
		if (tab.slang === 'coparticipationExtract' || tab.slang === 'history') {
			try {
				const response = await makeGetHistoryYears().get();
				const years = response.map(year => year.ano);
				return years;
			} catch (error) {
				return [];
			}
		}
		return null;
	},
});

export const warningBarState = atomFamily({
	key: 'warningBar',
	default: false,
});

export const selectedYearState = atomFamily<string, {tab: TabSlang}>({
	key: 'selectedYear',
	default: ({tab}) => {
		if (tab === 'incomeTax') return moment().subtract(1, 'year').format('YYYY');
		return moment().format('YYYY');
	},
});

export const selectedMonthState = atom({
	key: 'selectedMonth',
	default: formatText(moment().locale('pt-br').format('MMMM')),
});

export const coParticipationExtractState = selector({
	key: 'coParticipationExtract',
	get: async ({get}) => {
		get(refresherIdState);
		const year = get(selectedYearState({tab: 'coparticipationExtract'}));
		const month = get(selectedMonthState);
		try {
			const response = await makeGetCoparticipation().get({
				ano: year,
				mes: moment(month, 'MMMM').format('MM'),
			});
			return response;
		} catch (error) {
			return {
				cpf: null,
				titular: null,
				contratos: [] as CoparticipationContract[],
			};
		}
	},
});

export const incomeTaxState = selector({
	key: 'incomeTax',
	get: async ({get}) => {
		get(refresherIdState);
		const year = get(selectedYearState({tab: 'incomeTax'}));
		try {
			const response = await makePostIncomeTaxDetails().post({
				ano: year,
			});
			return response;
		} catch (error) {
			return {
				impostoDeRenda: [] as IncomeTaxDetails[],
			};
		}
	},
});

export const paymentsHistoryState = selector({
	key: 'paymentsHistory',
	get: async ({get}) => {
		get(refresherIdState);
		const year = get(selectedYearState({tab: 'history'}));
		try {
			const response = await makeGetObligationHistory().get({
				exercicio: year,
			});
			return response;
		} catch (error) {
			return [] as GetObligationHistoryModel;
		}
	},
});

export const openBillsState = selector({
	key: 'openBills',
	get: ({get}) => get(homeState).obrigacoesPendentes,
});

import {atom, selectorFamily, selector} from 'recoil';

import {
	GetPlanParams,
	PlanModel,
	GetBeneficiaryParams,
	BeneficiaryModel,
	GetHomeModel,
	GetFiveStarsModel,
} from 'domain/usecases';
import {makeLocalStorageAdapter} from 'main/factories/cache';
import {
	makeGetPlan,
	makeGetBeneficiary,
	makeGetHome,
	makeGetTeleconsultLink,
	makeGetMedicalExternalUrl,
	makeGetFiveStars,
} from 'main/factories/usecases';

interface AccountData {
	login_token: string;
	access_token?: string;
	refresh_token?: string;
	beneficiary?: BeneficiaryModel;
	sidebar?: {
		flUsuarioInadimplente: boolean;
		flPlanoSomenteHospitalar: boolean;
		ctOperacional: {
			cdEmpresa: string;
			ativo: boolean;
			exigeSenha: boolean;
			mensagem: string;
			permitirMarcacao: boolean;
		};
		nmTitularContrato: string;
		flNascerBem: boolean;
		flViverBem: boolean;
		flMedicoFamilia: boolean;
		flPad: boolean;
		flAdministradora: boolean;
	};
}

// Entry-flow
export const accountDataState = atom<AccountData>({
	key: 'accountData',
	default: null,
	effects: [
		({onSet, setSelf}) => {
			const storedAccountData = makeLocalStorageAdapter().get('account');
			if (storedAccountData !== null) setSelf(storedAccountData);

			onSet((newAccountData, _, isReset) =>
				isReset
					? makeLocalStorageAdapter().set('account')
					: makeLocalStorageAdapter().set('account', newAccountData),
			);
		},
	],
});

export const plansListState = selectorFamily({
	key: 'plansList',
	get:
		({login_token}: GetPlanParams) =>
		async () => {
			try {
				const plans = await makeGetPlan().getPlan({login_token});
				return plans.planos;
			} catch (error) {
				return [] as PlanModel[];
			}
		},
});

export const beneficiariesListState = selectorFamily({
	key: 'beneficiariesList',
	get:
		({nmPlano, nuContrato}: GetBeneficiaryParams) =>
		async () => {
			try {
				const beneficiariesList = await makeGetBeneficiary().getBeneficiary({
					nmPlano,
					nuContrato,
				});
				return beneficiariesList.beneficiarios;
			} catch (error) {
				return [] as BeneficiaryModel[];
			}
		},
});

export const selectedBeneficiaryState = atom<BeneficiaryModel>({
	key: 'selectedBeneficary',
	default: null,
});

// Home-flow
export const refresherIdState = atom({
	key: 'refresherId',
	default: 0,
});

export const homeState = selector<GetHomeModel>({
	key: 'home',
	get: async ({get}) => {
		try {
			get(refresherIdState);
			const response = await makeGetHome().get();
			return response;
		} catch (error) {
			return {} as GetHomeModel;
		}
	},
});

export const obligationsState = selector({
	key: 'obligations',
	get: ({get}) => {
		const {obrigacoesPendentes} = get(homeState);
		return obrigacoesPendentes;
	},
});

export const teleconsultationLinkState = selectorFamily({
	key: 'teleconsultationLink',
	get: (nuContrato: string) => async () => {
		try {
			const response = await makeGetTeleconsultLink().get({nuContrato});
			return response;
		} catch (error) {
			return '';
		}
	},
});

export const emergencyLinkState = selectorFamily({
	key: 'emergencyLink',
	get: (nuContrato: string) => async () => {
		try {
			const response = await makeGetMedicalExternalUrl().get({nuContrato});
			return response;
		} catch (error) {
			return '';
		}
	},
});

export const fiveStarsState = selector<GetFiveStarsModel>({
	key: 'fiveStars',
	get: async () => {
		try {
			const response = await makeGetFiveStars().get();
			return response;
		} catch (error) {
			return {} as GetFiveStarsModel;
		}
	},
});

import {atomFamily, selectorFamily} from 'recoil';

import {
	makeGetExamsStates,
	makeGetMedicalStates,
	makeGetOdontoStates,
	makeGetExamsCities,
	makeGetOdontoCities,
} from 'main/factories/usecases';

type GetStatesResponse = {cdUf: string; nmUf: string}[];

type GetCitiesResponse = {nmCidade: string}[];

type BookingType = 'exam' | 'health' | 'odonto';

export const bookingTabIndexState = atomFamily<number, BookingType>({
	key: 'bookingTabIndex',
	default: 0,
});

export const ufState = selectorFamily<GetStatesResponse, BookingType>({
	key: 'uf',
	get: type => async () => {
		try {
			if (type === 'exam') {
				const response = await makeGetExamsStates().get();
				return response.estados;
			}
			if (type === 'health') {
				const response = await makeGetMedicalStates().get();
				return response.estados;
			}
			if (type === 'odonto') {
				const response = await makeGetOdontoStates().get();
				return response.estados;
			}
		} catch (error) {
			return [];
		}
		return [];
	},
});

export const selectedUfState = atomFamily<string, BookingType>({
	key: 'selectedUf',
	default: '',
});

export const citiesState = selectorFamily<GetCitiesResponse, BookingType>({
	key: 'cities',
	get:
		type =>
		async ({get}) => {
			const cdUf = get(selectedUfState(type));
			try {
				if (type === 'exam' && cdUf !== '') {
					const response = await makeGetExamsCities().get({cdUf});
					return response.cidades;
				}
				if (type === 'health' && cdUf !== '') {
					const response = await makeGetExamsCities().get({cdUf});
					return response.cidades;
				}
				if (type === 'odonto' && cdUf !== '') {
					const response = await makeGetOdontoCities().get({cdUf});
					return response.cidades;
				}
			} catch (error) {
				return [];
			}
			return [];
		},
});

export const selectedCityState = atomFamily<string, BookingType>({
	key: 'selectedCity',
	default: '',
});

import {atom, selector, selectorFamily} from 'recoil';

import {ExamBooked, GetExamsPreparationModel} from 'domain/usecases';
import {makeLocalStorageAdapter} from 'main/factories/cache';
import {makeGetExamsPreparation} from 'main/factories/usecases';
import {homeState, accountDataState} from '../entry-flow/atoms';

export const examDetailsState = atom<ExamBooked>({
	key: 'examDetails',
	default: null,
	effects: [
		({onSet, setSelf}) => {
			const storedExamData = makeLocalStorageAdapter().get('examDetails');
			if (storedExamData !== null) setSelf(storedExamData);

			onSet((newExamData, _, isReset) =>
				isReset
					? makeLocalStorageAdapter().set('examDetails')
					: makeLocalStorageAdapter().set('examDetails', newExamData),
			);
		},
	],
});

export const filteredExamsState = selector({
	key: 'filteredExams',
	get: ({get}) => {
		const {agendamentosExames} = get(homeState);
		return agendamentosExames;
	},
});

export const prepareExamState = selectorFamily({
	key: 'prepareExam',
	get:
		(examCode: string) =>
		async ({get}) => {
			try {
				const {idadeC} = get(accountDataState).beneficiary;
				const response = await makeGetExamsPreparation().get({
					cdTipoExame: examCode,
					nuIdade: String(idadeC),
				});
				return response;
			} catch (error) {
				return {} as GetExamsPreparationModel;
			}
		},
});

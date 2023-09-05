import {OptionsQuestions} from 'presentation/components/five-star/five-star.types';

export type GetFiveStarsModel = {
	count: number;
	items: OptionsQuestions;
};

export interface GetFiveStars {
	get: () => Promise<GetFiveStarsModel>;
}

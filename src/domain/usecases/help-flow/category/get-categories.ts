import {ReactNode} from 'react';

export type GetCategoriesModel = {
	data: {
		id: number;
		attributes: {
			title: string;
			resume: string;
			icon: ReactNode;
		};
	}[];
};

export interface GetCategories {
	getCategories: () => Promise<GetCategoriesModel>;
}

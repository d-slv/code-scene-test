export type GetSubCategoriesModel = {
	data: {
		id: number;
		attributes: {
			title: string;
			resume: string;
			content: string;
			text: string;
		};
	}[];
};

export interface GetSubCategories {
	getSubCategories: () => Promise<GetSubCategoriesModel>;
}

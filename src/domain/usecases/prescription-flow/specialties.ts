export type GetSpecialtiesModel = {
	id: number;
	name: string;
	slug: string;
}[];

export interface GetSpecialties {
	getSpecialties: () => Promise<GetSpecialtiesModel>;
}

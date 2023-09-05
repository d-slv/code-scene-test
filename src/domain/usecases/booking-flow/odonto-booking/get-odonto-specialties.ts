export type GetOdontoSpecialtiesModel = {
	especialidades: {
		cdEspecialidade: string;
		dsEspecialidade: string;
		subEspecialidades: {
			cdSubEspecialidade: string;
			dsSubEspecialidade: string;
		}[];
	}[];
};

export interface GetOdontoSpecialties {
	get: () => Promise<GetOdontoSpecialtiesModel>;
}

export type GetPlanParams = {
	login_token: string;
	subscription?: string;
};

export interface PlanModel {
	nmPlano: string;
	nmUsuario: string;
	nuContrato: string;
	nmUsuarioC: string;
	tipoPlanoC: string;
}

export type GetPlanModel = {
	planos: PlanModel[];
};

export interface GetPlan {
	getPlan: (params?: GetPlanParams) => Promise<GetPlanModel>;
}

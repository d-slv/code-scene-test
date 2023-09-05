export type GetBeneficiaryParams = {
	nmPlano: string;
	nuContrato: string;
};

export type BeneficiaryModel = {
	dtCarenciaC: string;
	dtAdesaoC: string;
	dtCarenciaOdontoC: string;
	flSexoUsuario: string;
	idadeC: number;
	nmPlano: string;
	nmUsuario: string;
	nmUsuarioC: string;
	nuCNS: number;
	nuContrato: string;
	nuContratoC: string;
	nuCpfC: string;
	nuRegistroPlano: string;
	tipoContratacao: string;
	tipoPlanoC: string;
	tipoUsuarioC: string;
};

export type GetBeneficiaryModel = {
	beneficiarios: BeneficiaryModel[];
};

export type PostBeneficiaryParams = {
	nuContrato: string;
	nmUsuarioC: string;
	nmPlano: string;
};

export type PostBeneficiaryModel = {
	login_token: string;
	access_token?: string;
	refresh_token?: string;
	beneficiary?: BeneficiaryModel;
};

export interface GetBeneficiary {
	getBeneficiary: (params: GetBeneficiaryParams) => Promise<GetBeneficiaryModel>;
}

export interface PostBeneficiary {
	postBeneficiary: (params: PostBeneficiaryParams) => Promise<PostBeneficiaryModel>;
}

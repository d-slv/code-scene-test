export type GetExamsAuthorizedPasswordParams = {
	cdTipoExame: string;
	senhaAutorizada: string;
};

export type GetExamsAuthorizedPasswordModel = string;

export interface GetExamsAuthorizedPassword {
	post: (params: GetExamsAuthorizedPasswordParams) => Promise<GetExamsAuthorizedPasswordModel>;
}

export type GetExamsAuthorizedPrePasswordParams = {
	cdTipoExame: string;
	preSenhaAutorizada: string;
};

export type GetExamsAuthorizedPrePasswordModel = string;

export interface GetExamsAuthorizedPrePassword {
	post: (
		params: GetExamsAuthorizedPrePasswordParams,
	) => Promise<GetExamsAuthorizedPrePasswordModel>;
}

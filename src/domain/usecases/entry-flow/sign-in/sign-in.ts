export type SignInParams = {
	identificador: string;
	senha: string;
	usuario: string;
};

export type SignInModel = {
	login_token: string;
};
export interface SignIn {
	auth: (params: SignInParams) => Promise<SignInModel>;
}

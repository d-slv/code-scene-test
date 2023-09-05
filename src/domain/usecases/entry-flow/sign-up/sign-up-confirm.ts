export type SignUpConfirmParams = {
	cdUsuario?: string;
	cpf: string;
	cdPessoa: string;
	dsEmailLogin: string;
	cdSenha: string;
	token: string;
	celular: string;
};

export interface SignUpConfirm {
	signUpConfirm: (params: SignUpConfirmParams) => Promise<unknown>;
}

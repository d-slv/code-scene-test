export type SignUpSendTokenParams = {
	cdUsuario: string;
	cpf: string;
	dsEmailLogin: string;
	dsEmailLoginConfirmacao: string;
	identificador: string;
	dtNascimento: string;
	celular: string;
};

export type SignUpSendTokenModel = {
	cdPessoa: string;
};

export interface SignUpSendToken {
	signUpSendToken: (params: SignUpSendTokenParams) => Promise<SignUpSendTokenModel>;
}

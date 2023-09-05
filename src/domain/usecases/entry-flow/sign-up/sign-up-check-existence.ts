export type SignUpCheckExistenceParams = {
	cdUsuario: string;
	cpf: string;
};

export type SignUpCheckExistenceModel = {
	existeCadastro: {
		success: boolean;
		msg: string;
	};
};

export interface SignUpCheckExistence {
	signUpCheckExistence: (
		params: SignUpCheckExistenceParams,
	) => Promise<SignUpCheckExistenceModel>;
}

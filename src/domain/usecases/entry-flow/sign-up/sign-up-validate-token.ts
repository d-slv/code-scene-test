export type SignUpValidateTokenParams = {
	cdToken: string;
	cdPessoa: string;
};

export interface SignUpValidateToken {
	get: (params: SignUpValidateTokenParams) => Promise<void>;
}

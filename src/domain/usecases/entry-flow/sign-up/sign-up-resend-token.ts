export type SignUpResendTokenParams = {
	cdPessoa: string;
};
export interface SignUpResendToken {
	signUpResendToken: (params: SignUpResendTokenParams) => Promise<void>;
}

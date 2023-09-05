export type ForgotPasswordResendTokenParams = {
	cdPessoa: string;
};
export interface ForgotPasswordResendToken {
	forgotPasswordResendToken: (params: ForgotPasswordResendTokenParams) => Promise<unknown>;
}

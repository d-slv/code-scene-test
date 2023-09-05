export type ForgotPasswordConfirmParams = {
	cdPessoa: string;
	cdSenha: string;
	contraSenha: string;
	token: string;
};

export interface ForgotPasswordConfirm {
	forgotPasswordConfirm: (params: ForgotPasswordConfirmParams) => Promise<void>;
}

export type forgotPasswordRecoverUserInfoParams = {
	dtNascimento: string;
	id: string;
	tipoId: string;
	phone: string;
};

export type forgotPasswordRecoverUserInfoModel = {
	cdPessoa: string;
};

export interface ForgotPasswordRecoverUserInfo {
	forgotPasswordRecoverUserInfo: (
		params: forgotPasswordRecoverUserInfoParams,
	) => Promise<forgotPasswordRecoverUserInfoModel>;
}

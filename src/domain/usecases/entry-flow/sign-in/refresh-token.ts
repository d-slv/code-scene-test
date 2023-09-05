export type RefreshTokenParams = {
	refresh_token: string;
};

export type RefreshTokenModel = {
	login_token: string;
};
export interface RefreshToken {
	auth: (params: RefreshTokenParams) => Promise<RefreshTokenModel>;
}

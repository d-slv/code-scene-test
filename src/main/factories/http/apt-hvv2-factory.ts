export const makeV2ApiUrl = (path: string): string =>
	`${process.env.API_V2_BASE_URL}${process.env.API_V2_VERSION}${path}`;

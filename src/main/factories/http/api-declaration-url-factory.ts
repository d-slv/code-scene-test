export const makeDeclarationApiUrl = (path: string): string =>
	`${process.env.API_URL_DECLARATION}${path}`;

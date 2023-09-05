export const makePrescriptionApiUrl = (path: string): string =>
	`${process.env.API_URL_PRESCRIPTION}${path}`;

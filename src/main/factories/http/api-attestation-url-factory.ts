export const makeAttestationApiUrl = (path: string): string =>
	`${process.env.API_URL_ATTESTATION}${path}`;

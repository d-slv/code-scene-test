import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {GetObligationPdf, GetObligationPdfParams, GetObligationPdfModel} from 'domain/usecases';

export class RemoteGetObligationPdf implements GetObligationPdf {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetObligationPdfModel>,
	) {}

	async get(params: GetObligationPdfParams): Promise<GetObligationPdfModel> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'get',
			responseType: 'blob',
			params,
		});
		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body;
			case HttpStatusCode.unauthorized:
				throw new InvalidCredentialsError(httpResponse);
			default:
				throw new UnknowError(httpResponse);
		}
	}
}

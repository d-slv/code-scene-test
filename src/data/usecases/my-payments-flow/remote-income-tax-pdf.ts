import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {GetIncomeTaxPDF, GetIncomeTaxPDFParams, GetIncomeTaxPDFModel} from 'domain/usecases';

export class RemoteGetIncomeTaxPDF implements GetIncomeTaxPDF {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetIncomeTaxPDFModel>,
	) {}

	async get(params: GetIncomeTaxPDFParams): Promise<GetIncomeTaxPDFModel> {
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

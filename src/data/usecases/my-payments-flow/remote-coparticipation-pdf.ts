import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {
	GetCoparticipationPdf,
	GetCoparticipationPdfParams,
	GetCoparticipationPdfModel,
} from 'domain/usecases';

export class RemoteGetCoparticipationPDF implements GetCoparticipationPdf {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetCoparticipationPdfModel>,
	) {}

	async get(params: GetCoparticipationPdfParams): Promise<GetCoparticipationPdfModel> {
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

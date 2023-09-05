import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {
	GetMedicalExternalUrl,
	GetMedicalExternalUrlModel,
	GetMedicalExternalUrlParams,
} from 'domain/usecases';

export class RemoteGetMedicalExternalUrl implements GetMedicalExternalUrl {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetMedicalExternalUrlModel>,
	) {}

	async get(params?: GetMedicalExternalUrlParams): Promise<GetMedicalExternalUrlModel> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'get',
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

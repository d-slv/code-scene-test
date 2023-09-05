import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {
	GetMedicalProviders,
	GetMedicalProvidersParams,
	GetMedicalProvidersModel,
} from 'domain/usecases';

export class RemoteGetMedicalProviders implements GetMedicalProviders {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetMedicalProvidersModel>,
	) {}

	async get(params: GetMedicalProvidersParams): Promise<GetMedicalProvidersModel> {
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

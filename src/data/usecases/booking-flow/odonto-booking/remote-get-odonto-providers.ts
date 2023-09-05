import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, NoContentError, UnknowError} from 'data/errors';
import {
	GetOdontoProviders,
	GetOdontoProvidersParams,
	GetOdontoProvidersModel,
} from 'domain/usecases';

export class RemoteGetOdontoProviders implements GetOdontoProviders {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetOdontoProvidersModel>,
	) {}

	async get(params: GetOdontoProvidersParams): Promise<GetOdontoProvidersModel> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'get',
			params,
		});
		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body;
			case HttpStatusCode.noContent:
				throw new NoContentError(httpResponse);
			case HttpStatusCode.unauthorized:
				throw new InvalidCredentialsError(httpResponse);
			default:
				throw new UnknowError(httpResponse);
		}
	}
}

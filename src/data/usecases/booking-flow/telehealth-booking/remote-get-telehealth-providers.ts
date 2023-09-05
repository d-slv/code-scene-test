import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {
	UserNoExistenceError,
	ServerError,
	InvalidCredentialsError,
	AccessDeniedError,
	NoContentError,
} from 'data/errors';
import * as GetTelehealthProviders from 'domain/usecases';

export class RemoteGetTelehealthProviders implements GetTelehealthProviders.GetTelehealthProviders {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetTelehealthProviders.GetTelehealthProvidersModel>,
	) {}

	async get(
		params: GetTelehealthProviders.GetTelehealthProvidersParams,
	): Promise<GetTelehealthProviders.GetTelehealthProvidersModel> {
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
			case HttpStatusCode.forbidden:
				throw new AccessDeniedError(httpResponse);
			case HttpStatusCode.notFound:
				throw new UserNoExistenceError(httpResponse);
			default:
				throw new ServerError(httpResponse);
		}
	}
}

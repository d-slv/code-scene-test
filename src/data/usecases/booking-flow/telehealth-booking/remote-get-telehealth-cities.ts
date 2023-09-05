import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {
	UserNoExistenceError,
	ServerError,
	InvalidCredentialsError,
	AccessDeniedError,
} from 'data/errors';
import * as GetTelehealthCities from 'domain/usecases';

export class RemoteGetTelehealthCities implements GetTelehealthCities.GetTelehealthCities {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetTelehealthCities.GetTelehealthCitiesModel>,
	) {}

	async get(
		params: GetTelehealthCities.GetTelehealthCitiesParams,
	): Promise<GetTelehealthCities.GetTelehealthCitiesModel> {
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
			case HttpStatusCode.forbidden:
				throw new AccessDeniedError(httpResponse);
			case HttpStatusCode.notFound:
				throw new UserNoExistenceError(httpResponse);
			default:
				throw new ServerError(httpResponse);
		}
	}
}

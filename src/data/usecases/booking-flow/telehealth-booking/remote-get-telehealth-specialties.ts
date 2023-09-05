import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {
	UserNoExistenceError,
	ServerError,
	InvalidCredentialsError,
	AccessDeniedError,
} from 'data/errors';
import * as GetTelehealthSpecialties from 'domain/usecases';

export class RemoteGetTelehealthSpecialties
	implements GetTelehealthSpecialties.GetTelehealthSpecialties
{
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetTelehealthSpecialties.GetTelehealthSpecialtiesModel>,
	) {}

	async get(
		params: GetTelehealthSpecialties.GetTelehealthSpecialtiesParams,
	): Promise<GetTelehealthSpecialties.GetTelehealthSpecialtiesModel> {
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

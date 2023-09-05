import * as GetTelehealthStates from 'domain/usecases';
import {
	UserNoExistenceError,
	ServerError,
	InvalidCredentialsError,
	AccessDeniedError,
} from 'data/errors';
import {HttpClient, HttpStatusCode} from 'data/protocols/http';

export class RemoteGetTelehealthStates implements GetTelehealthStates.GetTelehealthStates {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetTelehealthStates.GetTelehealthStatesModel>,
	) {}

	async get(): Promise<GetTelehealthStates.GetTelehealthStatesModel> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'get',
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

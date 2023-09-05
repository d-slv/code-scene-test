import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {GetOdontoStates, GetOdontoStatesModel} from 'domain/usecases';

export class RemoteGetOdontoStates implements GetOdontoStates {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetOdontoStatesModel>,
	) {}

	async get(): Promise<GetOdontoStatesModel> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'get',
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

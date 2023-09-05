import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {UnknowError, NoContentError, InvalidCredentialsError} from 'data/errors';
import {GetExamsStates, GetExamsStatesModel} from 'domain/usecases';

export class RemoteGetExamsStates implements GetExamsStates {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetExamsStatesModel>,
	) {}

	async get(): Promise<GetExamsStatesModel> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'get',
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

import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import * as Help from 'domain/usecases';
import {
	AccessDeniedError,
	InvalidCredentialsError,
	ServerError,
	UserNoExistenceError,
} from 'data/errors';

export class RemoteHelp implements Help.Help {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<Help.HelpModel>,
	) {}

	async auth(params: Help.HelpParams): Promise<Help.HelpModel> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'post',
			body: params,
		});
		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body;
			case HttpStatusCode.unauthorized:
				throw new InvalidCredentialsError();
			case HttpStatusCode.forbidden:
				throw new AccessDeniedError();
			case HttpStatusCode.notFound:
				throw new UserNoExistenceError();
			default:
				throw new ServerError();
		}
	}
}

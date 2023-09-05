import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {GetChatRoom, GetChatParams, GetChatModel} from 'domain/usecases';
import {UnknowError, InvalidCredentialsError} from 'data/errors';

export class RemoteGetChatRoom implements GetChatRoom {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetChatModel>,
	) {}

	async get(params: GetChatParams): Promise<GetChatModel> {
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

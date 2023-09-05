import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {RefreshToken, RefreshTokenParams, RefreshTokenModel} from 'domain/usecases';
import {UnknowError} from 'data/errors';

export class RemoteRefreshToken implements RefreshToken {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<RefreshTokenModel>,
	) {}

	async auth(params: RefreshTokenParams): Promise<RefreshTokenModel> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'post',
			body: params,
		});

		if (httpResponse.statusCode !== HttpStatusCode.ok) {
			throw new UnknowError(httpResponse);
		} else {
			return httpResponse.body;
		}
	}
}

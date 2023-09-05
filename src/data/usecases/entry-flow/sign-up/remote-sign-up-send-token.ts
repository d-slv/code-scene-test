import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {UnknowError} from 'data/errors';
import * as SignUpSendToken from 'domain/usecases';

export class RemoteSignUpSendToken implements SignUpSendToken.SignUpSendToken {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<SignUpSendToken.SignUpSendTokenModel>,
	) {}

	async signUpSendToken(
		params: SignUpSendToken.SignUpSendTokenParams,
	): Promise<SignUpSendToken.SignUpSendTokenModel> {
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

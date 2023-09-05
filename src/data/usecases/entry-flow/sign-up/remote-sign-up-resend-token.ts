import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import * as SignUpResendToken from 'domain/usecases';
import {UnknowError} from 'data/errors';

export class RemoteSignUpResendToken implements SignUpResendToken.SignUpResendToken {
	constructor(private readonly url: string, private readonly httpClient: HttpClient<void>) {}

	async signUpResendToken(params: SignUpResendToken.SignUpResendTokenParams): Promise<void> {
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

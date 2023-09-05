import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import * as ForgotPasswordResendToken from 'domain/usecases';
import {UnknowError} from 'data/errors';

export class RemoteForgotPasswordResendToken
	implements ForgotPasswordResendToken.ForgotPasswordResendToken
{
	constructor(private readonly url: string, private readonly httpClient: HttpClient<void>) {}

	async forgotPasswordResendToken(
		params: ForgotPasswordResendToken.ForgotPasswordResendTokenParams,
	): Promise<void> {
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

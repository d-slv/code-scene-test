import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import * as ForgotPasswordConfirm from 'domain/usecases';
import {UnknowError} from 'data/errors';

export class RemoteForgotPasswordConfirm implements ForgotPasswordConfirm.ForgotPasswordConfirm {
	constructor(private readonly url: string, private readonly httpClient: HttpClient<void>) {}

	async forgotPasswordConfirm(
		params: ForgotPasswordConfirm.ForgotPasswordConfirmParams,
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

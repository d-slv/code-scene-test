import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import * as SignUpConfirm from 'domain/usecases';
import {UnknowError} from 'data/errors';
import {ConflictError} from 'data/errors/conflict';

export class RemoteSignUpConfirm implements SignUpConfirm.SignUpConfirm {
	constructor(private readonly url: string, private readonly httpClient: HttpClient<void>) {}

	async signUpConfirm(params: SignUpConfirm.SignUpConfirmParams): Promise<void> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'post',
			body: params,
		});

		switch (httpResponse.statusCode) {
			case HttpStatusCode.created:
				return httpResponse.body;
			case HttpStatusCode.conflict:
				throw new ConflictError(httpResponse);
			default:
				throw new UnknowError(httpResponse);
		}
	}
}

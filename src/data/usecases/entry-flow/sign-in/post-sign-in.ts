import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import * as SignIn from 'domain/usecases';
import {UnknowError} from 'data/errors';

export class RemoteSignIn implements SignIn.SignIn {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<SignIn.SignInModel>,
	) {}

	async auth(params: SignIn.SignInParams): Promise<SignIn.SignInModel> {
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

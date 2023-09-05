import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import * as SignUpValidateToken from 'domain/usecases';
import {UnknowError} from 'data/errors';

export class RemoteSignUpValidateToken implements SignUpValidateToken.SignUpValidateToken {
	constructor(private readonly url: string, private readonly httpClient: HttpClient<void>) {}

	async get(params: SignUpValidateToken.SignUpValidateTokenParams): Promise<void> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'get',
			params,
		});
		if (httpResponse.statusCode !== HttpStatusCode.ok) {
			throw new UnknowError(httpResponse);
		} else {
			return httpResponse.body;
		}
	}
}

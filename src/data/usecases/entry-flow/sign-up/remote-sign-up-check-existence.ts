import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import * as SignUpCheckExistence from 'domain/usecases';
import {UnknowError} from 'data/errors';

export class RemoteSignUpCheckExistence implements SignUpCheckExistence.SignUpCheckExistence {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<SignUpCheckExistence.SignUpCheckExistenceModel>,
	) {}

	async signUpCheckExistence(
		params: SignUpCheckExistence.SignUpCheckExistenceParams,
	): Promise<SignUpCheckExistence.SignUpCheckExistenceModel> {
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

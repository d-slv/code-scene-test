import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {UnknowError, InvalidCredentialsError} from 'data/errors';
import {
	GetExamsAuthorizedPassword,
	GetExamsAuthorizedPasswordParams,
	GetExamsAuthorizedPasswordModel,
} from 'domain/usecases';

export class RemoteGetExamsAuthorizedPassword implements GetExamsAuthorizedPassword {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetExamsAuthorizedPasswordModel>,
	) {}

	async post(params: GetExamsAuthorizedPasswordParams): Promise<GetExamsAuthorizedPasswordModel> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'post',
			body: params,
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

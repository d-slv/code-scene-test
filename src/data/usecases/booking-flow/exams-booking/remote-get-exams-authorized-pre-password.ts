import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {UnknowError, InvalidCredentialsError} from 'data/errors';
import {
	GetExamsAuthorizedPrePassword,
	GetExamsAuthorizedPrePasswordParams,
	GetExamsAuthorizedPrePasswordModel,
} from 'domain/usecases';

export class RemoteGetExamsAuthorizedPrePassword implements GetExamsAuthorizedPrePassword {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetExamsAuthorizedPrePasswordModel>,
	) {}

	async post(
		params: GetExamsAuthorizedPrePasswordParams,
	): Promise<GetExamsAuthorizedPrePasswordModel> {
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

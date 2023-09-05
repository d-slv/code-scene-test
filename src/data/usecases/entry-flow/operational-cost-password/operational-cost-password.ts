import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {UnknowError, InvalidCredentialsError} from 'data/errors';
import {
	PostOperationalCostPassword,
	OperationalCostPasswordParams,
	OperationalCostPasswordModel,
} from 'domain/usecases';

export class RemotePostOperationalCostPassword implements PostOperationalCostPassword {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<OperationalCostPasswordParams>,
	) {}

	async post(params: OperationalCostPasswordParams): Promise<OperationalCostPasswordModel> {
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

import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {UnknowError, InvalidCredentialsError} from 'data/errors';
import {
	PostExamsConfirm,
	MakeExamsConfirmParams,
	MakeExamsConfirmParamsModel,
} from 'domain/usecases';

export class RemotePostExamsConfirm implements PostExamsConfirm {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<MakeExamsConfirmParamsModel>,
	) {}

	async post(params: MakeExamsConfirmParams): Promise<MakeExamsConfirmParamsModel> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'post',
			body: params,
		});
		switch (httpResponse.statusCode) {
			case HttpStatusCode.created:
				return httpResponse.body;
			case HttpStatusCode.unauthorized:
				throw new InvalidCredentialsError(httpResponse);
			default:
				throw new UnknowError(httpResponse);
		}
	}
}

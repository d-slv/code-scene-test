import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {PostOdontoCancel, PostOdontoCancelParams, PostOdontoCancelModel} from 'domain/usecases';

export class RemotePostOdontoCancel implements PostOdontoCancel {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<PostOdontoCancelModel>,
	) {}

	async post(params: PostOdontoCancelParams): Promise<PostOdontoCancelModel> {
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

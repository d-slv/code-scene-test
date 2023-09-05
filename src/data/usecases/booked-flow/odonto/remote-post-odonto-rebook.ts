import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {PostOdontoRebook, PostOdontoRebookParams, PostOdontoRebookModel} from 'domain/usecases';

export class RemotePostOndotRebook implements PostOdontoRebook {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<PostOdontoRebookModel>,
	) {}

	async post(params: PostOdontoRebookParams): Promise<PostOdontoRebookModel> {
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

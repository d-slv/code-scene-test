import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {PostExamsRebook, PostExamsRebookParams, PostExamsRebookModel} from 'domain/usecases';

export class RemotePostExamsRebook implements PostExamsRebook {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<PostExamsRebookModel>,
	) {}

	async post(params: PostExamsRebookParams): Promise<PostExamsRebookModel> {
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

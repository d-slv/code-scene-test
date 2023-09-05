import {PostExamsCancel, PostExamsCancelParams, PostExamsCancelModel} from 'domain/usecases';
import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';

export class RemotePostExamsCancel implements PostExamsCancel {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<PostExamsCancelModel>,
	) {}

	async post(params: PostExamsCancelParams): Promise<PostExamsCancelModel> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'post',
			body: params,
		});
		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body;
			case HttpStatusCode.created:
				return httpResponse.body;
			case HttpStatusCode.unauthorized:
				throw new InvalidCredentialsError(httpResponse);
			default:
				throw new UnknowError(httpResponse);
		}
	}
}

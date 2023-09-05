import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {PostMedicalRebook, PostMedicalRebookParams, PostMedicalRebookModel} from 'domain/usecases';

export class RemotePostMedicalRebook implements PostMedicalRebook {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<PostMedicalRebookModel>,
	) {}

	async post(params: PostMedicalRebookParams): Promise<PostMedicalRebookModel> {
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

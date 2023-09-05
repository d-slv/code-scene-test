import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {PostMedicalCancel, PostMedicalCancelParams, PostMedicalCancelModel} from 'domain/usecases';

export class RemotePostMedicalCancel implements PostMedicalCancel {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<PostMedicalCancelModel>,
	) {}

	async post(params: PostMedicalCancelParams): Promise<PostMedicalCancelModel> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'delete',
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

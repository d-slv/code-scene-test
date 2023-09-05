import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {
	PostIncomeTaxDetails,
	PostIncomeTaxDetailsParams,
	PostIncomeTaxDetailsModel,
} from 'domain/usecases';

export class RemotePostIncomeTaxDetails implements PostIncomeTaxDetails {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<PostIncomeTaxDetailsModel>,
	) {}

	async post(params: PostIncomeTaxDetailsParams): Promise<PostIncomeTaxDetailsModel> {
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

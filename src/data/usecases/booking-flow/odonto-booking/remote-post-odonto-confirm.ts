import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {
	PostOdontoBookingConfirm,
	PostOdontoBookingConfirmParams,
	PostOdontoBookingConfirmModel,
} from 'domain/usecases';

export class RemotePostOdontoBookingConfirm implements PostOdontoBookingConfirm {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<PostOdontoBookingConfirmModel>,
	) {}

	async post(params: PostOdontoBookingConfirmParams): Promise<PostOdontoBookingConfirmModel> {
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

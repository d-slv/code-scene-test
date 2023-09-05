import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {
	AccessDeniedError,
	InvalidCredentialsError,
	ServerError,
	UserNoExistenceError,
} from 'data/errors';
import * as PostTelehealthBooking from 'domain/usecases';

export class RemotePostTelehealthBooking implements PostTelehealthBooking.PostTelehealthBooking {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<PostTelehealthBooking.TelehealthBookingModel>,
	) {}

	async post(
		params: PostTelehealthBooking.TelehealthBookingParams,
	): Promise<PostTelehealthBooking.TelehealthBookingModel> {
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
			case HttpStatusCode.forbidden:
				throw new AccessDeniedError(httpResponse);
			case HttpStatusCode.notFound:
				throw new UserNoExistenceError(httpResponse);
			default:
				throw new ServerError(httpResponse);
		}
	}
}

import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {
	PostMedicalBookingConfirm,
	PostMedicalBookingConfirmParams,
	PostMedicalBookingConfirmModel,
} from 'domain/usecases';

export class RemotePostMedicalBookingConfirm implements PostMedicalBookingConfirm {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<PostMedicalBookingConfirmModel>,
	) {}

	async post(params: PostMedicalBookingConfirmParams): Promise<PostMedicalBookingConfirmModel> {
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

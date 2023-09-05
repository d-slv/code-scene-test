import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {
	PostMedicalCreateAppointment,
	PostMedicalCreateAppointmentParams,
	PostMedicalCreateAppointmentModel,
} from 'domain/usecases';

export class RemotePostMedicalCreateAppointment implements PostMedicalCreateAppointment {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<PostMedicalCreateAppointmentModel>,
	) {}

	async post(
		params: PostMedicalCreateAppointmentParams,
	): Promise<PostMedicalCreateAppointmentModel> {
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

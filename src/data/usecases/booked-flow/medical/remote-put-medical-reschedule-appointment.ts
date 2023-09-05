import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {
	PutMedicalRescheduleAppointment,
	PutMedicalRescheduleAppointmentParams,
	PutMedicalRescheduleAppointmentModel,
} from 'domain/usecases';

export class RemotePutMedicalRescheduleAppointment implements PutMedicalRescheduleAppointment {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<PutMedicalRescheduleAppointmentModel>,
	) {}

	async put(
		params: PutMedicalRescheduleAppointmentParams,
	): Promise<PutMedicalRescheduleAppointmentModel> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'put',
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

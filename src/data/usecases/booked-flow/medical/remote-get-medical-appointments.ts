import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {
	GetMedicalAppointments,
	GetMedicalAppointmentsParams,
	GetMedicalAppointmentsModel,
} from 'domain/usecases';

export class RemoteGetMedicalAppointments implements GetMedicalAppointments {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetMedicalAppointmentsModel>,
	) {}

	async get(params?: GetMedicalAppointmentsParams): Promise<GetMedicalAppointmentsModel> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'get',
			params,
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

import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {GetMedicalBooked, GetMedicalBookedParams, GetMedicalBookedModel} from 'domain/usecases';

export class RemoteGetMedicalBooked implements GetMedicalBooked {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetMedicalBookedModel>,
	) {}

	async get(params?: GetMedicalBookedParams): Promise<GetMedicalBookedModel> {
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

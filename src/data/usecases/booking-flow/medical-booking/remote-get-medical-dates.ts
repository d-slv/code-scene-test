import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {GetMedicalDates, GetMedicalDatesParams, GetMedicalDatesModel} from 'domain/usecases';

export class RemoteGetMedicalDates implements GetMedicalDates {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetMedicalDatesModel>,
	) {}

	async get(params: GetMedicalDatesParams): Promise<GetMedicalDatesModel> {
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

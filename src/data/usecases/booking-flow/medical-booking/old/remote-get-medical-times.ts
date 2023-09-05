import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {GetMedicalTimes, GetMedicalTimesParams, GetMedicalTimesModel} from 'domain/usecases';

export class RemoteGetMedicalTimes implements GetMedicalTimes {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetMedicalTimesModel>,
	) {}

	async get(params: GetMedicalTimesParams): Promise<GetMedicalTimesModel> {
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

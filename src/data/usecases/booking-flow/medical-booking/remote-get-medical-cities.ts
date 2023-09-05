import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {GetMedicalCities, GetMedicalCitiesParams, GetMedicalCitiesModel} from 'domain/usecases';

export class RemoteGetMedicalCities implements GetMedicalCities {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetMedicalCitiesModel>,
	) {}

	async get(params: GetMedicalCitiesParams): Promise<GetMedicalCitiesModel> {
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

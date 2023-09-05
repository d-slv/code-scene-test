import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {GetMedicalClinics, GetMedicalClinicsParams, GetMedicalClinicsModel} from 'domain/usecases';

export class RemoteGetMedicalClinics implements GetMedicalClinics {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetMedicalClinicsModel>,
	) {}

	async get(params: GetMedicalClinicsParams): Promise<GetMedicalClinicsModel> {
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

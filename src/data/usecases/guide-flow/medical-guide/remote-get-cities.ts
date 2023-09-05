import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import * as GetCitiesMedicalGuide from 'domain/usecases';

export class RemoteGetCitiesMedicalGuide implements GetCitiesMedicalGuide.GetCitiesMedicalGuide {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetCitiesMedicalGuide.GetCitiesMedicalGuideModel>,
	) {}

	async get(
		params: GetCitiesMedicalGuide.GetCitiesMedicalGuideParams,
	): Promise<GetCitiesMedicalGuide.GetCitiesMedicalGuideModel> {
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

import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import * as GetCitiesDentalGuide from 'domain/usecases';

export class RemoteGetCitiesDentalGuide implements GetCitiesDentalGuide.GetCitiesDentalGuide {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetCitiesDentalGuide.GetCitiesDentalGuideModel>,
	) {}

	async get(
		params: GetCitiesDentalGuide.GetCitiesDentalGuideParams,
	): Promise<GetCitiesDentalGuide.GetCitiesDentalGuideModel> {
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

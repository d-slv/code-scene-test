import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import * as GetServicesDentalGuide from 'domain/usecases';

export class RemoteGetServicesDentalGuide implements GetServicesDentalGuide.GetServicesDentalGuide {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetServicesDentalGuide.GetServicesDentalGuideModel>,
	) {}

	async get(
		params: GetServicesDentalGuide.GetServicesDentalGuideParams,
	): Promise<GetServicesDentalGuide.GetServicesDentalGuideModel> {
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

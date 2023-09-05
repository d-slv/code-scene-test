import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import * as GetStatesDentalGuide from 'domain/usecases';

export class RemoteGetStatesDentalGuide implements GetStatesDentalGuide.GetStatesDentalGuide {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetStatesDentalGuide.GetStatesDentalGuideModel>,
	) {}

	async get(
		params: GetStatesDentalGuide.GetStatesDentalGuideParams,
	): Promise<GetStatesDentalGuide.GetStatesDentalGuideModel> {
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

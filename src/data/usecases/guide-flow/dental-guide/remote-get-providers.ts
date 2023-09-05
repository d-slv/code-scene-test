import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import * as GetProvidersDentalGuide from 'domain/usecases';

export class RemoteGetProvidersDentalGuide
	implements GetProvidersDentalGuide.GetProvidersDentalGuide
{
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetProvidersDentalGuide.GetProvidersDentalGuideModel>,
	) {}

	async get(
		params: GetProvidersDentalGuide.GetProvidersDentalGuideParams,
	): Promise<GetProvidersDentalGuide.GetProvidersDentalGuideModel> {
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

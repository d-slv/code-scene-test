import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import * as GetProvidersDetailsDentalGuide from 'domain/usecases';

export class RemoteGetProvidersDetailsDentalGuide
	implements GetProvidersDetailsDentalGuide.GetProvidersDetailsDentalGuide
{
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetProvidersDetailsDentalGuide.GetProvidersDetailsDentalGuideModel>,
	) {}

	async get(
		params: GetProvidersDetailsDentalGuide.GetProvidersDetailsDentalGuideParams,
	): Promise<GetProvidersDetailsDentalGuide.GetProvidersDetailsDentalGuideModel> {
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

import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import * as GetNeighborhoodsDentalGuide from 'domain/usecases';

export class RemoteGetNeighborhoodsDentalGuide
	implements GetNeighborhoodsDentalGuide.GetNeighborhoodsDentalGuide
{
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetNeighborhoodsDentalGuide.GetNeighborhoodsDentalGuideModel>,
	) {}

	async get(
		params: GetNeighborhoodsDentalGuide.GetNeighborhoodsDentalGuideParams,
	): Promise<GetNeighborhoodsDentalGuide.GetNeighborhoodsDentalGuideModel> {
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

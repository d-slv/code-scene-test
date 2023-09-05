import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import * as GetSpecialtiesSubSpecialtiesDentalGuide from 'domain/usecases';

export class RemoteGetSpecialtiesSubSpecialtiesDentalGuide
	implements GetSpecialtiesSubSpecialtiesDentalGuide.GetSpecialtiesSubSpecialtiesDentalGuide
{
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetSpecialtiesSubSpecialtiesDentalGuide.GetSpecialtiesSubSpecialtiesDentalGuideModel>,
	) {}

	async get(
		params: GetSpecialtiesSubSpecialtiesDentalGuide.GetSpecialtiesSubSpecialtiesDentalGuideParams,
	): Promise<GetSpecialtiesSubSpecialtiesDentalGuide.GetSpecialtiesSubSpecialtiesDentalGuideModel> {
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

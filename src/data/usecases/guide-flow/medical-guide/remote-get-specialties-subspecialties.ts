import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import * as GetSpecialtiesSubSpecialtiesMedicalGuide from 'domain/usecases';

export class RemoteGetSpecialtiesSubSpecialtiesMedicalGuide
	implements GetSpecialtiesSubSpecialtiesMedicalGuide.GetSpecialtiesSubSpecialtiesMedicalGuide
{
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetSpecialtiesSubSpecialtiesMedicalGuide.GetSpecialtiesSubSpecialtiesMedicalGuideModel>,
	) {}

	async get(
		params: GetSpecialtiesSubSpecialtiesMedicalGuide.GetSpecialtiesSubSpecialtiesMedicalGuideParams,
	): Promise<GetSpecialtiesSubSpecialtiesMedicalGuide.GetSpecialtiesSubSpecialtiesMedicalGuideModel> {
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

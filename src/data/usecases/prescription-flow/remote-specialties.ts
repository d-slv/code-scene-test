import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import * as GetSpecialties from 'domain/usecases/prescription-flow/specialties';
import {InvalidCredentialsError, UnknowError} from 'data/errors';

export class RemoteGetSpecialties implements GetSpecialties.GetSpecialties {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetSpecialties.GetSpecialtiesModel>,
	) {}

	async getSpecialties(): Promise<GetSpecialties.GetSpecialtiesModel> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'get',
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

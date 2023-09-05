import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, NoContentError, UnknowError} from 'data/errors';
import {
	GetMedicalSpecialties,
	GetMedicalSpecialtiesParams,
	GetMedicalSpecialtiesModel,
} from 'domain/usecases';

export class RemoteGetMedicalSpecialties implements GetMedicalSpecialties {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetMedicalSpecialtiesModel>,
	) {}

	async get(params: GetMedicalSpecialtiesParams): Promise<GetMedicalSpecialtiesModel> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'get',
			params,
		});

		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body;
			case HttpStatusCode.noContent:
				throw new NoContentError(httpResponse);
			case HttpStatusCode.unauthorized:
				throw new InvalidCredentialsError(httpResponse);
			default:
				throw new UnknowError(httpResponse);
		}
	}
}

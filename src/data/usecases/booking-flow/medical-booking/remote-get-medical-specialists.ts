import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, NoContentError, UnknowError} from 'data/errors';
import {
	GetMedicalSpecialists,
	GetMedicalSpecialistsParams,
	GetMedicalSpecialistsModel,
} from 'domain/usecases';

export class RemoteGetMedicalSpecialists implements GetMedicalSpecialists {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetMedicalSpecialistsModel>,
	) {}

	async get(params: GetMedicalSpecialistsParams): Promise<GetMedicalSpecialistsModel> {
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

import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, NoContentError, UnknowError} from 'data/errors';
import {GetOdontoSpecialties, GetOdontoSpecialtiesModel} from 'domain/usecases';

export class RemoteGetOdontoSpecialties implements GetOdontoSpecialties {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetOdontoSpecialtiesModel>,
	) {}

	async get(): Promise<GetOdontoSpecialtiesModel> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'get',
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

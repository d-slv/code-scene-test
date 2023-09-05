import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {
	GetOdontoDistricts,
	GetOdontoDistrictsParams,
	GetOdontoDistrictsModel,
} from 'domain/usecases';

export class RemoteGetOdontoDistricts implements GetOdontoDistricts {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetOdontoDistrictsModel>,
	) {}

	async get(params: GetOdontoDistrictsParams): Promise<GetOdontoDistrictsModel> {
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

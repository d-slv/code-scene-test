import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {GetOdontoCities, GetOdontoCitiesParams, GetOdontoCitiesModel} from 'domain/usecases';

export class RemoteGetOdontoCities implements GetOdontoCities {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetOdontoCitiesModel>,
	) {}

	async get(params: GetOdontoCitiesParams): Promise<GetOdontoCitiesModel> {
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

import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {GetOdontoTimes, GetOdontoTimesParams, GetOdontoTimesModel} from 'domain/usecases';

export class RemoteGetOdontoTimes implements GetOdontoTimes {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetOdontoTimesModel>,
	) {}

	async get(params: GetOdontoTimesParams): Promise<GetOdontoTimesModel> {
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

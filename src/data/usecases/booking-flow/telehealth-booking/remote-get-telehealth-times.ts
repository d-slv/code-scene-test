import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {ServerError, NoContentError} from 'data/errors';
import * as GetTelehealthTimes from 'domain/usecases';

export class RemoteGetTelehealthTimes implements GetTelehealthTimes.GetTelehealthTimes {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetTelehealthTimes.GetTelehealthTimesModel>,
	) {}

	async get(
		params: GetTelehealthTimes.GetTelehealthTimesParams,
	): Promise<GetTelehealthTimes.GetTelehealthTimesModel> {
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
			default:
				throw new ServerError(httpResponse);
		}
	}
}

import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {GetOdontoBooked, OdontoBookedModel} from 'domain/usecases';

export class RemoteGetOdontoBooked implements GetOdontoBooked {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<OdontoBookedModel>,
	) {}

	async get(): Promise<OdontoBookedModel> {
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

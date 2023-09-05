import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {UnknowError, InvalidCredentialsError} from 'data/errors';
import * as GetFiveStars from 'domain/usecases';

export class RemoteGetFiveStars implements GetFiveStars.GetFiveStars {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetFiveStars.GetFiveStarsModel>,
	) {}

	async get(): Promise<GetFiveStars.GetFiveStarsModel> {
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

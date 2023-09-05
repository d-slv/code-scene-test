import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {GetHomeModel, GetHome} from 'domain/usecases';

export class RemoteGetHome implements GetHome {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetHomeModel>,
	) {}

	async get(): Promise<GetHomeModel> {
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

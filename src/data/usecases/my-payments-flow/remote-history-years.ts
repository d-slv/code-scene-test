import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {GetHistoryYears, GetHistoryYearsModel} from 'domain/usecases';

export class RemoteGetHistoryYears implements GetHistoryYears {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetHistoryYearsModel>,
	) {}

	async get(): Promise<GetHistoryYearsModel> {
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

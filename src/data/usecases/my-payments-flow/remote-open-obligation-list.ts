import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {GetOpenObligationList, GetOpenObligationListModel} from 'domain/usecases';

export class RemoteGetOpenObligationList implements GetOpenObligationList {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetOpenObligationListModel>,
	) {}

	async get(): Promise<GetOpenObligationListModel> {
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

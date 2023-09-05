import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {
	GetObligationHistory,
	GetObligationHistoryParams,
	GetObligationHistoryModel,
} from 'domain/usecases';

export class RemoteGetObligationHistory implements GetObligationHistory {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetObligationHistoryModel>,
	) {}

	async get(params: GetObligationHistoryParams): Promise<GetObligationHistoryModel> {
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

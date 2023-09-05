import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {GetExamsBooked, GetExamsBookedParams, GetExamsBookedModel} from 'domain/usecases';

export class RemoteGetExamsBooked implements GetExamsBooked {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetExamsBookedModel>,
	) {}

	async get(params: GetExamsBookedParams): Promise<GetExamsBookedModel> {
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

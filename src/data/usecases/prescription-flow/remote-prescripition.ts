import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {GetPrescriptions, GetPrescriptionsParams, GetPrescriptionsModel} from 'domain/usecases';
import {InvalidCredentialsError, UnknowError} from 'data/errors';

export class RemoteGetPrescriptions implements GetPrescriptions {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetPrescriptionsModel>,
	) {}

	async get(params: GetPrescriptionsParams): Promise<GetPrescriptionsModel> {
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

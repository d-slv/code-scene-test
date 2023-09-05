import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {GetOdontoDates, GetOdontoDatesParams, GetOdontoDatesModel} from 'domain/usecases';

export class RemoteGetOdontoDates implements GetOdontoDates {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetOdontoDatesModel>,
	) {}

	async get(params: GetOdontoDatesParams): Promise<GetOdontoDatesModel> {
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

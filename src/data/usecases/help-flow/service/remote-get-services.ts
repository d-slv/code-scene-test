import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import * as GetServices from 'domain/usecases';
import {ServerError, UnknowError} from 'data/errors';

export class RemoteGetServices implements GetServices.GetServices {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetServices.GetServicesModel>,
	) {}

	async getServices(): Promise<GetServices.GetServicesModel> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'get',
			headers: {
				Authorization: `Bearer ${process.env.API_CMS_TOKEN}`,
			},
		});
		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body;
			case HttpStatusCode.serverError:
				throw new ServerError();
			default:
				throw new UnknowError(httpResponse);
		}
	}
}

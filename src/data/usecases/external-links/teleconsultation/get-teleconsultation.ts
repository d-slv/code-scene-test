import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {GetTeleconsulLink, GetTeleconsulLinkParams, GetTeleconsulLinkModel} from 'domain/usecases';
import {UnknowError, InvalidCredentialsError} from 'data/errors';

export class RemoteGetTeleconsulLink implements GetTeleconsulLink {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetTeleconsulLinkModel>,
	) {}

	async get(params: GetTeleconsulLinkParams): Promise<GetTeleconsulLinkModel> {
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

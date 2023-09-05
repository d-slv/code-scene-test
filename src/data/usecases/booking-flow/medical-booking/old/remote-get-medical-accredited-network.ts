import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {UnknowError, InvalidCredentialsError} from 'data/errors';
import {
	GetMedicalAccreditedNetwork,
	GetMedicalAccreditedNetworkParams,
	GetMedicalAccreditedNetworkModel,
} from 'domain/usecases';

export class RemoteGetMedicalAccreditedNetwork implements GetMedicalAccreditedNetwork {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetMedicalAccreditedNetworkModel>,
	) {}

	async get(
		params: GetMedicalAccreditedNetworkParams,
	): Promise<GetMedicalAccreditedNetworkModel> {
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

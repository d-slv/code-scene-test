import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {UnknowError, InvalidCredentialsError} from 'data/errors';
import {
	GetMedicalSupportNetwork,
	GetMedicalSupportNetworkParams,
	GetMedicalSupportNetworkModel,
} from 'domain/usecases';

export class RemoteGetMedicalSupportNetwork implements GetMedicalSupportNetwork {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetMedicalSupportNetworkModel>,
	) {}

	async get(params: GetMedicalSupportNetworkParams): Promise<GetMedicalSupportNetworkModel> {
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

import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {GetBeneficiaryModel, GetBeneficiary, GetBeneficiaryParams} from 'domain/usecases';
import {UnknowError, InvalidCredentialsError} from 'data/errors';

export class RemoteGetBeneficiary implements GetBeneficiary {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetBeneficiaryModel>,
	) {}

	async getBeneficiary(params: GetBeneficiaryParams): Promise<GetBeneficiaryModel> {
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

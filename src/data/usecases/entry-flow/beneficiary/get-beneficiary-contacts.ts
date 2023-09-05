import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {GetBeneficiaryContactsModel, GetBeneficiaryContacts} from 'domain/usecases';
import {InvalidCredentialsError, UnknowError} from 'data/errors';

export class RemoteGetBeneficiaryContacts implements GetBeneficiaryContacts {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetBeneficiaryContactsModel>,
	) {}

	async get(): Promise<GetBeneficiaryContactsModel> {
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

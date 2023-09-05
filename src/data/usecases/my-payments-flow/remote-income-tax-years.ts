import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {GetIncomeTaxYears, GetIncomeTaxYearsModel} from 'domain/usecases';

export class RemoteGetIncomeTaxYears implements GetIncomeTaxYears {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetIncomeTaxYearsModel>,
	) {}

	async get(): Promise<GetIncomeTaxYearsModel> {
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

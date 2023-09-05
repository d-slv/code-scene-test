import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {GetMedicalCard, GetMedicalCardModel, GetMedicalCardParams} from 'domain/usecases';

export class RemoteGetMedicalCard implements GetMedicalCard {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetMedicalCardModel>,
	) {}

	async get(params: GetMedicalCardParams): Promise<GetMedicalCardModel> {
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

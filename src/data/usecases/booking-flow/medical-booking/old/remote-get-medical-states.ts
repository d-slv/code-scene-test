import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {GetMedicalStates, GetMedicalStatesModel} from 'domain/usecases';

export class RemoteGetMedicalStates implements GetMedicalStates {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetMedicalStatesModel>,
	) {}

	async get(): Promise<GetMedicalStatesModel> {
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

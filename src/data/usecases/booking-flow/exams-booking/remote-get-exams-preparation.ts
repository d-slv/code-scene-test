import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {UnknowError, InvalidCredentialsError} from 'data/errors';
import {
	GetExamsPreparation,
	GetExamsPreparationParams,
	GetExamsPreparationModel,
} from 'domain/usecases';

export class RemoteGetExamPreparation implements GetExamsPreparation {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetExamsPreparationModel>,
	) {}

	async get(params: GetExamsPreparationParams): Promise<GetExamsPreparationModel> {
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

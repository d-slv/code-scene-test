import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {UnknowError, NoContentError, InvalidCredentialsError} from 'data/errors';
import {GetExamsCities, GetExamsCitiesParams, GetExamsCitiesModel} from 'domain/usecases';

export class RemoteGetExamsCities implements GetExamsCities {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetExamsCitiesModel>,
	) {}

	async get(params: GetExamsCitiesParams): Promise<GetExamsCitiesModel> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'get',
			params,
		});
		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body;
			case HttpStatusCode.noContent:
				throw new NoContentError(httpResponse);
			case HttpStatusCode.unauthorized:
				throw new InvalidCredentialsError(httpResponse);
			default:
				throw new UnknowError(httpResponse);
		}
	}
}

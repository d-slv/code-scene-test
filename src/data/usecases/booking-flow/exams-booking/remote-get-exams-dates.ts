import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {UnknowError, NoContentError, InvalidCredentialsError} from 'data/errors';
import {GetExamsDates, GetExamsDatesParams, GetExamsDatesModel} from 'domain/usecases';

export class RemoteGetExamsDates implements GetExamsDates {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetExamsDatesModel>,
	) {}

	async get(params: GetExamsDatesParams): Promise<GetExamsDatesModel> {
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

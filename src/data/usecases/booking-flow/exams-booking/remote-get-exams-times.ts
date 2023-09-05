import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {UnknowError, NoContentError, InvalidCredentialsError} from 'data/errors';
import {GetExamsTimes, GetExamsTimesParams, GetExamsTimesModel} from 'domain/usecases';

export class RemoteGetExamsTimes implements GetExamsTimes {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetExamsTimesModel>,
	) {}

	async get(params: GetExamsTimesParams): Promise<GetExamsTimesModel> {
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

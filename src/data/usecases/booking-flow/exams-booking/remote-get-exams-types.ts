import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {UnknowError, NoContentError, InvalidCredentialsError} from 'data/errors';
import {GetExamsTypes, GetExamsTypesParams, GetExamsTypesModel} from 'domain/usecases';

export class RemoteGetExamsTypes implements GetExamsTypes {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetExamsTypesModel>,
	) {}

	async get(params: GetExamsTypesParams): Promise<GetExamsTypesModel> {
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

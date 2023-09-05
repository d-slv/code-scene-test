import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {
	GetCoparticipation,
	GetCoparticipationModel,
	GetCoparticipationParams,
} from 'domain/usecases';

export class RemoteGetCoparticipation implements GetCoparticipation {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetCoparticipationModel>,
	) {}

	async get(params: GetCoparticipationParams): Promise<GetCoparticipationModel> {
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

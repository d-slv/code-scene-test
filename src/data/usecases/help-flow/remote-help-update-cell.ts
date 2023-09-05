import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {
	UserNoExistenceError,
	ServerError,
	AccessDeniedError,
	InvalidCredentialsError,
} from 'data/errors';
import * as HelpUpdateCell from 'domain/usecases';

export class RemoteHelpUpdateCell implements HelpUpdateCell.HelpUpdateCell {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<HelpUpdateCell.HelpUpdateCellModel>,
	) {}

	async helpUpdateCell(
		params: HelpUpdateCell.HelpUpdateCellParams,
	): Promise<HelpUpdateCell.HelpUpdateCellModel> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'get',
			params,
		});
		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body;
			case HttpStatusCode.unauthorized:
				throw new InvalidCredentialsError();
			case HttpStatusCode.forbidden:
				throw new AccessDeniedError();
			case HttpStatusCode.notFound:
				throw new UserNoExistenceError();
			default:
				throw new ServerError();
		}
	}
}

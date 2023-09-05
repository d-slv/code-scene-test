import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {
	UserNoExistenceError,
	ServerError,
	AccessDeniedError,
	InvalidCredentialsError,
} from 'data/errors';
import * as HelpVerifyCellCapture from 'domain/usecases';

export class RemoteHelpVerifyCellCapture implements HelpVerifyCellCapture.HelpVerifyCellCapture {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<HelpVerifyCellCapture.HelpVerifyCellCaptureModel>,
	) {}

	async helpVerifyCellCapture(
		params: HelpVerifyCellCapture.HelpVerifyCellCaptureParams,
	): Promise<HelpVerifyCellCapture.HelpVerifyCellCaptureModel> {
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

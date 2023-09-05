import {PatchOdontoConfirm, PatchOdontoConfirmParams} from 'domain/usecases';
import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';

export class RemotePatchOdontoConfirm implements PatchOdontoConfirm {
	constructor(private readonly url: string, private readonly httpClient: HttpClient<unknown>) {}

	async patch(params: PatchOdontoConfirmParams): Promise<unknown> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'patch',
			body: params,
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

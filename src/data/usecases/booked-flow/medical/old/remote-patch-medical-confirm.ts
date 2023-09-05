import {PatchMedicalConfirm, PatchMedicalConfirmParams} from 'domain/usecases';
import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';

export class RemotePatchMedicalConfirm implements PatchMedicalConfirm {
	constructor(private readonly url: string, private readonly httpClient: HttpClient<unknown>) {}

	async patch(params: PatchMedicalConfirmParams): Promise<unknown> {
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

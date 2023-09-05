import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {
	PatchMedicalConfirm,
	PatchMedicalConfirmParams,
	PatchMedicalConfirmModel,
} from 'domain/usecases';

export class RemotePatchMedicalConfirm implements PatchMedicalConfirm {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<PatchMedicalConfirmModel>,
	) {}

	async patch(params: PatchMedicalConfirmParams): Promise<PatchMedicalConfirmModel> {
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

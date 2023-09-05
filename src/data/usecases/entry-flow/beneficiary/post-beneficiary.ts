import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {PostBeneficiaryModel, PostBeneficiary, PostBeneficiaryParams} from 'domain/usecases';
import {InvalidCredentialsError, UnknowError} from 'data/errors';

export class RemotePostBeneficiary implements PostBeneficiary {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<PostBeneficiaryModel>,
	) {}

	async postBeneficiary(params: PostBeneficiaryParams): Promise<PostBeneficiaryModel> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'post',
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

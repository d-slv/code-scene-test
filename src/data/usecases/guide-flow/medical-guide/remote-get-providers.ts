import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import * as GetProvidersMedicalGuide from 'domain/usecases';

export class RemoteGetProvidersMedicalGuide
	implements GetProvidersMedicalGuide.GetProvidersMedicalGuide
{
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetProvidersMedicalGuide.GetProvidersMedicalGuideModel>,
	) {}

	async get(
		params: GetProvidersMedicalGuide.GetProvidersMedicalGuideParams,
	): Promise<GetProvidersMedicalGuide.GetProvidersMedicalGuideModel> {
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

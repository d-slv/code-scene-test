import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import * as GetProvidersDetailsMedicalGuide from 'domain/usecases';

export class RemoteGetProvidersDetailsMedicalGuide
	implements GetProvidersDetailsMedicalGuide.GetProvidersDetailsMedicalGuide
{
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetProvidersDetailsMedicalGuide.GetProvidersDetailsMedicalGuideModel>,
	) {}

	async get(
		params: GetProvidersDetailsMedicalGuide.GetProvidersDetailsMedicalGuideParams,
	): Promise<GetProvidersDetailsMedicalGuide.GetProvidersDetailsMedicalGuideModel> {
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

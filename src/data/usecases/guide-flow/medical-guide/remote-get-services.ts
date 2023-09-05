import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import * as GetServicesMedicalGuide from 'domain/usecases';

export class RemoteGetServicesMedicalGuide
	implements GetServicesMedicalGuide.GetServicesMedicalGuide
{
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetServicesMedicalGuide.GetServicesMedicalGuideModel>,
	) {}

	async get(
		params: GetServicesMedicalGuide.GetServicesMedicalGuideParams,
	): Promise<GetServicesMedicalGuide.GetServicesMedicalGuideModel> {
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

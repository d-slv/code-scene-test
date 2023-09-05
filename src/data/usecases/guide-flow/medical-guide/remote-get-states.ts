import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import * as GetStatesMedicalGuide from 'domain/usecases';

export class RemoteGetStatesMedicalGuide implements GetStatesMedicalGuide.GetStatesMedicalGuide {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetStatesMedicalGuide.GetStatesMedicalGuideModel>,
	) {}

	async get(
		params: GetStatesMedicalGuide.GetStatesMedicalGuideParams,
	): Promise<GetStatesMedicalGuide.GetStatesMedicalGuideModel> {
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

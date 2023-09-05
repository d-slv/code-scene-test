import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidTokenError, UnknowError} from 'data/errors';
import {GetPlan, GetPlanModel, GetPlanParams} from 'domain/usecases';

export class RemoteGetPlan implements GetPlan {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetPlanModel>,
	) {}

	async getPlan(params: GetPlanParams): Promise<GetPlanModel> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'get',
			headers: {
				Authorization: `Bearer ${params.login_token}`,
				'Ocp-Apim-Subscription-Key': process.env.API_BFF_AZURE_SUBSCRIPTION_KEY,
			},
		});

		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body;
			case HttpStatusCode.forbidden:
				throw new InvalidTokenError(httpResponse);
			default:
				throw new UnknowError(httpResponse);
		}
	}
}

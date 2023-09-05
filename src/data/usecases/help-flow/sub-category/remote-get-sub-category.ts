import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import * as GetSubCategories from 'domain/usecases';
import {ServerError, UnknowError} from 'data/errors';

export class RemoteGetSubCategories implements GetSubCategories.GetSubCategories {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetSubCategories.GetSubCategoriesModel>,
	) {}

	async getSubCategories(): Promise<GetSubCategories.GetSubCategoriesModel> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'get',
			headers: {
				Authorization: `Bearer ${process.env.API_CMS_TOKEN}`,
			},
		});
		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body;
			case HttpStatusCode.serverError:
				throw new ServerError();
			default:
				throw new UnknowError(httpResponse);
		}
	}
}

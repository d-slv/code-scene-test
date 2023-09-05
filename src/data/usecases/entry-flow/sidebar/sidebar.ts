import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {InvalidCredentialsError, UnknowError} from 'data/errors';
import {GetSidebarModel, GetSidebar} from 'domain/usecases';

export class RemoteGetSidebar implements GetSidebar {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<GetSidebarModel>,
	) {}

	async getSidebarData(): Promise<GetSidebarModel> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'get',
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

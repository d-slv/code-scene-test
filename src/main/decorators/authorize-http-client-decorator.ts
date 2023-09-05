import {HttpClient, HttpRequest, HttpResponse} from 'data/protocols/http';
import {GetStorage} from 'data/protocols/cache';

export class AuthorizeHttpClientDecorator implements HttpClient {
	constructor(private readonly getStorage: GetStorage, private readonly httpClient: HttpClient) {}

	async request(data: HttpRequest): Promise<HttpResponse> {
		const account = this.getStorage.get('account');
		if (data.headers === undefined) {
			if (account?.access_token) {
				Object.assign(data, {
					headers: Object.assign(data.headers || {}, {
						'Ocp-Apim-Subscription-Key': process.env.API_BFF_AZURE_SUBSCRIPTION_KEY,
						Authorization: `Bearer ${account.access_token}`,
					}),
				});
			} else if (account?.login_token) {
				Object.assign(data, {
					headers: Object.assign(data.headers || {}, {
						'Ocp-Apim-Subscription-Key': process.env.API_BFF_AZURE_SUBSCRIPTION_KEY,
						Authorization: `Bearer ${account.login_token}`,
					}),
				});
			} else {
				Object.assign(data, {
					headers: Object.assign(data.headers || {}, {
						'Ocp-Apim-Subscription-Key': process.env.API_BFF_AZURE_SUBSCRIPTION_KEY,
					}),
				});
			}
		}
		return this.httpClient.request(data);
	}
}

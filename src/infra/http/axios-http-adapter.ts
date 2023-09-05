/* eslint-disable class-methods-use-this */
import axios, {AxiosResponse} from 'axios';
import {HttpRequest, HttpResponse, HttpClient} from 'data/protocols/http';

export class AxiosHttpAdapter implements HttpClient {
	constructor(private axiosResponse: AxiosResponse, private data: HttpRequest) {}

	async refresh(data: HttpRequest): Promise<void> {
		this.data = data;
		const currentAccount = JSON.parse(localStorage.getItem('account'));
		try {
			this.axiosResponse = await axios.request({
				url: `${process.env.API_BFF}/v1/entry-flow/auth/refresh-token`,
				method: 'post',
				data: {refresh_token: currentAccount.refresh_token},
				headers: data.headers,
			});

			const refreshAccount = {
				...this.axiosResponse.data,
				sidebar: {
					...currentAccount.sidebar,
				},
			};
			localStorage.setItem('account', JSON.stringify(refreshAccount));
			this.data.headers.Authorization = `Bearer ${this.axiosResponse.data.access_token}`;
			this.request(this.data);
		} catch (error) {
			localStorage.clear();
			window.location.href = '/';
		}
	}

	async request(data: HttpRequest): Promise<HttpResponse> {
		try {
			this.axiosResponse = await axios.request({
				url: data.url,
				method: data.method,
				data: data.body,
				headers: data.headers,
				params: data.params,
				responseType: data.responseType,
			});
		} catch (error) {
			if (error.response.status === 401) {
				this.refresh(data);
			} else {
				this.axiosResponse = error.response;
			}
		}
		return {
			statusCode: this.axiosResponse.status,
			body: this.axiosResponse.data,
		};
	}
}

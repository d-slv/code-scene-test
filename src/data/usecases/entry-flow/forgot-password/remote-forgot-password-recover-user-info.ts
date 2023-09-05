import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import * as ForgotPasswordRecoverUserInfo from 'domain/usecases';
import {UnknowError} from 'data/errors';

export class RemoteForgotPasswordRecoverUserInfo
	implements ForgotPasswordRecoverUserInfo.ForgotPasswordRecoverUserInfo
{
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<ForgotPasswordRecoverUserInfo.forgotPasswordRecoverUserInfoModel>,
	) {}

	async forgotPasswordRecoverUserInfo(
		params: ForgotPasswordRecoverUserInfo.forgotPasswordRecoverUserInfoParams,
	): Promise<ForgotPasswordRecoverUserInfo.forgotPasswordRecoverUserInfoModel> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'post',
			body: params,
		});
		if (httpResponse.statusCode !== HttpStatusCode.ok) {
			throw new UnknowError(httpResponse);
		} else {
			return httpResponse.body;
		}
	}
}

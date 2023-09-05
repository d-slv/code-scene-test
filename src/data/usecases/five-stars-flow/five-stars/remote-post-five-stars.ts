import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import {
	UserNoExistenceError,
	ServerError,
	InvalidCredentialsError,
	AccessDeniedError,
} from 'data/errors';
import * as PostFiveStars from 'domain/usecases';

export class RemotePostFiveStars implements PostFiveStars.PostFiveStars {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<PostFiveStars.PostFiveStarsModel>,
	) {}

	async post(
		params: PostFiveStars.PostFiveStarsParams,
	): Promise<PostFiveStars.PostFiveStarsModel> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'post',
			body: params,
		});
		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body;
			case HttpStatusCode.unauthorized:
				throw new InvalidCredentialsError(httpResponse);
			case HttpStatusCode.forbidden:
				throw new AccessDeniedError(httpResponse);
			case HttpStatusCode.notFound:
				throw new UserNoExistenceError(httpResponse);
			default:
				throw new ServerError(httpResponse);
		}
	}
}

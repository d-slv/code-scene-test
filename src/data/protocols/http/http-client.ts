export type HttpMethod = 'post' | 'get' | 'put' | 'delete' | 'patch';

export type HttpRequest = {
	url: string;
	method: HttpMethod;
	body?: any;
	headers?: any;
	params?: any;
	responseType?: any;
};

export enum HttpStatusCode {
	ok = 200,
	created = 201,
	noContent = 204,
	redirect = 301,
	badRequest = 400,
	unauthorized = 401,
	forbidden = 403,
	notFound = 404,
	conflict = 409,
	unprocessable = 422,
	serverError = 500,
}

export type HttpResponse<T = any> = {
	statusCode: HttpStatusCode;
	body?: T;
};

export interface HttpClient<R = any> {
	refresh: (data: HttpRequest) => Promise<void>;
	request: (data: HttpRequest) => Promise<HttpResponse<R>>;
}

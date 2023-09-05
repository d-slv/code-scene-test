import {AxiosHttpAdapter} from 'infra/http/axios-http-adapter';

export const makeAxiosHttpClient = (): AxiosHttpAdapter => new AxiosHttpAdapter();

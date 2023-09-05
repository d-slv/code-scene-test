import {GetCategories} from 'domain/usecases';
import {RemoteGetCategories} from 'data/usecases';
import {makeAxiosHttpClient} from 'main/factories/http';
import {makeCMSApiUrl} from 'main/factories/http/api-cms-url-factory';

export const makeGetCategories = (): GetCategories =>
	new RemoteGetCategories(makeCMSApiUrl('/categories'), makeAxiosHttpClient());

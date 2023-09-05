import {GetSubCategories} from 'domain/usecases';
import {RemoteGetSubCategories} from 'data/usecases';
import {makeAxiosHttpClient} from 'main/factories/http';
import {makeCMSApiUrl} from 'main/factories/http/api-cms-url-factory';

export const makeGetSubCategories = (): GetSubCategories =>
	new RemoteGetSubCategories(makeCMSApiUrl('/sub-categories'), makeAxiosHttpClient());

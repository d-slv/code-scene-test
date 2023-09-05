import {GetServices} from 'domain/usecases';
import {RemoteGetServices} from 'data/usecases';
import {makeAxiosHttpClient} from 'main/factories/http';
import {makeCMSApiUrl} from 'main/factories/http/api-cms-url-factory';

export const makeGetServices = (): GetServices =>
	new RemoteGetServices(makeCMSApiUrl('/services'), makeAxiosHttpClient());

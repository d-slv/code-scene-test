import {GetSidebar} from 'domain/usecases';
import {RemoteGetSidebar} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {entryFlowEndPoints} from '../../endpoints';

export const makeGetSidebar = (): GetSidebar =>
	new RemoteGetSidebar(
		makeBFFApiUrl(entryFlowEndPoints.sidebar),
		makeAuthorizeHttpClientDecorator(),
	);

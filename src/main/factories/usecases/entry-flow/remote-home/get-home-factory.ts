import {GetHome} from 'domain/usecases';
import {RemoteGetHome} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {entryFlowEndPoints} from '../../endpoints';

export const makeGetHome = (): GetHome =>
	new RemoteGetHome(makeBFFApiUrl(entryFlowEndPoints.home), makeAuthorizeHttpClientDecorator());

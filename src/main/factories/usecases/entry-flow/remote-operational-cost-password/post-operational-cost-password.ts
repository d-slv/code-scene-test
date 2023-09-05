import {PostOperationalCostPassword} from 'domain/usecases';
import {RemotePostOperationalCostPassword} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {entryFlowEndPoints} from '../../endpoints';

export const makePostOperationalCostPassword = (): PostOperationalCostPassword =>
	new RemotePostOperationalCostPassword(
		makeBFFApiUrl(entryFlowEndPoints.homeOperationalCostPassword),
		makeAuthorizeHttpClientDecorator(),
	);

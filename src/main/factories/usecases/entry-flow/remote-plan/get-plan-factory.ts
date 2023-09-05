import {GetPlan} from 'domain/usecases';
import {RemoteGetPlan} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {entryFlowEndPoints} from '../../endpoints';

export const makeGetPlan = (): GetPlan =>
	new RemoteGetPlan(
		makeBFFApiUrl(entryFlowEndPoints.planList),
		makeAuthorizeHttpClientDecorator(),
	);

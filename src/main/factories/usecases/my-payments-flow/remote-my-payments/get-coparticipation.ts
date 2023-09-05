import {GetCoparticipation} from 'domain/usecases';
import {RemoteGetCoparticipation} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {myPaymentsFlowEndPoints} from '../../endpoints';

export const makeGetCoparticipation = (): GetCoparticipation =>
	new RemoteGetCoparticipation(
		makeBFFApiUrl(myPaymentsFlowEndPoints.coparticipationExtract),
		makeAuthorizeHttpClientDecorator(),
	);

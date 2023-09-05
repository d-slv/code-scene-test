import {GetOpenObligationList} from 'domain/usecases';
import {RemoteGetOpenObligationList} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {myPaymentsFlowEndPoints} from '../../endpoints';

export const makeGetOpenObligationList = (): GetOpenObligationList =>
	new RemoteGetOpenObligationList(
		makeBFFApiUrl(myPaymentsFlowEndPoints.payments),
		makeAuthorizeHttpClientDecorator(),
	);

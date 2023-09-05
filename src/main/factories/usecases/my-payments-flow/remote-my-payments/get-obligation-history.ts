import {GetObligationHistory} from 'domain/usecases';
import {RemoteGetObligationHistory} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {myPaymentsFlowEndPoints} from '../../endpoints';

export const makeGetObligationHistory = (): GetObligationHistory =>
	new RemoteGetObligationHistory(
		makeBFFApiUrl(myPaymentsFlowEndPoints.paymentsHistory),
		makeAuthorizeHttpClientDecorator(),
	);

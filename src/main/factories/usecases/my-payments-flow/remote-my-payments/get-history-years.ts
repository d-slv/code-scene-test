import {GetHistoryYears} from 'domain/usecases';
import {RemoteGetHistoryYears} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {myPaymentsFlowEndPoints} from '../../endpoints';

export const makeGetHistoryYears = (): GetHistoryYears =>
	new RemoteGetHistoryYears(
		makeBFFApiUrl(myPaymentsFlowEndPoints.paymentsHistoryYears),
		makeAuthorizeHttpClientDecorator(),
	);

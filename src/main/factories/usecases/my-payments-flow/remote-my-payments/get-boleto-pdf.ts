import {GetObligationPdf} from 'domain/usecases';
import {RemoteGetObligationPdf} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {myPaymentsFlowEndPoints} from '../../endpoints';

export const makeGetObligationPdf = (): GetObligationPdf =>
	new RemoteGetObligationPdf(
		makeBFFApiUrl(myPaymentsFlowEndPoints.paymentsPdf),
		makeAuthorizeHttpClientDecorator(),
	);

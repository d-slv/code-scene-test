import {GetIncomeTaxYears} from 'domain/usecases';
import {RemoteGetIncomeTaxYears} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {myPaymentsFlowEndPoints} from '../../endpoints';

export const makeGetIncomeTaxYears = (): GetIncomeTaxYears =>
	new RemoteGetIncomeTaxYears(
		makeBFFApiUrl(myPaymentsFlowEndPoints.incomeTax),
		makeAuthorizeHttpClientDecorator(),
	);

import {PostIncomeTaxDetails} from 'domain/usecases';
import {RemotePostIncomeTaxDetails} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {myPaymentsFlowEndPoints} from '../../endpoints';

export const makePostIncomeTaxDetails = (): PostIncomeTaxDetails =>
	new RemotePostIncomeTaxDetails(
		makeBFFApiUrl(myPaymentsFlowEndPoints.incomeTax),
		makeAuthorizeHttpClientDecorator(),
	);

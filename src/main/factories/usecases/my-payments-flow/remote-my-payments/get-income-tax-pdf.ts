import {GetIncomeTaxPDF} from 'domain/usecases';
import {RemoteGetIncomeTaxPDF} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {myPaymentsFlowEndPoints} from '../../endpoints';

export const makeGetIncomeTaxPDF = (): GetIncomeTaxPDF =>
	new RemoteGetIncomeTaxPDF(
		makeBFFApiUrl(myPaymentsFlowEndPoints.incomeTaxPDF),
		makeAuthorizeHttpClientDecorator(),
	);

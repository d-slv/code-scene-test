import {GetCoparticipationPdf} from 'domain/usecases';
import {RemoteGetCoparticipationPDF} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {myPaymentsFlowEndPoints} from '../../endpoints';

export const makeGetCoparticipationPdf = (): GetCoparticipationPdf =>
	new RemoteGetCoparticipationPDF(
		makeBFFApiUrl(myPaymentsFlowEndPoints.coparticipationExtractPdf),
		makeAuthorizeHttpClientDecorator(),
	);

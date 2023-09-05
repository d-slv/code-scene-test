import {GetExamsTimes} from 'domain/usecases';
import {RemoteGetExamsTimes} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetExamsTimes = (): GetExamsTimes =>
	new RemoteGetExamsTimes(
		makeBFFApiUrl(bookingFlowEndPoints.examTimes),
		makeAuthorizeHttpClientDecorator(),
	);

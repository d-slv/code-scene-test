import {GetExamsStates} from 'domain/usecases';
import {RemoteGetExamsStates} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetExamsStates = (): GetExamsStates =>
	new RemoteGetExamsStates(
		makeBFFApiUrl(bookingFlowEndPoints.examStates),
		makeAuthorizeHttpClientDecorator(),
	);

import {GetExamsTypes} from 'domain/usecases';
import {RemoteGetExamsTypes} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetExamsTypes = (): GetExamsTypes =>
	new RemoteGetExamsTypes(
		makeBFFApiUrl(bookingFlowEndPoints.examsTypes),
		makeAuthorizeHttpClientDecorator(),
	);

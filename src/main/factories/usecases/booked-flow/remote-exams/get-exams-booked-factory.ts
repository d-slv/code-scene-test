import {GetExamsBooked} from 'domain/usecases';
import {RemoteGetExamsBooked} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookedFlowEndPoints} from '../../endpoints';

export const makeGetExamsBooked = (): GetExamsBooked =>
	new RemoteGetExamsBooked(
		makeBFFApiUrl(bookedFlowEndPoints.examsBooked),
		makeAuthorizeHttpClientDecorator(),
	);

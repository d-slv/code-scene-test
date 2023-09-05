import {PostExamsCancel} from 'domain/usecases';
import {RemotePostExamsCancel} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookedFlowEndPoints} from '../../endpoints';

export const makePostExamsCancelBooked = (): PostExamsCancel =>
	new RemotePostExamsCancel(
		makeBFFApiUrl(bookedFlowEndPoints.examsCancel),
		makeAuthorizeHttpClientDecorator(),
	);

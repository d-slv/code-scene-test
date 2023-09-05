import {PostExamsRebook} from 'domain/usecases';
import {RemotePostExamsRebook} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookedFlowEndPoints} from '../../endpoints';

export const makePostExamsRebook = (): PostExamsRebook =>
	new RemotePostExamsRebook(
		makeBFFApiUrl(bookedFlowEndPoints.examsRebooking),
		makeAuthorizeHttpClientDecorator(),
	);

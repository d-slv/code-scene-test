import {PostOdontoRebook} from 'domain/usecases';
import {RemotePostOndotRebook} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookedFlowEndPoints} from '../../endpoints';

export const makePostOdontoRebook = (): PostOdontoRebook =>
	new RemotePostOndotRebook(
		makeBFFApiUrl(bookedFlowEndPoints.odontoRebooking),
		makeAuthorizeHttpClientDecorator(),
	);

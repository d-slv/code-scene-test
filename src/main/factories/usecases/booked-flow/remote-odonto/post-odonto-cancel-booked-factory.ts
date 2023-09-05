import {PostOdontoCancel} from 'domain/usecases';
import {RemotePostOdontoCancel} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookedFlowEndPoints} from '../../endpoints';

export const makePostOdontoCancelBooked = (): PostOdontoCancel =>
	new RemotePostOdontoCancel(
		makeBFFApiUrl(bookedFlowEndPoints.odontoCancel),
		makeAuthorizeHttpClientDecorator(),
	);

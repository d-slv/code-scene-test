import {GetOdontoBooked} from 'domain/usecases';
import {RemoteGetOdontoBooked} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookedFlowEndPoints} from '../../endpoints';

export const makeGetOdontoBooked = (): GetOdontoBooked =>
	new RemoteGetOdontoBooked(
		makeBFFApiUrl(bookedFlowEndPoints.odontoBooked),
		makeAuthorizeHttpClientDecorator(),
	);

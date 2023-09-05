import {GetOdontoSpecialties} from 'domain/usecases';
import {RemoteGetOdontoSpecialties} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetOdontoSpecialties = (): GetOdontoSpecialties =>
	new RemoteGetOdontoSpecialties(
		makeBFFApiUrl(bookingFlowEndPoints.odontoSpecialties),
		makeAuthorizeHttpClientDecorator(),
	);

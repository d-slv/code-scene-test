import {GetOdontoDistricts} from 'domain/usecases';
import {RemoteGetOdontoDistricts} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetOdontoDistricts = (): GetOdontoDistricts =>
	new RemoteGetOdontoDistricts(
		makeBFFApiUrl(bookingFlowEndPoints.odontoDistricts),
		makeAuthorizeHttpClientDecorator(),
	);

import {GetOdontoDates} from 'domain/usecases';
import {RemoteGetOdontoDates} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetOdontoDates = (): GetOdontoDates =>
	new RemoteGetOdontoDates(
		makeBFFApiUrl(bookingFlowEndPoints.odontoDates),
		makeAuthorizeHttpClientDecorator(),
	);

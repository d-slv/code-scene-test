import {GetOdontoCities} from 'domain/usecases';
import {RemoteGetOdontoCities} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetOdontoCities = (): GetOdontoCities =>
	new RemoteGetOdontoCities(
		makeBFFApiUrl(bookingFlowEndPoints.odontoCities),
		makeAuthorizeHttpClientDecorator(),
	);

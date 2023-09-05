import {GetTelehealthDates} from 'domain/usecases';
import {RemoteGetTelehealthDates} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetTelehealthDates = (): GetTelehealthDates =>
	new RemoteGetTelehealthDates(
		makeBFFApiUrl(bookingFlowEndPoints.teleDates),
		makeAuthorizeHttpClientDecorator(),
	);

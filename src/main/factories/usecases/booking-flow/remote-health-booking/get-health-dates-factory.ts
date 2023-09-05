import {GetMedicalDates} from 'domain/usecases';
import {RemoteGetMedicalDates} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetMedicalDates = (): GetMedicalDates =>
	new RemoteGetMedicalDates(
		makeBFFApiUrl(bookingFlowEndPoints.medicalDates),
		makeAuthorizeHttpClientDecorator(),
	);

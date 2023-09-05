import {GetExamsCities} from 'domain/usecases';
import {RemoteGetExamsCities} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetExamsCities = (): GetExamsCities =>
	new RemoteGetExamsCities(
		makeBFFApiUrl(bookingFlowEndPoints.examCities),
		makeAuthorizeHttpClientDecorator(),
	);

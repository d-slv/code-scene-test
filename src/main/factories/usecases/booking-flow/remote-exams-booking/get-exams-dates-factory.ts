import {GetExamsDates} from 'domain/usecases';
import {RemoteGetExamsDates} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetExamsDates = (): GetExamsDates =>
	new RemoteGetExamsDates(
		makeBFFApiUrl(bookingFlowEndPoints.examDates),
		makeAuthorizeHttpClientDecorator(),
	);

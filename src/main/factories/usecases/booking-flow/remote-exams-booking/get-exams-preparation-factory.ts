import {GetExamsPreparation} from 'domain/usecases';
import {RemoteGetExamPreparation} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetExamsPreparation = (): GetExamsPreparation =>
	new RemoteGetExamPreparation(
		makeBFFApiUrl(bookingFlowEndPoints.examPreparation),
		makeAuthorizeHttpClientDecorator(),
	);

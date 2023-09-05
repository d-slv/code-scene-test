import {GetExamsProviders} from 'domain/usecases';
import {RemoteGetExamsProviders} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetExamsProviders = (): GetExamsProviders =>
	new RemoteGetExamsProviders(
		makeBFFApiUrl(bookingFlowEndPoints.examProviders),
		makeAuthorizeHttpClientDecorator(),
	);

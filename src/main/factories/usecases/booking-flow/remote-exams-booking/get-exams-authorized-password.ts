import {GetExamsAuthorizedPassword} from 'domain/usecases';
import {RemoteGetExamsAuthorizedPassword} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetExamsAuthorizedPassword = (): GetExamsAuthorizedPassword =>
	new RemoteGetExamsAuthorizedPassword(
		makeBFFApiUrl(bookingFlowEndPoints.examAuthorizedPassword),
		makeAuthorizeHttpClientDecorator(),
	);

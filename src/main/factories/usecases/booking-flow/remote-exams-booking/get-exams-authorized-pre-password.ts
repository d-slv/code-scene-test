import {GetExamsAuthorizedPrePassword} from 'domain/usecases';
import {RemoteGetExamsAuthorizedPrePassword} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetExamsAuthorizedPrePassword = (): GetExamsAuthorizedPrePassword =>
	new RemoteGetExamsAuthorizedPrePassword(
		makeBFFApiUrl(bookingFlowEndPoints.examAuthorizedPrePassword),
		makeAuthorizeHttpClientDecorator(),
	);

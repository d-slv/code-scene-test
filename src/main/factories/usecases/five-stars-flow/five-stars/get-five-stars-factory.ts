import {GetFiveStars} from 'domain/usecases';
import {RemoteGetFiveStars} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {fiveStarsFlowEndPoints} from '../../endpoints';

export const makeGetFiveStars = (): GetFiveStars =>
	new RemoteGetFiveStars(
		makeBFFApiUrl(fiveStarsFlowEndPoints.fiveStarsQuestions),
		makeAuthorizeHttpClientDecorator(),
	);

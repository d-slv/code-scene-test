import {PostFiveStars} from 'domain/usecases';
import {RemotePostFiveStars} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {fiveStarsFlowEndPoints} from '../../endpoints';

export const makePostFiveStars = (): PostFiveStars =>
	new RemotePostFiveStars(
		makeBFFApiUrl(fiveStarsFlowEndPoints.fiveStarsAnswers),
		makeAuthorizeHttpClientDecorator(),
	);

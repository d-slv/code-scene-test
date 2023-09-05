import {RefreshToken} from 'domain/usecases';
import {RemoteRefreshToken} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {entryFlowEndPoints} from '../../endpoints';

export const makeRemotePostRefreshToken = (): RefreshToken =>
	new RemoteRefreshToken(
		makeBFFApiUrl(entryFlowEndPoints.refreshToken),
		makeAuthorizeHttpClientDecorator(),
	);

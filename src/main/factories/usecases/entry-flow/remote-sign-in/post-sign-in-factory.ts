import {SignIn} from 'domain/usecases';
import {RemoteSignIn} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {entryFlowEndPoints} from '../../endpoints';

export const makeRemoteAuthentication = (): SignIn =>
	new RemoteSignIn(makeBFFApiUrl(entryFlowEndPoints.signin), makeAuthorizeHttpClientDecorator());

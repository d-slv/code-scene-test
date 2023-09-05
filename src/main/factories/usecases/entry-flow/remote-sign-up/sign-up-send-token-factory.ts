import {SignUpSendToken} from 'domain/usecases';
import {RemoteSignUpSendToken} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {entryFlowEndPoints} from '../../endpoints';

export const makeSignUpSendToken = (): SignUpSendToken =>
	new RemoteSignUpSendToken(
		makeBFFApiUrl(entryFlowEndPoints.signUpSendToken),
		makeAuthorizeHttpClientDecorator(),
	);

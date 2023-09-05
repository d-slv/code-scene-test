import {SignUpResendToken} from 'domain/usecases';
import {RemoteSignUpResendToken} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {entryFlowEndPoints} from '../../endpoints';

export const makeSignUpResendToken = (): SignUpResendToken =>
	new RemoteSignUpResendToken(
		makeBFFApiUrl(entryFlowEndPoints.signUpResendToken),
		makeAuthorizeHttpClientDecorator(),
	);

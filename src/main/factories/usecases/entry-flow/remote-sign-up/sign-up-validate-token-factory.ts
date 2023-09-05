import {SignUpValidateToken} from 'domain/usecases';
import {RemoteSignUpValidateToken} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {entryFlowEndPoints} from '../../endpoints';

export const makeSignUpValidateToken = (): SignUpValidateToken =>
	new RemoteSignUpValidateToken(
		makeBFFApiUrl(entryFlowEndPoints.signUpValidateToken),
		makeAuthorizeHttpClientDecorator(),
	);

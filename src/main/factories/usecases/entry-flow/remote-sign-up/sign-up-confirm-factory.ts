import {SignUpConfirm} from 'domain/usecases';
import {RemoteSignUpConfirm} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {entryFlowEndPoints} from '../../endpoints';

export const makeSignUpConfirm = (): SignUpConfirm =>
	new RemoteSignUpConfirm(
		makeBFFApiUrl(entryFlowEndPoints.signUpConfirm),
		makeAuthorizeHttpClientDecorator(),
	);

import {SignUpCheckExistence} from 'domain/usecases';
import {RemoteSignUpCheckExistence} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {entryFlowEndPoints} from '../../endpoints';

export const makeSignUpCheckExistence = (): SignUpCheckExistence =>
	new RemoteSignUpCheckExistence(
		makeBFFApiUrl(entryFlowEndPoints.signUpCheckExistence),
		makeAuthorizeHttpClientDecorator(),
	);

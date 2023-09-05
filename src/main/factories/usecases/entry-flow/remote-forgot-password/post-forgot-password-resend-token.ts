import {ForgotPasswordResendToken} from 'domain/usecases';
import {RemoteForgotPasswordResendToken} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {entryFlowEndPoints} from '../../endpoints';

export const makeForgotPasswordResendToken = (): ForgotPasswordResendToken =>
	new RemoteForgotPasswordResendToken(
		makeBFFApiUrl(entryFlowEndPoints.forgotResendToken),
		makeAuthorizeHttpClientDecorator(),
	);

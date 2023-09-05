import {ForgotPasswordConfirm} from 'domain/usecases';
import {RemoteForgotPasswordConfirm} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {entryFlowEndPoints} from '../../endpoints';

export const makeForgotPasswordConfirm = (): ForgotPasswordConfirm =>
	new RemoteForgotPasswordConfirm(
		makeBFFApiUrl(entryFlowEndPoints.forgotConfirm),
		makeAuthorizeHttpClientDecorator(),
	);

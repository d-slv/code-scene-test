import {ForgotPasswordRecoverUserInfo} from 'domain/usecases';
import {RemoteForgotPasswordRecoverUserInfo} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {entryFlowEndPoints} from '../../endpoints';

export const makeForgotPasswordRecoverUserInfo = (): ForgotPasswordRecoverUserInfo =>
	new RemoteForgotPasswordRecoverUserInfo(
		makeBFFApiUrl(entryFlowEndPoints.forgotRecoverUserInfo),
		makeAuthorizeHttpClientDecorator(),
	);

import React from 'react';
import {ForgotPasswordPage} from 'presentation/pages/entry-flow';
import {makeForgotPasswordRecoverUserInfo} from 'main/factories/usecases';

export const MakeForgotPasswordPage: React.FC = () => (
	<ForgotPasswordPage recoverUserInfo={makeForgotPasswordRecoverUserInfo()} />
);

import React from 'react';
import {ForgotPasswordConfirmPage} from 'presentation/pages/entry-flow';
import {makeForgotPasswordConfirm} from 'main/factories/usecases';

export const MakeForgotPasswordConfirmPage: React.FC = () => (
	<ForgotPasswordConfirmPage confirmForgotPassword={makeForgotPasswordConfirm()} />
);

import React from 'react';
import {ForgotPasswordTokenPage} from 'presentation/pages/entry-flow';
import {makeForgotPasswordResendToken, makeSignUpValidateToken} from 'main/factories/usecases';

export const MakeForgotPasswordTokenPage: React.FC = () => (
	<ForgotPasswordTokenPage
		resendToken={makeForgotPasswordResendToken()}
		// this validation is the same endpoint of sign up
		validateToken={makeSignUpValidateToken()}
	/>
);

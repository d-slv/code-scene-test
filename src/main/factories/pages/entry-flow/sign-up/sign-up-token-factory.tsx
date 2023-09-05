import React from 'react';
import {SignUpTokenPage} from 'presentation/pages/entry-flow';
import {makeSignUpResendToken, makeSignUpValidateToken} from 'main/factories/usecases';

export const MakeSignUpTokenPage: React.FC = () => (
	<SignUpTokenPage
		resendToken={makeSignUpResendToken()}
		validateToken={makeSignUpValidateToken()}
	/>
);

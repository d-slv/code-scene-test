import React from 'react';
import {SignUpPage} from 'presentation/pages/entry-flow';
import {makeSignUpCheckExistence, makeSignUpSendToken} from 'main/factories/usecases';

export const MakeSignUpPage: React.FC = () => (
	<SignUpPage
		checkExistence={makeSignUpCheckExistence()}
		validateSignUp={makeSignUpSendToken()}
	/>
);

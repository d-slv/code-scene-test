import React from 'react';
import {SignUpConfirmPage} from 'presentation/pages/entry-flow';
import {makeSignUpConfirm} from 'main/factories/usecases';

export const MakeSignUpConfirmPage: React.FC = () => (
	<SignUpConfirmPage confirm={makeSignUpConfirm()} />
);

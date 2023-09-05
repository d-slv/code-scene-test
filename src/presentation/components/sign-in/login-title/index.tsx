import React, {memo} from 'react';
import {translations} from '../../../translations';
import * as S from './styles';

const LoginTitle: React.FC = () => (
	<S.Title>
		{translations['pt-br'].loginPage.title} <br />{' '}
		{translations['pt-br'].loginPage.titleContinue}
	</S.Title>
);

export default memo(LoginTitle);

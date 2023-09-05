import React, {memo} from 'react';
import {translations} from '../../../translations';
import * as S from './styles';

const SignUpTitle: React.FC = () => <S.Title>{translations['pt-br'].signUpPage.title}</S.Title>;

export default memo(SignUpTitle);

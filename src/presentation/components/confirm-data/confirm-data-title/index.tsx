import React, {memo} from 'react';
import {translations} from 'presentation/translations';
import * as S from './styles';

const ConfirmDataTitle: React.FC = () => (
	<S.Title>{translations['pt-br'].confirmDataPage.title}</S.Title>
);

export default memo(ConfirmDataTitle);

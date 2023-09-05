import React, {memo} from 'react';
import {translations} from '../../../translations';
import * as S from './styles';

const ValidatedPasswordTitle: React.FC = () => (
	<S.ContainerInfo>
		<S.Title>{translations['pt-br'].validatedCodePage.title}</S.Title>

		<S.Subtitle>
			{translations['pt-br'].validatedCodePage.subtitle}
			<p>{translations['pt-br'].validatedCodePage.recommendation}</p>
		</S.Subtitle>
	</S.ContainerInfo>
);

export default memo(ValidatedPasswordTitle);

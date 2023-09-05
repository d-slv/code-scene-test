import React, {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {signUpStates} from 'presentation/pages/states/atoms';
import {translations} from 'presentation/translations';
import {formatMasks} from 'presentation/utils';
import * as S from './styles';

const ValidatedCodeTitle: React.FC = () => {
	const hideData = useRecoilValue(signUpStates);
	const [hideCellPhone, sethideCellPhone] = useState('');

	useEffect(() => {
		sethideCellPhone(formatMasks('clear', hideData.phone));
	});

	return (
		<S.ContainerInfo>
			<S.Title>{translations['pt-br'].validatedPasswordPage.title}</S.Title>

			<S.Subtitle>{translations['pt-br'].validatedPasswordPage.subtitle}</S.Subtitle>

			<S.ContactsList>
				<li>{formatMasks('hideEmail', hideData.email)}</li>
				<li>{formatMasks('hidePhone', hideCellPhone)}</li>
			</S.ContactsList>
		</S.ContainerInfo>
	);
};

export default memo(ValidatedCodeTitle);

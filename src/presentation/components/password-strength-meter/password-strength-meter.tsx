import React from 'react';
import {PasswordStrengthMeterType} from './password-strength-types';
import * as S from './style';

export function PasswordStrengthMeter({pass}: PasswordStrengthMeterType) {
	const password = pass;
	const validate = {
		hasLow: false,
		hasCap: false,
		hasNumber: false,
		has8digit: false,
	};

	const strength = Object.values(validate).reduce((a, item) => a + +item, 0);

	const feedback = {
		1: 'Senha muito fraca!',
		2: 'Atinge o mínimo aconselhado!',
		3: 'Sua senha é excelente',
	}[strength];

	const strengthMeter = (value: number) => {
		switch (value) {
			case 1:
				return (
					<S.ContainerSpanEasy>
						<span></span>
						<span></span>
						<span></span>
					</S.ContainerSpanEasy>
				);
			case 2:
				return (
					<S.ContainerSpanMedium>
						<span></span>
						<span></span>
						<span></span>
					</S.ContainerSpanMedium>
				);
			case 3:
				return (
					<S.ContainerSpanStrong>
						<span></span>
						<span></span>
						<span></span>
					</S.ContainerSpanStrong>
				);
			default:
				return (
					<S.ContainerSpanNone>
						<span></span>
						<span></span>
						<span></span>
					</S.ContainerSpanNone>
				);
		}
	};

	return (
		<>
			{strengthMeter(strength)}
			<div className={`feedback strength-${strength}`} hidden={password.length === 0}>
				{feedback}
			</div>
		</>
	);
}

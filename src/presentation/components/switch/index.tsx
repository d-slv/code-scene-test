import React from 'react';
import * as S from './styles';

interface SwitchProps {
	isOn?: boolean;
	name: string;
	disabled?: boolean;
	handleToggle?: () => void;
}

export const Switch: React.FC<SwitchProps> = ({isOn, name, disabled, handleToggle}) => (
	<>
		<S.CheckBoxWrapper>
			<S.CheckBox
				id={name}
				checked={isOn}
				type="checkbox"
				disabled={disabled}
				onChange={handleToggle}
			/>
			<S.CheckBoxLabel htmlFor={name} />
		</S.CheckBoxWrapper>
	</>
);

export default Switch;

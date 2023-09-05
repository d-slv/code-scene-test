import React, {useState} from 'react';
import {MdClose} from 'react-icons/md';
import {CheckButtonProps} from '.';
import {ContainerButton, InputIcon} from './check-button.styles';

export const CheckButton: React.FC<CheckButtonProps> = ({onChange, children}) => {
	const [isChecked, setIsChecked] = useState(false);

	function HandleChange(value: boolean) {
		setIsChecked(value);
		onChange(value);
	}

	return (
		<ContainerButton onClick={() => HandleChange(!isChecked)} isChecked={isChecked}>
			<span>{children}</span>
			{isChecked && (
				<InputIcon isChecked={isChecked}>
					<MdClose />
				</InputIcon>
			)}
		</ContainerButton>
	);
};

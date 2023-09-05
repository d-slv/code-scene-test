import React, {useState} from 'react';
import {MdArrowBackIosNew} from 'react-icons/md';
import * as S from './select-field.styles';
import {SelectDropDownFieldProps, SelectFieldProps} from './select-field.types';

export const SelectDropdown = (props: SelectDropDownFieldProps) => {
	const {onChange, options, initialValue} = props;
	const [isOpen, setIsOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState(initialValue);

	function handleChange(newValue: string | number) {
		if (newValue !== selectedValue) {
			setSelectedValue(newValue);
			setIsOpen(false);
			onChange(String(newValue));
		}
	}

	return (
		<S.Container fullWidth={false}>
			<S.InputContainer onClick={() => setIsOpen(!isOpen)}>
				<S.InputValue>{selectedValue}</S.InputValue>
				<S.InputIcon isOpen={isOpen}>
					<MdArrowBackIosNew />
				</S.InputIcon>
			</S.InputContainer>
			<S.SelectOptions isOpen={isOpen}>
				{options.map((option, index) => (
					<S.OptionItem key={index} onClick={() => handleChange(option)}>
						{option}
					</S.OptionItem>
				))}
			</S.SelectOptions>
		</S.Container>
	);
};

export function SelectField({
	children,
	onChange,
	placeholder,
	disabled,
	value,
	size = 'lg',
	fullWidth,
}: SelectFieldProps) {
	function handleChange(v: string) {
		onChange(v);
	}

	return (
		<S.Container fullWidth={fullWidth}>
			<S.SelectContainer
				fullWidth={fullWidth}
				disabled={disabled}
				placeholder={placeholder}
				value={value}
				onChange={event => handleChange(event.target.value)}
				sizeI={size}>
				<option value="" style={{display: 'none'}}>
					{placeholder}
				</option>
				{children}
			</S.SelectContainer>
			<S.InputSelectIcon>
				<MdArrowBackIosNew />
			</S.InputSelectIcon>
		</S.Container>
	);
}

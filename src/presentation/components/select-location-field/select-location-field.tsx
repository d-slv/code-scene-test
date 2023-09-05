import React, {ReactElement, useEffect, useState} from 'react';
import {MdArrowBackIosNew} from 'react-icons/md';
import {
	Container,
	InputContainer,
	InputIcon,
	SelectOptions,
	InputValue,
	OptionItem,
} from './select-location-field.styles';
import {SelectLocationFieldProps, OptionProps, SelectValueProps} from '.';

export const Option: React.FC<OptionProps> = ({children}) => <OptionItem>{children}</OptionItem>;

export const SelectLocationField: React.FC<SelectLocationFieldProps> = ({children, onChange}) => {
	const [isOpen, setIsOpen] = useState(false);
	const elem: {props: {value: string; children: string}}[] = (children as ReactElement).props.children;

	const [result, setResult] = useState<SelectValueProps>({value: '', label: ''});

	useEffect(() => {
		if (elem.length > 0) {
			setResult({value: elem[0].props.value, label: elem[0].props.children});
		}
	}, []);

	function handleChange(v: SelectValueProps) {
		if (v.value !== result.value) {
			setResult({value: v.value, label: v.label});
			if (onChange) {
				onChange(v.value);
			}
		}
		setIsOpen(false);
	}

	return (
		<Container>
			<InputContainer onClick={() => setIsOpen(!isOpen)}>
				<InputValue>{result.label}</InputValue>
				<InputIcon isOpen={isOpen}>
					<MdArrowBackIosNew />
				</InputIcon>
			</InputContainer>
			<SelectOptions isOpen={isOpen}>
				{isOpen && (
					<>
						{elem.map((i, key) => (
							<OptionItem
								key={key}
								onClick={() =>
									handleChange({value: i.props.value, label: i.props.children})
								}>
								{i.props.children}
							</OptionItem>
						))}
					</>
				)}
			</SelectOptions>
		</Container>
	);
};

import React, {Dispatch, SetStateAction, useState} from 'react';

import theme from '../../styles/theme.styles';
import {
	ButtonContainerList,
	ButtonContainerFlex,
	ButtonContainer,
} from './radio-check-button.styles';

type RadioCheckButtonValues = number | string | object;

interface RadioCheckButtonContainerProps {
	columns?: number;
	display?: 'flex' | 'grid';
	unselectedColor?: string;
	setState?: Dispatch<SetStateAction<boolean>>;
	onChange: (value: RadioCheckButtonValues) => void;
	list: {key: string; value: RadioCheckButtonValues}[];
}

export const RadioCheckButtonContainer: React.FC<RadioCheckButtonContainerProps> = ({
	list,
	onChange,
	setState,
	columns = 2,
	display = 'grid',
	unselectedColor = theme.colors.primary,
}) => {
	const [value, setValue] = useState<RadioCheckButtonValues>();

	function handleClick(valueProp: typeof value) {
		if (value !== valueProp) {
			setValue(JSON.stringify(valueProp));
			onChange(valueProp);
		}
	}

	function variantCondition(
		firstValue: RadioCheckButtonValues,
		secondValue: RadioCheckButtonValues,
	) {
		if (firstValue === secondValue) {
			return 'contained';
		}
		return 'outlined';
	}

	function checkState(param) {
		if (setState === undefined) {
			handleClick(param);
		} else {
			handleClick(param);
			setState(true);
		}
	}

	return (
		<ButtonContainerList display={display} columns={columns}>
			{list.map(item =>
				display === 'flex' ? (
					<ButtonContainerFlex
						key={item.key}
						onClick={() => {
							checkState(item.value);
						}}
						unselectedColor={unselectedColor}
						isChecked={value === JSON.stringify(item.value)}
						variant={variantCondition(value, JSON.stringify(item.value))}>
						{item.key}
					</ButtonContainerFlex>
				) : (
					<ButtonContainer
						key={item.key}
						onClick={() => {
							checkState(item.value);
						}}
						unselectedColor={unselectedColor}
						isChecked={value === JSON.stringify(item.value)}
						variant={variantCondition(value, JSON.stringify(item.value))}>
						{item.key}
					</ButtonContainer>
				),
			)}
		</ButtonContainerList>
	);
};

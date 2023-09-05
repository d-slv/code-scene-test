import React, {ReactNode, useState} from 'react';

import theme from 'presentation/styles/theme.styles';
import {CardCheckBoxProps} from '.';
import {
	ArrowRightIcon,
	CardContainer,
	CardContainerList,
	Content,
	IconContainer,
	PhoneRightIcon,
} from './styles';

type CardCheckBoxValues = number | string | object;

export const CardCheckBox: React.FC<CardCheckBoxProps> = ({children}) => (
	<CardContainer variant="outlined" isChecked={false}>
		<Content>{children}</Content>
		<IconContainer>
			<ArrowRightIcon />
		</IconContainer>
	</CardContainer>
);

interface CardCheckBoxContainerProps {
	onChange?: (value: CardCheckBoxValues) => void;
	columns?: number;
	locationType?: 'default' | 'other';
	selectVariant?: 'filled' | 'outlined';
	hiddenIcon?: boolean;
	color?: string;
	list?: {component: ReactNode; value: string | number | object}[];
}

export const CardCheckBoxContainer: React.FC<CardCheckBoxContainerProps> = ({
	list,
	onChange,
	hiddenIcon,
	columns = 1,
	locationType = 'default',
	selectVariant = 'outlined',
	color = theme.colors.primary,
}) => {
	const [value, setValue] = useState<CardCheckBoxValues>('');

	function handleClick(valueProp: typeof value) {
		setValue(valueProp);
		onChange(valueProp);
	}

	return (
		<CardContainerList columns={columns}>
			{list.map((item, key) => (
				<CardContainer
					color={color}
					variant={selectVariant}
					isChecked={value === item.value}
					onClick={() => handleClick(item.value)}
					key={key}>
					<Content>{item.component}</Content>
					{!hiddenIcon && (
						<>
							{locationType === 'other' ? (
								<IconContainer>
									<PhoneRightIcon />
								</IconContainer>
							) : (
								<IconContainer>
									<ArrowRightIcon />
								</IconContainer>
							)}
						</>
					)}
				</CardContainer>
			))}
		</CardContainerList>
	);
};

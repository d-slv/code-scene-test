import React, {InputHTMLAttributes} from 'react';

import {CardContainer} from './card.styles';

interface CardProps extends InputHTMLAttributes<HTMLInputElement> {
	variant?: 'default' | 'top-accent';
	topAccentcolor?: 'primary' | 'orange' | 'darkOrange' | 'red';
	backgroundColor?: 'primary' | 'orange' | 'darkOrange' | 'red' | 'white';
}

export const Card: React.FC<CardProps> = ({
	children,
	topAccentcolor = 'primary',
	variant = 'default',
	backgroundColor = 'white',
	...rest
}) => (
	<CardContainer
		backgroundColor={backgroundColor}
		topAccentcolor={topAccentcolor}
		variant={variant}
		{...rest}>
		{children}
	</CardContainer>
);

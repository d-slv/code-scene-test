import styled from 'styled-components';
import theme from 'presentation/styles/theme.styles';

interface CardContainerProps {
	variant?: 'default' | 'top-accent';
	topAccentcolor?: 'primary' | 'orange' | 'darkOrange' | 'red';
	backgroundColor?: 'primary' | 'orange' | 'darkOrange' | 'red' | 'white';
}

const config = {
	primary: {
		color: theme.colors['primaryBlue.500'],
	},
	orange: {
		color: theme.colors['orange.500'],
	},
	darkOrange: {
		color: theme.colors['orange.1000'],
	},
	red: {
		color: theme.colors['red.500'],
	},
	white: {
		color: theme.colors.white,
	},
};

export const CardContainer = styled.div<CardContainerProps>`
	background-color: ${({backgroundColor}) => config[backgroundColor].color || theme.colors.white};
	border-radius: 8px;
	box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.15);
	padding: 20px 14px;
	border-top: ${({variant}) => (variant === 'default' ? 'none' : '12px')} solid
		${({topAccentcolor}) => config[topAccentcolor].color};
`;

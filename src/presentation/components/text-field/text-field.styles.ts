import styled from 'styled-components';
import {TextFieldProps} from './text-field.types';

export const Container = styled.div`
	margin-bottom: 1rem;
	display: flex;
	flex-direction: column;
	flex: 1;
	position: relative;
`;

export const InputField = styled.input<Partial<TextFieldProps>>`
	border: ${props => props.theme.border.width[props.borderWidth].value} solid
		${props => (props.isInvalid ? props.theme.colors['red.500'] : props.theme.colors['gray.3'])};
	background: ${props => props.theme.colors['gray.1']};
	width: 100%;
	border-radius: ${props => props.theme.border.radius[props.borderRadius].value};
	padding-top: ${props => props.theme.spacing.inset.size[props.spacingInsetY].value};
	padding-bottom: ${props => props.theme.spacing.inset.size[props.spacingInsetY].value};
	padding-left: ${props => props.theme.spacing.inset.size[props.spacingInsetX].value};
	padding-right: ${props =>
		props.spacingInsetRight
			? props.theme.spacing.inset.size[props.spacingInsetRight].value
			: props.theme.spacing.inset.size[props.spacingInsetX].value};
	color: ${props => (props.isInvalid ? props.theme.colors['red.500'] : props.theme.colors.dark)};
	font-weight: ${props => props.theme.font.weight[props.fontWeight].value};
	::placeholder {
		color: ${props => props.theme.colors['gray.3']};
	}
	:valid {
		border: 1px solid
			${props => (props.isInvalid ? props.theme.colors['red.500'] : props.theme.colors.dark)};
		color: ${props =>
			props.isInvalid ? props.theme.colors['red.500'] : props.theme.colors.dark};
	}
	transition: 0.4s;
`;
export const InputTokenField = styled.input<Partial<TextFieldProps>>`
	border: 1px solid
		${props => (props.isInvalid ? props.theme.colors['red.500'] : props.theme.colors['gray.3'])};
	background: ${props => props.theme.colors['gray.1']};
	height: 3.3rem;
	text-align: center;
	font-weight: 700;
	font-size: 1.25rem;
	line-height: 23px;
	width: 100%;
	border-radius: 8px;
	padding: 0 1.25rem;
	color: ${props => (props.isInvalid ? props.theme.colors['red.500'] : props.theme.colors.dark)};
	::placeholder {
		color: ${props => props.theme.colors['gray.3']};
	}
	:valid {
		border: 1px solid
			${props => (props.isInvalid ? props.theme.colors['red.500'] : props.theme.colors.dark)};
		color: ${props =>
			props.isInvalid ? props.theme.colors['red.500'] : props.theme.colors.dark};
	}
	transition: 0.4s;
`;

export const Label = styled.label`
	color: ${props => props.theme.colors.dark};
	font-weight: 900;
	font-size: 1.12rem;
	margin-bottom: 0.5rem;
`;

export const InvalidMenssage = styled.div`
	color: ${props => props.theme.colors['red.500']};
	margin-top: 0.875rem;
	display: flex;
	align-items: center;

	&.actived {
		justify-content: center;
	}

	p {
		margin-left: 0.25rem;
	}
`;

export const InputContainer = styled.div`
	position: relative;
	display: flex;
	align-items: center;
`;
export const InputIcon = styled.button<Partial<TextFieldProps>>`
	position: absolute;
	right: 1rem;
	height: 2rem;
	width: 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
	background: transparent;
	transition: 0.4s;
	color: ${props => (props.isInvalid ? props.theme.colors['red.500'] : props.theme.colors.dark)};
`;

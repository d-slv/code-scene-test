import styled from 'styled-components';
import theme from '../../styles/theme.styles';
import {ButtonProps} from '.';

const VariantColorConfig = (color: string, border: string) => ({
	contained: {
		color: theme.colors.white,
		bg: theme.colors[color],
		border: 'none',
		disabled: theme.colors.black,
	},
	outlined: {
		color: theme.colors[color],
		bg: 'transparent',
		border: `${theme.border.width[border].value} solid ${theme.colors[color]}`,
		disabled: 'transparent',
	},
});

export const LeftIcon = styled.span`
	margin-right: 0.6rem;
	line-height: 1.156rem;
	font-size: 1.2rem;
	display: flex;
	align-items: center;
`;

export const RightIcon = styled.span`
	margin-left: 0.6rem;
	line-height: 1.156rem;
	font-size: 1.2rem;
	display: flex;
	align-items: center;
`;

export const LoadingIconContainer = styled.span`
	margin-left: 0.6rem;
`;

export const ButtonContainer = styled.button<ButtonProps>`
	width: ${props => (props.fullWidth ? '100%' : 'fit-content')};
	padding-top: ${props => theme.spacing.inset.size[props.spacingInsetY].value};
	padding-bottom: ${props => theme.spacing.inset.size[props.spacingInsetY].value};
	padding-left: ${props => theme.spacing.inset.size[props.spacingInsetX].value};
	padding-right: ${props => theme.spacing.inset.size[props.spacingInsetX].value};
	font-size: ${props => theme.font.size[props.fontSize].value};
	font-weight: ${props => theme.font.weight[props.fontWeight].value};
	color: ${props => VariantColorConfig(props.color, props.borderWidth)[props.variant].color};
	border: ${props => VariantColorConfig(props.color, props.borderWidth)[props.variant].border};
	border-radius: ${props => theme.border.radius[props.borderRadius].value};
	background: ${props => VariantColorConfig(props.color, props.borderWidth)[props.variant].bg};
	display: flex;
	align-items: center;
	justify-content: center;
	transition: ${props => (props.transition ? '0.3s' : 'none')};

	:hover {
		filter: brightness(1.1);
	}
	:disabled {
		background: ${props =>
			VariantColorConfig(props.color, props.borderWidth)[props.variant].disabled};
		opacity: 0.54;
		cursor: ${props => (props.isLoading ? 'wait' : 'not-allowed')};
	}

	${props =>
		props.xs &&
		`
			@media (max-width:${theme.breakPoints.size.xs.value}) {
				width: ${props.xs.fullWidth ? '100%' : 'fit-content'};
				padding-top: ${theme.spacing.inset.size[props.xs.spacingInsetY || props.spacingInsetY].value};
				padding-bottom: ${theme.spacing.inset.size[props.xs.spacingInsetY || props.spacingInsetY].value};
				padding-left: ${theme.spacing.inset.size[props.xs.spacingInsetX || props.spacingInsetX].value};
				padding-right: ${theme.spacing.inset.size[props.xs.spacingInsetX || props.spacingInsetX].value};
				font-size: ${theme.font.size[props.xs.fontSize || props.fontSize].value};
				font-weight: ${theme.font.weight[props.xs.fontWeight || props.fontWeight].value};
				line-height: 100%;
				color: ${
					VariantColorConfig(
						props.xs.color || props.color,
						props.xs.borderWidth || props.borderWidth,
					)[props.xs.variant || props.variant].color
				};
				border: ${
					VariantColorConfig(
						props.xs.color || props.color,
						props.xs.borderWidth || props.borderWidth,
					)[props.xs.variant || props.variant].border
				};
				border-radius: ${theme.border.radius[props.xs.borderRadius || props.borderRadius].value};
				background: ${
					VariantColorConfig(
						props.xs.color || props.color,
						props.xs.borderWidth || props.borderWidth,
					)[props.xs.variant || props.variant].bg
				};

			}
		`}
	${props =>
		props.sm &&
		`
			@media (max-width:${theme.breakPoints.size.sm.value}) {
				width: ${props.sm.fullWidth ? '100%' : 'fit-content'};
				padding-top: ${theme.spacing.inset.size[props.sm.spacingInsetY || props.spacingInsetY].value};
				padding-bottom: ${theme.spacing.inset.size[props.sm.spacingInsetY || props.spacingInsetY].value};
				padding-left: ${theme.spacing.inset.size[props.sm.spacingInsetX || props.spacingInsetX].value};
				padding-right: ${theme.spacing.inset.size[props.sm.spacingInsetX || props.spacingInsetX].value};
				font-size: ${theme.font.size[props.sm.fontSize || props.fontSize].value};
				font-weight: ${theme.font.weight[props.sm.fontWeight || props.fontWeight].value};
				line-height: 100%;
				color: ${
					VariantColorConfig(
						props.sm.color || props.color,
						props.sm.borderWidth || props.borderWidth,
					)[props.sm.variant || props.variant].color
				};
				border: ${
					VariantColorConfig(
						props.sm.color || props.color,
						props.sm.borderWidth || props.borderWidth,
					)[props.sm.variant || props.variant].border
				};
				border-radius: ${theme.border.radius[props.sm.borderRadius || props.borderRadius].value};
				background: ${
					VariantColorConfig(
						props.sm.color || props.color,
						props.sm.borderWidth || props.borderWidth,
					)[props.sm.variant || props.variant].bg
				};

			}
		`}
	${props =>
		props.md &&
		`
			@media (max-width:${theme.breakPoints.size.md.value}) {
				width: ${props.md.fullWidth ? '100%' : 'fit-content'};
				padding-top: ${theme.spacing.inset.size[props.md.spacingInsetY || props.spacingInsetY].value};
				padding-bottom: ${theme.spacing.inset.size[props.md.spacingInsetY || props.spacingInsetY].value};
				padding-left: ${theme.spacing.inset.size[props.md.spacingInsetX || props.spacingInsetX].value};
				padding-right: ${theme.spacing.inset.size[props.md.spacingInsetX || props.spacingInsetX].value};
				font-size: ${theme.font.size[props.md.fontSize || props.fontSize].value};
				font-weight: ${theme.font.weight[props.md.fontWeight || props.fontWeight].value};
				line-height: 100%;
				color: ${
					VariantColorConfig(
						props.md.color || props.color,
						props.md.borderWidth || props.borderWidth,
					)[props.md.variant || props.variant].color
				};
				border: ${
					VariantColorConfig(
						props.md.color || props.color,
						props.md.borderWidth || props.borderWidth,
					)[props.md.variant || props.variant].border
				};
				border-radius: ${theme.border.radius[props.md.borderRadius || props.borderRadius].value};
				background: ${
					VariantColorConfig(
						props.md.color || props.color,
						props.md.borderWidth || props.borderWidth,
					)[props.md.variant || props.variant].bg
				};

			}
		`}
	${props =>
		props.lg &&
		`
			@media (max-width:${theme.breakPoints.size.lg.value}) {
				width: ${props.lg.fullWidth ? '100%' : 'fit-content'};
				padding-top: ${theme.spacing.inset.size[props.lg.spacingInsetY || props.spacingInsetY].value};
				padding-bottom: ${theme.spacing.inset.size[props.lg.spacingInsetY || props.spacingInsetY].value};
				padding-left: ${theme.spacing.inset.size[props.lg.spacingInsetX || props.spacingInsetX].value};
				padding-right: ${theme.spacing.inset.size[props.lg.spacingInsetX || props.spacingInsetX].value};
				font-size: ${theme.font.size[props.lg.fontSize || props.fontSize].value};
				font-weight: ${theme.font.weight[props.lg.fontWeight || props.fontWeight].value};
				line-height: 100%;
				color: ${
					VariantColorConfig(
						props.lg.color || props.color,
						props.lg.borderWidth || props.borderWidth,
					)[props.lg.variant || props.variant].color
				};
				border: ${
					VariantColorConfig(
						props.lg.color || props.color,
						props.lg.borderWidth || props.borderWidth,
					)[props.lg.variant || props.variant].border
				};
				border-radius: ${theme.border.radius[props.lg.borderRadius || props.borderRadius].value};
				background: ${
					VariantColorConfig(
						props.lg.color || props.color,
						props.lg.borderWidth || props.borderWidth,
					)[props.lg.variant || props.variant].bg
				};

			}
		`}
	${props =>
		props.xl &&
		`
			@media (max-width:${theme.breakPoints.size.xl.value}) {
				width: ${props.xl.fullWidth ? '100%' : 'fit-content'};
				padding-top: ${theme.spacing.inset.size[props.xl.spacingInsetY || props.spacingInsetY].value};
				padding-bottom: ${theme.spacing.inset.size[props.xl.spacingInsetY || props.spacingInsetY].value};
				padding-left: ${theme.spacing.inset.size[props.xl.spacingInsetX || props.spacingInsetX].value};
				padding-right: ${theme.spacing.inset.size[props.xl.spacingInsetX || props.spacingInsetX].value};
				font-size: ${theme.font.size[props.xl.fontSize || props.fontSize].value};
				font-weight: ${theme.font.weight[props.xl.fontWeight || props.fontWeight].value};
				line-height: 100%;
				color: ${
					VariantColorConfig(
						props.xl.color || props.color,
						props.xl.borderWidth || props.borderWidth,
					)[props.xl.variant || props.variant].color
				};
				border: ${
					VariantColorConfig(
						props.xl.color || props.color,
						props.xl.borderWidth || props.borderWidth,
					)[props.xl.variant || props.variant].border
				};
				border-radius: ${theme.border.radius[props.xl.borderRadius || props.borderRadius].value};
				background: ${
					VariantColorConfig(
						props.xl.color || props.color,
						props.xl.borderWidth || props.borderWidth,
					)[props.xl.variant || props.variant].bg
				};

			}
		`}
	${props =>
		props.xxl &&
		`
			@media (min-width:${theme.breakPoints.size.xxl.value}) {
				width: ${props.xxl.fullWidth ? '100%' : 'fit-content'};
				padding-top: ${theme.spacing.inset.size[props.xxl.spacingInsetY || props.spacingInsetY].value};
				padding-bottom: ${theme.spacing.inset.size[props.xxl.spacingInsetY || props.spacingInsetY].value};
				padding-left: ${theme.spacing.inset.size[props.xxl.spacingInsetX || props.spacingInsetX].value};
				padding-right: ${theme.spacing.inset.size[props.xxl.spacingInsetX || props.spacingInsetX].value};
				font-size: ${theme.font.size[props.xxl.fontSize || props.fontSize].value};
				font-weight: ${theme.font.weight[props.xxl.fontWeight || props.fontWeight].value};
				line-height: 100%;
				color: ${
					VariantColorConfig(
						props.xxl.color || props.color,
						props.xxl.borderWidth || props.borderWidth,
					)[props.xxl.variant || props.variant].color
				};
				border: ${
					VariantColorConfig(
						props.xxl.color || props.color,
						props.xxl.borderWidth || props.borderWidth,
					)[props.xxl.variant || props.variant].border
				};
				border-radius: ${theme.border.radius[props.xxl.borderRadius || props.borderRadius].value};
				background: ${
					VariantColorConfig(
						props.xxl.color || props.color,
						props.xxl.borderWidth || props.borderWidth,
					)[props.xxl.variant || props.variant].bg
				};

			}
		`}
`;

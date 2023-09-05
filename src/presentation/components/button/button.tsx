import React from 'react';
import {ButtonContainer, LeftIcon, RightIcon, LoadingIconContainer} from './button.styles';
import {ButtonProps} from '.';
import {LoadingIcon} from '../icons/loading-icon';

export function Button({
	children,
	fontSize = 'xs',
	fontWeight = 'medium',
	borderRadius = 'pill',
	borderWidth = 'hairline',
	spacingInset = 'nano',
	spacingInsetY = 'nano',
	spacingInsetX = 'sm',
	variant = 'contained',
	color = 'primary',
	transition = true,
	fullWidth,
	leftIcon,
	rightIcon,
	isLoading,
	disabled,
	xs,
	...rest
}: ButtonProps) {
	return (
		<ButtonContainer
			isLoading={isLoading}
			fullWidth={fullWidth}
			fontSize={fontSize}
			fontWeight={fontWeight}
			borderRadius={borderRadius}
			borderWidth={borderWidth}
			spacingInset={spacingInset}
			spacingInsetX={spacingInsetX}
			spacingInsetY={spacingInsetY}
			xs={xs}
			transition={transition}
			{...rest}
			disabled={isLoading || disabled}
			variant={variant}
			color={color}>
			{leftIcon && <LeftIcon>{leftIcon}</LeftIcon>}
			{children}
			{rightIcon && <RightIcon>{rightIcon}</RightIcon>}
			{isLoading && (
				<LoadingIconContainer>
					<LoadingIcon width="15px" height="15px" />
				</LoadingIconContainer>
			)}
		</ButtonContainer>
	);
}

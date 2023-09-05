import React, {ReactNode} from 'react';
import {BarContainer, CloseButton, BarContent, LeftIcon, BarText} from './warning-bar.styles';

type WarningBarProps = {
	content: string | ReactNode;
	showCloseButton?: boolean;
	closeCallback?: () => void;
	bgColor?: string;
	textColor?: string;
	leftIcon?: ReactNode;
};

export const WarningBar = (props: WarningBarProps) => {
	const {
		content,
		closeCallback,
		leftIcon,
		showCloseButton = false,
		bgColor = 'rgba(18, 171, 215, 1)',
		textColor = '#fff',
	} = props;

	return (
		<BarContainer textColor={textColor} bgColor={bgColor}>
			{showCloseButton && (
				<CloseButton onClick={closeCallback} textColor={textColor}>
					&times;
				</CloseButton>
			)}
			<BarContent>
				<LeftIcon>{leftIcon}</LeftIcon>
				<BarText>{content}</BarText>
			</BarContent>
		</BarContainer>
	);
};

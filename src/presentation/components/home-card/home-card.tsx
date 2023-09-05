import React, {ReactNode} from 'react';
import {
	CardContainer,
	ContentCard,
	FooterCard,
	LeftContent,
	RightContent,
	TitleCard,
} from './home-card.styles';

export type HomeCardProps = {
	title: string | ReactNode;
	content: string | ReactNode;
	rightIcon: ReactNode;
	cutIcon?: boolean;
	iconRightSpace?: boolean;
	footer?: ReactNode;
	textColor?: string;
};

export const HomeCard = (props: HomeCardProps) => {
	const {title, content, rightIcon, footer, textColor, cutIcon = true} = props;

	return (
		<CardContainer>
			<LeftContent>
				<TitleCard>{title}</TitleCard>
				<ContentCard textColor={textColor}>{content}</ContentCard>
				<FooterCard>{footer}</FooterCard>
			</LeftContent>
			<RightContent cutIcon={cutIcon}>{rightIcon}</RightContent>
		</CardContainer>
	);
};

import React, {ReactNode, useEffect, useState} from 'react';
import {
	CardStepPageDescription,
	CardStepPageTile,
	Container,
	StepButton,
	StepCardContent,
	StepsContainer,
} from './schedule-timeline.styles';

interface PagesProps {
	label: string;
	title?: string;
	user?: string;
	description?: ReactNode;
}

export const ScheduleTimelinePage: React.FC<PagesProps> = ({children, title, description}) => (
	<>
		{title && <CardStepPageTile>{title}</CardStepPageTile>}{' '}
		{description && <CardStepPageDescription>{description}</CardStepPageDescription>}
		{children}
	</>
);

interface ScheduleTimelineProps {
	children: React.ReactNode[];
	currentPage?: number;
	onHeaderClick?: (index: number) => void;
}

export const ScheduleTimeline: React.FC<ScheduleTimelineProps> = ({
	children,
	currentPage,
	onHeaderClick,
}: ScheduleTimelineProps) => {
	const [pages, setPages] = useState([]);

	function handleHeaderClick(i: number) {
		onHeaderClick(i);
	}

	useEffect(() => {
		setPages(React.Children.toArray(children));
	}, []);

	return (
		<Container>
			<StepsContainer>
				{pages.map((page, key) => (
					<StepButton
						disabled={currentPage < key}
						current={currentPage === key}
						onClick={() => handleHeaderClick(key)}
						key={key}>
						{page.props.label}
					</StepButton>
				))}
			</StepsContainer>
			<StepCardContent>{pages[currentPage]}</StepCardContent>
		</Container>
	);
};

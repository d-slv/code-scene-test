import styled from 'styled-components';

import {Card} from '../card';

export const Container = styled(Card)`
	padding: 0;
`;

export const StepsContainer = styled.div`
	padding: 0;
	display: flex;
	overflow: hidden;
	border-radius: 8px 8px 0px 0px;
	@media (max-width: 820px) {
		display: none;
	}
`;

export const StepCardContent = styled.div`
	padding: 36px 40px;
`;

interface StepButtonProps {
	current: boolean;
}

export const StepButton = styled.button<StepButtonProps>`
	display: flex;
	flex: 1;
	padding: 16px;
	border: none;

	& + button {
		margin-left: 3px;
	}

	text-align: center;
	justify-content: center;
	background: ${props => props.theme.colors['primaryBlue.500']};
	color: ${props => props.theme.colors.white};
	font-size: 0.875rem;
	font-weight: 400;

	:disabled {
		background: ${props => (props.current ? '#D86704' : '#ebebeb')};
		color: ${props => (props.current ? props.theme.colors.white : '#b7b7bc')};
		cursor: not-allowed;
	}
`;

export const CardStepPageTile = styled.h3`
	font-weight: 700;
	font-size: 1.5rem;
	line-height: 1.875rem;
	margin-bottom: 0.5rem;

	@media (max-width: 820px) {
		text-align: center;
	}
`;

export const CardStepPageDescription = styled.p`
	font-weight: 400;
	font-size: 0.875rem;
	line-height: 1.1rem;
	margin-bottom: 1.875rem;
	color: ${props => props.theme.colors['gray.4']};

	@media (max-width: 820px) {
		text-align: center;
	}
`;

import styled from 'styled-components';
import {Card} from 'presentation/components/card';

interface ContentCardsProps {
	isEmpty?: boolean;
}

export const Container = styled.div`
	width: 100%;
	height: 100%;
	max-width: 1400px;
`;

export const EmptyCardGuide = styled(Card)`
	width: 340px;
	display: flex;
	flex-direction: column;

	svg {
		width: 1.875rem;
		height: 1.875rem;
		align-self: center;
		margin-bottom: 0.625rem;

		path {
			stroke: ${props => props.theme.colors['red.400']};
		}
	}
`;

export const ContentCards = styled.div<ContentCardsProps>`
	grid-template-columns: repeat(4, 1fr);
	margin-top: 32px;
	display: grid;
	gap: 32px 24px;

	@media (max-width: 870px) {
		justify-content: ${({isEmpty}) => (isEmpty ? 'start' : 'center')};
	}

	@media (max-width: 1723px) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media (max-width: 1275px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 768px) {
		grid-template-columns: repeat(1, 1fr);
	}
`;

import styled from 'styled-components';
import theme from 'presentation/styles/theme.styles';

export const ContainerCardsService = styled.div`
	display: flex;
	padding: 0;
	cursor: pointer;
`;

export const CardCategoryHelpCenter = styled.div`
	min-width: 100%;
	max-width: 15.5rem;
	font-size: 0.875rem;
	font-weight: 600;
	line-height: 1rem;
	border-radius: 4px;
	padding: 1.375rem 1.5rem;
	background: ${theme.colors.white};
	text-align: center;

	display: flex;
	flex-direction: column;
	justify-content: center;

	img {
		align-self: center;
		margin-bottom: 0.625rem;
	}

	:hover {
		background: ${theme.colors['orange.500']};

		p {
			color: ${theme.colors.white};
		}

		h2 {
			color: ${theme.colors.white};
		}

		img {
			filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%)
				hue-rotate(199deg) brightness(104%) contrast(104%);
		}
	}

	@media (max-width: 820px) {
		flex-direction: row;
		align-content: center;
		text-align: start;
		justify-content: flex-start;
		margin: 0 auto 9px auto;

		:nth-last-of-type() {
			margin-bottom: 0;
		}
	}
`;

export const InfoCard = styled.div`
	@media (max-width: 820px) {
		padding-left: 1.125rem;
	}
`;

export const TitleCard = styled.h2`
	font-weight: 700;
	font-size: 16px;
	line-height: 1.25rem;
`;

export const ContentCard = styled.p`
	font-size: 14px;
	padding-top: 0.5rem;
	line-height: 1.125rem;
	font-weight: 300;
	color: ${theme.colors['gray.4']};
`;

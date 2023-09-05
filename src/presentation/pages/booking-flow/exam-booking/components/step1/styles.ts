import styled from 'styled-components';

import theme from 'presentation/styles/theme.styles';

export const Container = styled.div`
	display: flex;
	flex-wrap: wrap;

	@media (max-width: 700px) {
		align-items: center;
		flex-direction: column;
	}
`;

export const ContainerSelect = styled.div`
	display: flex;
	flex-direction: column;
	@media (max-width: 640px) {
		flex-direction: column;
		justify-content: center;
	}
`;

export const HeaderContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	@media (max-width: 1024px) {
		justify-content: center;
	}
`;

export const Title = styled.div`
	display: flex;

	@media (max-width: 1024px) {
		flex-direction: column;
	}
`;

export const CardStepPageTitle = styled.h3`
	font-weight: 700;
	font-size: 1.5rem;
	line-height: 1.875rem;
	margin-bottom: 0.5rem;
	display: flex;

	@media (max-width: 820px) {
		margin-bottom: 0;
	}
`;

export const CardStepPageSubtitle = styled.h3`
	font-size: 1.5rem;
	font-weight: 400;
	padding-left: 5px;

	@media (max-width: 820px) {
		font-size: 1.375rem;
		padding-left: 0;
	}
`;

export const CardStepPageDescription = styled.p`
	font-weight: 700;
	font-size: 1.5rem;
	padding-top: 1rem;
	line-height: 1.875rem;
	margin-bottom: 0.5rem;
	display: flex;

	@media (max-width: 820px) {
		margin-bottom: 0;
	}
`;

export const CardStepPageSubDescription = styled.p`
	font-weight: 400;
	font-size: 0.875rem;
	line-height: 1.1rem;

	color: ${theme.colors['gray.4']};
`;

export const ContentContainer = styled.div`
	padding-top: 1rem;
	display: flex;

	@media (max-width: 640px) {
		flex-direction: column;
	}
`;

export const ContentSelect = styled.div`
	display: flex;
	flex-direction: column;

	div:first-of-type {
		padding-right: 0.625rem;
	}

	@media (max-width: 640px) {
		justify-content: center;

		div:first-of-type {
			padding-right: 0;
			padding-bottom: 0.938rem;
		}
	}
`;

export const LabelSelect = styled.label`
	font-weight: 700;
	font-size: 0.875rem;
	line-height: 1.125rem;
	margin-bottom: 0.313rem;
`;

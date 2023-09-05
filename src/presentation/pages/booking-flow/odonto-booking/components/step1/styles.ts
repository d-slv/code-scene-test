import styled from 'styled-components';
import {Button} from 'presentation/components/button/button';
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

export const CardStepPageTile = styled.h3`
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

export const ContentConteiner = styled.div`
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

export const FooterCard = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;

	margin-top: 2.375rem;
	padding: 3rem 0 1.25rem;

	border-top: 1px solid #bebebe;

	@media (max-width: 640px) {
		text-align: center;
		flex-direction: column;
		padding: 1.438rem 0 0 0;

		button {
			margin-left: auto;
			margin-right: auto;
		}
	}
`;

export const ContainerInfo = styled.div`
	@media (max-width: 640px) {
		padding-bottom: 1.125rem;
	}

	@media screen and (min-width: 641px) and (max-width: 964px) {
		padding-right: 3.125rem;
	}
`;

export const ContentInfoTitle = styled.h4`
	font-weight: 700;
	font-size: 1.125rem;
	line-height: 1.438rem;

	@media (max-width: 640px) {
		font-size: 1rem;
		line-height: 1.25rem;
	}
`;

export const ContentInfo = styled.p`
	font-size: 0.875rem;
	line-height: 1.125rem;
	color: ${theme.colors['gray.4']};

	span {
		color: ${theme.colors['primaryBlue.500']};

		@media screen and (min-width: 641px) and (max-width: 964px) {
			display: flex;
			flex-direction: column;
		}
	}

	@media (max-width: 640px) {
		font-size: 0.75rem;
		line-height: 0.938rem;
	}
`;

export const ButtonScheduleOdonto = styled(Button)`
	@media (max-width: 640px) {
		width: 100%;

		svg {
			display: none;
		}
	}
`;

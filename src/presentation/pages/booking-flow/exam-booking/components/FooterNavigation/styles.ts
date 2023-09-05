import styled from 'styled-components';

import {Button} from 'presentation/components/button/button';
import {Link} from 'react-router-dom';

interface FooterCardProps {
	isStep1: boolean;
}

export const FooterCard = styled.div<FooterCardProps>`
	width: 100%;
	display: flex;
	gap: 16px;
	justify-content: space-between;
	align-items: ${({isStep1}) => (isStep1 ? 'normal' : 'center')};

	margin-top: 36px;
	padding: 36px 0px 20px;

	border-top: 1px solid #bebebe;

	@media (max-width: 640px) {
		flex-direction: column;
		padding: 24px 0px 0px;
		margin-top: 24px;
	}
`;

export const ButtonExamBooking = styled(Button)`
	@media (max-width: 640px) {
		width: 100%;

		span {
			display: none;
		}
	}
`;

export const ContainerInfo = styled.div`
	@media (max-width: 640px) {
		margin-bottom: 16px;
	}
`;

export const ContentInfoTitle = styled.h4`
	font-weight: 700;
	font-size: 1.125rem;

	@media (max-width: 640px) {
		font-size: 1rem;
	}
`;

export const ContentInfo = styled.p`
	font-size: 0.875rem;
	color: ${({theme}) => theme.colors['gray.4']};

	span {
		color: ${({theme}) => theme.colors['primaryBlue.500']};

		@media (max-width: 640px) {
			display: flex;
			flex-direction: column;
		}
	}

	@media (max-width: 640px) {
		font-size: 0.75rem;
	}
`;

export const StyledLink = styled(Link)`
	color: ${({theme}) => theme.colors.primary};
	font-weight: 600;
`;

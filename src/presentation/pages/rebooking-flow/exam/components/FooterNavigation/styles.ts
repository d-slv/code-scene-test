import styled from 'styled-components';

import {Button} from 'presentation/components/button/button';

interface FooterCardProps {
	isStep1: boolean;
}

export const FooterCard = styled.div<FooterCardProps>`
	width: 100%;
	display: flex;
	gap: 16px;
	justify-content: ${({isStep1}) => (isStep1 ? 'flex-end' : 'space-between')};
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

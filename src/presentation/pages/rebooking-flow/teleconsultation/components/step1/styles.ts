import styled from 'styled-components';
import {Button} from 'presentation/components/button/button';

export const FooterCard = styled.div`
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

export const ButtonScheduleHealth = styled(Button)`
	@media (max-width: 640px) {
		width: 100%;

		svg {
			display: none;
		}
	}
`;

export const FooterCardButtons = styled(FooterCard)`
	justify-content: flex-end;

	@media (max-width: 640px) {
		button:nth-of-type(1) {
			margin-top: 15px;
		}
	}
`;

import styled from 'styled-components';
import {Button} from 'presentation/components/button/button';

export const ContainerSelect = styled.div`
	display: flex;

	@media (max-width: 640px) {
		flex-direction: column;
		justify-content: center;
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

export const FooterCardButtons = styled.div`
	display: flex;
	justify-content: space-between;

	margin-top: 2.375rem;
	padding: 3rem 0 1.25rem;

	border-top: 1px solid #bebebe;

	@media (max-width: 640px) {
		text-align: center;
		flex-direction: column-reverse;
		padding: 1.438rem 0 0 0;

		button {
			margin-left: auto;
			margin-right: auto;

			:nth-of-type(1) {
				margin-top: 1rem;
			}
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

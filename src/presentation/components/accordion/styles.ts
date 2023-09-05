import styled from 'styled-components';

export const Wrapper = styled.div``;

export const ContainerAccordion = styled.div`
	padding: 1rem;
	border-radius: 0.5rem;
	box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);

	& + * {
		margin-top: 0.5rem;
	}

	&.hide {
		button {
			background: ${props => props.theme.colors.white};
			color: ${props => props.theme.colors['SecondaryBlue.500']};
			border: 1px solid ${props => props.theme.colors['gray.2']};
		}
	}
`;

export const AccordionTitle = styled.div`
	cursor: pointer;
	margin-top: 1rem;

	h2 {
		font-weight: 500;
		font-size: 1.125rem;
		line-height: 1.313rem;
		padding: 0.5rem 0;
		text-transform: capitalize;
	}

	display: flex;
	justify-content: space-between;
	align-items: center;

	svg {
		color: ${props => props.theme.colors.primary};
	}
`;

export const AccordionResult = styled.div`
	transition: max-height 1s;

	&.content {
		max-height: 0;
		overflow: hidden;
		transition: all 0.5s cubic-bezier(0, 1, 0, 1);
	}

	&.show {
		max-height: 99999px;
		transition: all 0.5s cubic-bezier(0, 1, 0, 1);

		/* @media (max-width: 640px) {
			div {
				width: 80%;
				flex-wrap: nowrap;
				background: aqua;
				overflow-x: auto;
			}
		} */
	}
`;

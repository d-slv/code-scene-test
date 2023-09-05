import {Button} from 'presentation/components/button/button';
import styled from 'styled-components';
import theme from '../../../styles/theme.styles';

export const Container = styled.div`
	height: 100%;
`;

export const Header = styled.header`
	margin-bottom: 1.5rem;

	.image_and_text {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
		font-size: 0.875rem;
	}

	.text_and_button {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;

		h1 {
			font-size: 1.75rem;
		}

		@media (max-width: 680px) {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 2rem;
		}
	}

	.buttons_header {
		display: flex;
		gap: 1.5rem;
		align-items: center;
	}

	@media (max-width: 750px) {
		height: unset;
	}
`;

export const ButtonFilter = styled(Button)`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	background-color: ${theme.colors.primary};
	color: ${theme.colors.white};
	border: solid 1px ${theme.colors.primary};
	font-weight: 600;
`;

export const Content = styled.main``;

export const ContainerCard = styled.main`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;

	h2 {
		font-size: 1.438rem;
	}
`;

export const ContentCard = styled.main`
	display: flex;
	align-items: center;
	gap: 2.1rem;
	height: 100%;
`;

export const ContentButtonsScroll = styled.div`
	display: flex;
	justify-content: center;
	margin: 2rem 0;
`;

export const ContainerSelect = styled.div`
	margin: 0 auto;
	width: 100%;

	@media (max-width: 1460px) {
		text-align: center;
	}

	input::placeholder {
		color: #707070;
	}

	h3 {
		font-size: 1.438rem;
	}

	p {
		margin-bottom: 0.5rem;
		font-weight: bold;
	}

	select {
		color: #707070;
	}
`;

export const ContainerInputAndSelect = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;

	@media (max-width: 750px) {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`;

export const ContainerSelectDate = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 0.5rem;
	align-items: center;

	@media (max-width: 1460px) {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0rem;
	}
`;

interface IMonth {
	isMarginBottom: boolean;
}
export const Month = styled.div<IMonth>`
	${props =>
		props.isMarginBottom && {
			marginBottom: '1.2rem',
		}}
`;
interface IYear {
	isMarginBottom: boolean;
}
export const Year = styled.div<IYear>`
	${props =>
		props.isMarginBottom && {
			marginBottom: '1.2rem',
		}}
`;

export const ValidationMonth = styled.div`
	margin-top: 0.5rem;
	color: ${theme.colors['red.400']};
`;
export const ValidationYear = styled.div`
	margin-top: 0.5rem;
	color: ${theme.colors['red.400']};
`;

interface ISeparator {
	isMarginBottom: boolean;
}

export const Separator = styled.span<ISeparator>`
	align-self: center;
	font-weight: bold;
	margin-bottom: 0.5rem;
	${props =>
		props.isMarginBottom && {
			marginBottom: '1.5rem',
		}}
`;

export const FilterMessageByDate = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	margin-top: 1rem;

	p:nth-child(1) {
		color: #12abd7;
	}

	p:nth-child(2) {
		color: #707070;
		font-weight: 400;
		text-align: center;
	}
`;

export const ButtonFooterModal = styled.div`
	display: flex;
	margin-top: 5rem;
	justify-content: center;
	gap: 2rem;

	@media (max-width: 1350px) {
		margin-top: 1rem;
	}
`;

export const ButtonFilterLeftModal = styled(Button)`
	padding: 0.5rem;
	font-weight: 600;
`;

export const ButtonFilterRightModal = styled(Button)`
	padding: 0.5rem;
	background-color: ${theme.colors.white};
	color: ${theme.colors.primary};
	border: solid 1px ${theme.colors.primary};
	font-weight: 600;
`;

export const InputText = styled.input`
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid ${props => props.theme.colors['primaryBlue.500']};
	padding: 0.8125rem 1.2rem;
	border-radius: 0.625rem;
	background: ${props => props.theme.colors.white};
	width: 100%;
`;

export const SelectDropDownPrescription = styled(Button)`
	padding: 0.5rem;
	background-color: ${theme.colors.white};
	color: ${theme.colors.primary};
	border: solid 1px ${theme.colors.primary};
	font-weight: 600;
`;

export const Detail = styled.h2`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 100%;
	height: 20vh;
	background: inherit;
	align-items: center;
	justify-content: center;
	box-shadow: 0 rgba(none);
	border: 1px dashed #bababa;

	p {
		font-size: 18px;
		color: #666666;
	}
	.load {
		p {
			color: ${theme.colors.primary};
			font-size: 16px;
		}
	}
`;

export const Pagination = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media (max-width: 680px) {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}
`;
export const PaginationButton = styled.div`
	display: flex;
	flex-wrap: wrap;
`;
interface IPaginationItem {
	isSelect?: boolean | '';
}

export const PaginationItem = styled.div<IPaginationItem>`
	margin: 0 10px;
	cursor: pointer;
	color: var(--blue);
	width: 2rem;
	height: 2rem;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;

	&.previous {
		margin-right: 1rem;
	}
	&.pages {
		border: 1px solid '#0054B8';
	}

	${props =>
		props.isSelect && {
			background: '#0054B8',
			color: 'white',
			border: '0%',
		}}
`;

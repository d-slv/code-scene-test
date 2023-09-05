import styled from 'styled-components';
import theme from 'presentation/styles/theme.styles';

export const Container = styled.main`
	margin: 0 auto;
	height: 100vh;
	background: ${theme.colors.white};

	display: grid;
	grid-template-columns: 1fr 1fr;
`;

export const Section = styled.section`
	width: 50vw;
	max-width: 100%;

	display: grid;
	grid: 0.5fr auto auto auto / 6vw 31.55vw 8vw;

	@media (max-width: 640px) {
		width: 100vw;
		grid-template-rows: 0.4fr 0.2fr auto auto;
		grid-template-columns: 0.5fr 5fr 0.5fr;
	}
`;

export const ContainerForm = styled.form`
	display: grid;
	grid-area: 3 / 2;
`;

export const ResendButton = styled.button`
	width: 11.188rem;
	height: 2.813rem;
	font-weight: 900;
	line-height: 1.156rem;
	color: ${theme.colors['primaryBlue.500']};
	background: ${theme.colors.white};

	border: 2px solid #0054b8;
	border-radius: 1.813rem;

	display: grid;
	grid-column: 1;
	align-items: center;

	@media (max-width: 640px) {
		width: 100%;
		margin-top: 0.688rem;
	}
`;

export const ContainerImage = styled.div`
	width: 50vw;
	height: 100vh;
	max-width: 100%;

	@media (max-width: 640px) {
		display: none;
	}
`;

export const DoubleInput = styled.div`
	width: 100%;
	display: grid;
	column-gap: 14px;
	grid-template-columns: 1fr 1fr;
`;

export const FormDiv = styled.div`
	display: grid;
	grid-area: 3 / 2;
`;

export const ImageDiv = styled.div`
	width: 50vw;
	height: 100vh;
	max-width: 100%;

	@media (max-width: 640px) {
		display: none;
	}
`;

export const CodeButtons = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: space-between;

	@media (max-width: 1024px) {
		display: flex;
		align-items: center;
		justify-content: space-around;
		flex-direction: column-reverse;

		button {
			width: 100%;
		}
	}
`;

export const TermsOfUseCheckbox = styled.input.attrs({type: 'checkbox'})``;

export const ContainerTermsOfUse = styled.div`
	color: ${theme.colors.black};
	a {
		cursor: pointer;
		color: ${theme.colors.primary};
		text-decoration: underline;
	}
`;

export const TermsOfUseContent = styled.div`
	gap: 0.5rem;
	display: flex;
	padding-top: 0.313rem;
`;

export const ContentModal = styled.div`
	overflow: hidden;

	div {
		overflow-x: hidden;
	}
`;

export const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	color: ${theme.colors.black};
	justify-content: center;
`;

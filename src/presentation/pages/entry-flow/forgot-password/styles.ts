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
	} ;
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

export const ContainerForm = styled.form`
	display: grid;
	grid-area: 3 / 2;
`;

export const ContainerImage = styled.div`
	width: 50vw;
	height: 100vh;
	max-width: 100%;

	@media (max-width: 640px) {
		display: none;
	}
`;

import styled from 'styled-components';
import {SadFaceIcon} from 'presentation/components/icons';

export const Container = styled.div`
	width: 100%;
	display: grid;
	column-gap: 40px;
	grid-template-columns: 30% 70%;
	background: #f1f7ff;
	border-radius: 1rem;
	padding: 40px;

	@media (max-width: 768px) {
		display: flex;
		padding: 1rem;
		flex-direction: column;
		text-align: center;
	}
`;

export const LeftContent = styled.div`
	@media (max-width: 768px) {
		svg {
			width: 90px;
			height: 90px;
			margin-bottom: 20px;
		}
	}
`;

export const RigthContent = styled.div`
	padding-right: 5vw;

	@media (max-width: 768px) {
		padding-right: 0;
	}
`;

export const CardContent = styled.div`
	color: #5ba4fb;
	grid-row: 1;
	flex-direction: column;
	text-align: left;

	h3 {
		font-weight: 700;
		font-size: 44px;
		line-height: 52px;
	}

	p {
		margin-top: 0.8rem;
	}

	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
		text-align: center;

		h3 {
			font-size: 24px;
			line-height: 22px;
		}
	}
`;

export const ButtonsContainer = styled.div`
	gap: 22px;
	width: 100%;
	display: flex;
	margin-top: 50px;

	button {
		width: 100%;
	}

	@media (max-width: 767px) {
		display: flex;
		flex-direction: column;

		button {
			font-size: 12px;
		}
	}

	@media (min-width: 768px) and (max-width: 1024px) {
		button {
			font-size: 14px;
		}
	}
`;

export const SadFace = styled(SadFaceIcon).attrs({})``;

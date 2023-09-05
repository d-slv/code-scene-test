import styled from 'styled-components';
import theme from 'presentation/styles/theme.styles';

export const ContainerTooltip = styled.div`
	width: auto;
	display: grid;
	justify-items: center;

	@media (max-width: 640px) {
		button {
			width: 100%;
			margin-bottom: 0.625rem;
		}
	}
`;

export const IconContainer = styled.div`
	width: 25px;
	height: 25px;
	display: flex;
	margin-left: 10px;
	align-content: center;
	align-items: center;
	justify-content: center;
`;

export const ContainerCalendar = styled.div`
	display: flex;
	margin-top: 50px;
	align-content: center;
	flex-direction: column;
	justify-content: center;
	height: auto;
	min-width: 180px;
	padding: 9px;
	position: absolute;
	z-index: 9999;
	border-radius: 0 0 17px 17px;
	background-color: white;
	box-shadow: rgba(0, 0, 0, 0.07) 0px 9px 21px;
	overflow: hidden;
	overflow-y: auto;

	::-webkit-scrollbar {
		display: none;
	}

	@media (max-width: 640px) {
		width: 60%;
	}
`;

export const CalendarOptions = styled.div`
	display: grid;
	cursor: pointer;
	text-align: center;
	align-content: center;
	justify-content: center;
	align-items: center;
	font-size: 15px;
	line-height: 18px;
	padding: 10px 1rem;
	grid-template-columns: 0.4fr 1fr;

	:hover {
		background: #f1f1f1;
		border-radius: 1rem;
	}

	a {
		display: flex;
		text-decoration: none;

		p {
			font-weight: 600;
			margin-left: 10px;
			text-align: center;
			color: ${theme.colors.black};
		}
	}
`;

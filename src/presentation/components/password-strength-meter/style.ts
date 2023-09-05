import styled from 'styled-components';

export const Container = styled.div``;

export const ContainerSpanNone = styled.div`
	display: flex;
	flex-direction: row;

	span {
		margin: 5px;
		height: 7px;
		width: 100%;

		border-radius: 2px;
		background-color: #e6e6e6;
	}
`;

export const ContainerSpanEasy = styled.div`
	display: flex;
	flex-direction: row;

	span:first-child {
		margin: 5px;
		height: 7px;
		width: 100%;

		border-radius: 2px;
		background-color: #c93600;
	}

	span:nth-child(2) {
		margin: 5px;
		height: 7px;
		width: 100%;

		border-radius: 2px;
		background-color: #e6e6e6;
	}

	span:last-child {
		margin: 5px;
		height: 7px;
		width: 100%;

		border-radius: 2px;
		background-color: #e6e6e6;
	}
`;

export const ContainerSpanMedium = styled.div`
	display: flex;
	flex-direction: row;

	span:first-child {
		margin: 5px;
		height: 7px;
		width: 100%;

		border-radius: 2px;
		background-color: #0054b8;
	}

	span:nth-child(2) {
		margin: 5px;
		height: 7px;
		width: 100%;

		border-radius: 2px;
		background-color: #0054b8;
	}

	span:last-child {
		margin: 5px;
		height: 7px;
		width: 100%;

		border-radius: 2px;
		background-color: #e6e6e6;
	}
`;

export const ContainerSpanStrong = styled.div`
	display: flex;
	flex-direction: row;

	span:first-child {
		margin: 5px;
		height: 7px;
		width: 100%;

		border-radius: 2px;
		background-color: #0054b8;
	}

	span:nth-child(2) {
		margin: 5px;
		height: 7px;
		width: 100%;

		border-radius: 2px;
		background-color: #0054b8;
	}

	span:last-child {
		margin: 5px;
		height: 7px;
		width: 100%;

		border-radius: 2px;
		background-color: #0054b8;
	}
`;

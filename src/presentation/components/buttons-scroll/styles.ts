import styled from 'styled-components';

export const Content = styled.div`
	cursor: pointer;
	display: flex;
	align-items: center;

	@media (max-width: 768px) {
		display: none;
	}
`;

export const ButtonScroll = styled.button`
	border: none;
	background: local;

	:disabled {
		display: none;
	}
`;

export const Icon = styled.span`
	display: flex;
	align-items: center;
	color: #0054b8;
`;

export const IndicatorBar = styled.button`
	cursor: default;
	width: 1.875rem;
	height: 6px;
	border: none;
	margin: 0 0.938rem;
	border-radius: 6px;
	background: #00acd7;

	:disabled {
		background: #c4c4c4;
	}
`;

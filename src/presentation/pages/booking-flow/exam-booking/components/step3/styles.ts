import styled from 'styled-components';

export const CardLocation = styled.div`
	display: flex;
	align-items: center;
	white-space: pre-wrap;
`;

export const CardLocationContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

export const CardLocationIconContainer = styled.div`
	margin-right: 24px;
`;

export const CardLocationTitle = styled.h6`
	font-family: 'Roboto';
	font-weight: 700;
	font-style: normal;
	font-size: 1rem;
	margin-bottom: 5px;
	text-align: initial;
`;

export const CardLocationAddress = styled.p`
	font-family: 'Roboto';
	font-style: normal;
	font-weight: 400;
	font-size: 0.75rem;
	color: ${({theme}) => theme.colors['gray.5']};
	text-align: initial;
	text-transform: capitalize;
`;

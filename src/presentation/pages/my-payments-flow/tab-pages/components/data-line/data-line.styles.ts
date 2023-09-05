import styled from 'styled-components';

import theme from 'presentation/styles/theme.styles';

export const BaseText = styled.p`
	font-size: 1rem;
	color: ${theme.colors['gray.6']};
	margin-bottom: 16px;
`;

export const BoldText = styled.span`
	font-weight: 700;
`;

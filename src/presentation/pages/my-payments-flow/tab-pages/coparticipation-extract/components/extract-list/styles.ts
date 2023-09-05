import theme from 'presentation/styles/theme.styles';
import styled from 'styled-components';

export const Container = styled.ul`
	list-style: none;

	li + li {
		border-top: 1px solid ${theme.colors.divider};
	}
`;

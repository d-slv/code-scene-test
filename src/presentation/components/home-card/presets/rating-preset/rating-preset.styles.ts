import styled from 'styled-components';
import theme from 'presentation/styles/theme.styles';

type SubCardProps = {
	width: string;
	bottom: string;
	zIndex: number;
};

export const CardsContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	padding-bottom: 3px;
	width: fit-content;
`;

export const StyledTitle = styled.span`
	font-size: 16px;
`;

export const StyledText = styled.span`
	font-size: 12px;

	@media (max-width: 1080px) {
		display: inline-block;
		margin-bottom: 60px;
	}
`;

export const SubCard = styled.div<SubCardProps>`
	width: ${props => props.width};
	bottom: ${props => props.bottom};
	z-index: ${props => props.zIndex};
	position: absolute;
	align-self: center;
	max-width: 22rem;
	height: 50px;
	border-radius: ${theme.border.radius.sm.value};
	background-color: ${theme.colors.white};
	box-shadow: 0px 1px 10px #edeff2;
`;

import styled from 'styled-components';
import {MdKeyboardArrowDown} from 'react-icons/md';
import {Card} from '../../card';

export const Container = styled(Card)`
	max-width: 730px;
	padding: 24px 60px;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 16px;

	@media (max-width: 576px) {
		padding: 24px 16px;
	}
`;

export const Title = styled.h1`
	font-size: 2.25rem;
	font-weight: 700;
	margin-bottom: 2px;

	@media (max-width: 576px) {
		margin-bottom: 16px;
	}
`;

export const Text = styled.p`
	max-width: 616px;
	line-height: 1.3;
	text-align: center;
`;

export const BoldText = styled.span`
	font-weight: 700;
`;

export const ArrowDownIcon = styled(MdKeyboardArrowDown)`
	display: flex;
	align-self: center;
	margin-top: 20px;
	justify-content: center;
	font-size: 1.875rem;

	@media (max-width: 576px) {
		margin-top: 12px;
	}
`;

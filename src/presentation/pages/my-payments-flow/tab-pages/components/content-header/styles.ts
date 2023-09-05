import styled, {css} from 'styled-components';

interface MobileSelectDateContainerProps {
	isDoubleSelect: boolean;
}

export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 32px;
`;

export const SelectDateContainer = styled.div`
	display: flex;
	gap: 16px;
`;

export const MobileTabTitleHeader = styled.p<MobileSelectDateContainerProps>`
	font-size: 0.875rem;
	font-weight: 700;

	@media (max-width: 640px) {
		margin-bottom: ${({isDoubleSelect}) => isDoubleSelect && '12px'};
	}
`;

export const MobileSelectDateContainer = styled.div<MobileSelectDateContainerProps>`
	width: 100%;
	margin-bottom: 16px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	gap: 8px;

	button {
		margin: auto;
	}

	@media (max-width: 640px) {
		${props =>
			props.isDoubleSelect &&
			css`
				flex-direction: column;
				justify-content: center;
				gap: 16px;
			`}
	}

	@media (max-width: 361px) {
		justify-content: center;
	}
`;

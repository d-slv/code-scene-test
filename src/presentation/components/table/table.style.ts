import theme from 'presentation/styles/theme.styles';
import styled from 'styled-components';

type TableProps = {
	bottomSpace?: string;
};

type TableCellProps = {
	color?: string;
};

type TableHeaderProps = {
	backgroundColor?: string;
};

type TableBodyProps = {
	backgroundColor?: string;
	stripe?: boolean;
	stripeColor?: string;
};

export const TableHeader = styled.thead<TableHeaderProps>`
	background-color: ${props => theme.colors[props.backgroundColor || 'primary']};
`;

export const TableTh = styled.th<TableCellProps>`
	color: ${props => theme.colors[props.color || 'white']};
	font-weight: 500;
`;

export const TableBody = styled.tbody<TableBodyProps>`
	tr {
		background-color: ${props => theme.colors[props.backgroundColor || 'smooth']};

		${props =>
			props.stripe &&
			`
			&:nth-child(odd) {
				background-color: ${theme.colors[props.stripeColor || 'gray.8']};
			}
		`}
	}
`;

export const TableTd = styled.td<TableCellProps>`
	color: ${props => theme.colors[props.color || 'gray.5']};
	font-weight: 600;
`;

export const TableContainer = styled.div`
	overflow-x: auto;
`;

export const Table = styled.table.attrs({
	cellSpacing: 0,
	cellPadding: 0,
})<TableProps>`
	width: 100%;
	font-size: ${theme.font.size.xs.value};
	font-weight: 500;
	margin-bottom: ${props => theme.spacing.size[props.bottomSpace]?.value};
	border-collapse: collapse;

	@media (max-width: 640px) {
		font-size: ${theme.font.size.xxs.value};
	}

	@media (max-width: 380px) {
		font-size: ${theme.font.size.xxxs.value};
	}

	${TableTh}, ${TableTd} {
		padding: 0.625rem 1.5rem;
		text-align: center;

		&:first-child {
			text-align: left;
		}

		&:last-child {
			text-align: right;
		}

		@media (max-width: 640px) {
			padding: 0.5rem 0.8rem;
		}
	}
`;

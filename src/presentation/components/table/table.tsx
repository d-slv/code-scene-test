import React from 'react';
import * as S from './table.style';
import {TableProps} from './table.types';

export const Table = (props: TableProps) => {
	const {header, body} = props;

	return (
		<S.TableContainer>
			<S.Table bottomSpace="xs">
				<S.TableHeader backgroundColor={header.background?.color}>
					<tr>
						{header.columns.map((columnData, index) => (
							<S.TableTh key={index} color={columnData.color}>
								{columnData.text}
							</S.TableTh>
						))}
					</tr>
				</S.TableHeader>
				<S.TableBody
					backgroundColor={body.background?.color}
					stripe={body.background.stripe}
					stripeColor={body.background.stripeColor}>
					{body.rows.map((row, rowIndex) => (
						<tr key={`row-${rowIndex}`}>
							{row.map((column, columnIndex) => (
								<S.TableTd key={`column-${columnIndex}`} color={column.color}>
									{column.text}
								</S.TableTd>
							))}
						</tr>
					))}
				</S.TableBody>
			</S.Table>
		</S.TableContainer>
	);
};

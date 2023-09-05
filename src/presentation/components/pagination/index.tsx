/* eslint-disable no-plusplus */
import React, {useState} from 'react';
import * as S from './styles';

interface PaginationProps {
	totalItems?: number;
	itemsPerPage?: number;
	paginate?: (pageNumber: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({paginate, totalItems, itemsPerPage}) => {
	const pageNumbers = [];
	const [actived, setActived] = useState(1);

	for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<S.PaginationContainer>
			<ul>
				{pageNumbers.map(number => (
					<li
						key={number}
						onClick={() => {
							paginate(number);
							setActived(number);
						}}
						className={number === actived && 'actived'}>
						<a>{number}</a>
					</li>
				))}
			</ul>
		</S.PaginationContainer>
	);
};

import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {MdArrowForwardIos} from 'react-icons/md';
import * as S from './style';

type CardCategoryProps = {
	data?: any;
	title?: string;
	show?: boolean;
	children?: React.ReactNode;
	setShow?: Dispatch<SetStateAction<boolean>>;
	selectedIndex?: number;
	setSelectedIndex?: Dispatch<SetStateAction<any>>;
};

export const CardListResult: React.FC<CardCategoryProps> = ({
	title,
	selectedIndex,
	data,
	show,
	setShow,
	setSelectedIndex,
}) => {
	const [query, setQuery] = useState({matches: window.matchMedia('(min-width: 820px)').matches});

	useEffect(() => {
		const handler = e => setQuery({matches: e.matches});
		window.matchMedia('(min-width: 820px)').addEventListener('change', handler);
	}, []);

	const filtered = data.filter(item => item.id === selectedIndex);

	return (
		<S.ContainerCardListResult>
			{show === true ? (
				<S.CardListResult>
					<S.Title>{title}</S.Title>
					{data.map((element, index) => (
						<S.Content
							key={index}
							onClick={() => {
								setSelectedIndex(element.id);
								setShow(false);
							}}>
							<S.LeftContent>
								<S.ContentTitle>{element.attributes.text}</S.ContentTitle>
								{query.matches ? (
									<S.ContentResume>{element.attributes.resume}</S.ContentResume>
								) : null}
							</S.LeftContent>
							<MdArrowForwardIos />
						</S.Content>
					))}
				</S.CardListResult>
			) : (
				<S.CardListResult>
					<S.Title>{title}</S.Title>
					{filtered.map((obj, index) => (
						<S.LeftContent key={index}>
							<S.ContentTitle>{obj.attributes.text}</S.ContentTitle>
							<S.ContentResume>
								{obj.attributes.content.replace('\n', '\n')}
							</S.ContentResume>
						</S.LeftContent>
					))}
				</S.CardListResult>
			)}
		</S.ContainerCardListResult>
	);
};

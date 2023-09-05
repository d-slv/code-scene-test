import React, {Dispatch, ReactNode, SetStateAction} from 'react';
import {CategoryIcon} from '../icons/icon-category';
import * as S from './style';

interface Attributes {
	width: string;
	icon?: ReactNode;
	title: string;
	height: string;
	resume: string;
}

interface CardCategoryHelpCenterProps {
	attributes: Attributes;
	setSelectedCategory?: Dispatch<SetStateAction<any>>;
}

export function CardCategory(props: CardCategoryHelpCenterProps) {
	const {attributes, setSelectedCategory} = props;
	return (
		<>
			<S.ContainerCardsService onClick={() => setSelectedCategory(attributes.title)}>
				<S.CardCategoryHelpCenter>
					icon={<CategoryIcon width={26} height={26} />}
					<S.InfoCard>
						<S.TitleCard>{attributes.title}</S.TitleCard>
						<S.ContentCard>{attributes.resume}</S.ContentCard>
					</S.InfoCard>
				</S.CardCategoryHelpCenter>
			</S.ContainerCardsService>
		</>
	);
}

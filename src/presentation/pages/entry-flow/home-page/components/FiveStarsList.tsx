import React from 'react';

import {CardEmpty} from 'presentation/components/card-empty/card-empty';
import {RatingPreset} from 'presentation/components/home-card';
import {translations} from 'presentation/translations';
import {GetFiveStarsModel} from 'domain/usecases';
import {RatingEmptyCardContainer} from '../styles';

const localTranslations = translations['pt-br'].homePage;

interface FiveStarsListProps {
	hideCard: boolean;
	setIsOpenFiveStars: (value: boolean) => void;
	questionsResult: GetFiveStarsModel;
}

export function FiveStarsList({hideCard, setIsOpenFiveStars, questionsResult}: FiveStarsListProps) {
	return (
		<>
			{!hideCard && questionsResult !== undefined ? (
				<RatingPreset
					linkAction={setIsOpenFiveStars}
					info={questionsResult.items[0].info}
				/>
			) : (
				<RatingEmptyCardContainer>
					<CardEmpty title={localTranslations.ratingEmptyTitle}>
						{localTranslations.ratingEmpty}
					</CardEmpty>
				</RatingEmptyCardContainer>
			)}
		</>
	);
}

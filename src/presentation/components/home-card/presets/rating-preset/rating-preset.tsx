import React, {Dispatch, SetStateAction} from 'react';

import {translations} from 'presentation/translations';
import {IconCheck, RatingFlower} from 'presentation/components/icons';
import {Button} from 'presentation/components/button/button';
import theme from 'presentation/styles/theme.styles';
import {HomeCard} from '../../home-card';
import {CardsContainer, StyledTitle, StyledText} from './rating-preset.styles';

interface PresetProps {
	info: {
		titulo: string;
		especialidade: string;
	};
	linkAction: Dispatch<SetStateAction<boolean>>;
}

const localTranslations = translations['pt-br'].homePage;

export const RatingPreset: React.FC<PresetProps> = ({info, linkAction}) => (
	<CardsContainer>
		<HomeCard
			title={<StyledTitle>{localTranslations.ratingCardTitle}</StyledTitle>}
			content={<StyledText>{info.titulo}</StyledText>}
			textColor="#666666"
			rightIcon={<RatingFlower />}
			cutIcon={false}
			footer={
				<Button
					onClick={() => linkAction(true)}
					rightIcon={<IconCheck width={14} height={14} fill={theme.colors.white} />}
					spacingInsetX="xs">
					{localTranslations.rateNow}
				</Button>
			}
		/>

		{/* <S.SubCard width="94%" bottom="0px" zIndex={-2} />
		<S.SubCard width="97%" bottom="5px" zIndex={-1} /> */}
	</CardsContainer>
);

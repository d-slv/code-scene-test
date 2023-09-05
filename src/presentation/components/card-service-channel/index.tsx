import React from 'react';
import {useNavigate} from 'react-router-dom';
import amplitude from 'amplitude-js';
import TagManager from 'react-gtm-module';
import ReactGA from 'react-ga';
import * as S from './style';

interface Attributes {
	width: string;
	icon?: string;
	title: string;
	text: string;
	link?: string;
	height: string;
	textButton: string;
}

interface CardServiceChannelProps {
	attributes: Attributes;
}

export function CardServiceChannel(cardProps: CardServiceChannelProps) {
	const {attributes} = cardProps;
	const navigate = useNavigate();

	const handleClick = () => {
		ReactGA.event({
			category: 'Atendimento',
			action: 'Falar com atendimento',
		});
		const tagManagerArgs = {
			gtmId: 'GTM-KQKN552',
			events: {
				sendUserInfo: 'Falar com atendimento',
			},
		};

		TagManager.initialize(tagManagerArgs);
		amplitude.getInstance().logEvent('Falar com atendimento');
		navigate(attributes.link, {replace: true});
	};

	return (
		<>
			<S.ContainerCardsService>
				<S.CardServiceChannel>
					<S.IconCard>
						<img src={attributes.icon} />
					</S.IconCard>
					<S.InfoCard>
						<S.TitleCard>{attributes.title}</S.TitleCard>
						<S.ContentCard>{attributes.text}</S.ContentCard>
					</S.InfoCard>
					<S.ButtonCard onClick={handleClick}>{attributes.textButton}</S.ButtonCard>
				</S.CardServiceChannel>
			</S.ContainerCardsService>
		</>
	);
}

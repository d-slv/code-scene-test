import React from 'react';
import {useRecoilValue} from 'recoil';

import {translations} from 'presentation/translations';
import {ExternalLinkCardService, Ambulance} from '../styles';
import {accountDataState, emergencyLinkState} from '../../atoms';

const localTranslations = translations['pt-br'].homePage;

export function EmergencyLink() {
	const {beneficiary} = useRecoilValue(accountDataState);
	const emergencyUrl = useRecoilValue(emergencyLinkState(beneficiary.nuContrato));
	return (
		<ExternalLinkCardService href={emergencyUrl} target="_blank" rel="noreferrer">
			<Ambulance />
			{localTranslations.emergency}
		</ExternalLinkCardService>
	);
}

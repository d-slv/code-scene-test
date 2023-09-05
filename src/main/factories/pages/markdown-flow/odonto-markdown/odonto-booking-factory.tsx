import React from 'react';
import {OdontoMarkdown} from 'presentation/pages/rebooking-flow';
import {
	makeGetOdontoDates,
	makeGetOdontoTimes,
	makePostOdontoRebook,
	makeGetOdontoProviders,
	makeGetOdontoDistricts,
	makeGetOdontoSpecialties,
	makeGetProvidersDentalGuide,
} from 'main/factories/usecases';

export const MakeOdontoMarkdown: React.FC = () => (
	<OdontoMarkdown
		date={makeGetOdontoDates()}
		time={makeGetOdontoTimes()}
		rebooking={makePostOdontoRebook()}
		districts={makeGetOdontoDistricts()}
		providers={makeGetOdontoProviders()}
		accreditedProviders={makeGetProvidersDentalGuide()}
		specialties={makeGetOdontoSpecialties()}
	/>
);

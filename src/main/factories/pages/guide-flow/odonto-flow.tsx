import React from 'react';
import {
	makeGetStatesDentalGuide,
	makeGetCitiesDentalGuide,
	makeGetServicesDentalGuide,
	makeGetProvidersDentalGuide,
	makeGetNeighborhoodsDentalGuide,
	makeGetProvidersDetailsDentalGuide,
	makeGetSpecialtiesSubSpecialtiesDentalGuide,
} from 'main/factories/usecases';
import {OdontoGuide} from 'presentation/pages/guide-flow/odonto-guide';

export const MakeDentalGuide: React.FC = () => (
	<OdontoGuide
		states={makeGetStatesDentalGuide()}
		getCities={makeGetCitiesDentalGuide()}
		getServices={makeGetServicesDentalGuide()}
		getProviders={makeGetProvidersDentalGuide()}
		getNeighborhoods={makeGetNeighborhoodsDentalGuide()}
		getProvidersDetails={makeGetProvidersDetailsDentalGuide()}
		getSpecialties={makeGetSpecialtiesSubSpecialtiesDentalGuide()}
	/>
);

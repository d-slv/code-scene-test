import React from 'react';
import {
	makeGetStatesMedicalGuide,
	makeGetCitiesMedicalGuide,
	makeGetServicesMedicalGuide,
	makeGetProvidersMedicalGuide,
	makeGetProvidersDetailsMedicalGuide,
	makeGetSpecialtiesSubSpecialtiesMedicalGuide,
} from 'main/factories/usecases';
import {HealthGuide} from 'presentation/pages/guide-flow/health-guide';

export const MakeMedicalGuide: React.FC = () => (
	<HealthGuide
		states={makeGetStatesMedicalGuide()}
		getCities={makeGetCitiesMedicalGuide()}
		getServices={makeGetServicesMedicalGuide()}
		getProviders={makeGetProvidersMedicalGuide()}
		getProvidersDetails={makeGetProvidersDetailsMedicalGuide()}
		getSpecialties={makeGetSpecialtiesSubSpecialtiesMedicalGuide()}
	/>
);

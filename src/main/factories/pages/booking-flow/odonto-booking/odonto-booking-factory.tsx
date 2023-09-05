import React from 'react';
import {
	makeGetOdontoCities,
	makeGetOdontoStates,
	makeGetOdontoDistricts,
	makeGetOdontoDates,
	makeGetOdontoTimes,
	makeGetOdontoProviders,
	makeGetOdontoBooked,
	makePostOdontoBookingConfirm,
	makePostOdontoRebook,
	makeGetOdontoSpecialties,
	makeGetBeneficiary,
	makeGetProvidersDentalGuide,
} from 'main/factories/usecases';
import {OdontoBooking} from 'presentation/pages/booking-flow';

export const MakeOdontoBooking: React.FC = () => (
	<OdontoBooking
		beneficiaries={makeGetBeneficiary()}
		states={makeGetOdontoStates()}
		cities={makeGetOdontoCities()}
		date={makeGetOdontoDates()}
		time={makeGetOdontoTimes()}
		specialties={makeGetOdontoSpecialties()}
		districts={makeGetOdontoDistricts()}
		providers={makeGetOdontoProviders()}
		accreditedProviders={makeGetProvidersDentalGuide()}
		booked={makeGetOdontoBooked()}
		book={makePostOdontoBookingConfirm()}
		rebook={makePostOdontoRebook()}
	/>
);

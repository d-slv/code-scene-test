import React, {useEffect, useState} from 'react';
import {useResetRecoilState} from 'recoil';
import {odontoBookingStates} from 'presentation/pages/states/atoms';
import {
	GetOdontoCities,
	GetOdontoStates,
	PostOdontoBookingConfirm,
	GetOdontoDistricts,
	GetOdontoDates,
	GetOdontoTimes,
	GetOdontoProviders,
	GetOdontoBooked,
	PostOdontoRebook,
	GetOdontoSpecialties,
	GetBeneficiary,
	GetProvidersDentalGuide,
} from 'domain/usecases';
import {translations} from 'presentation/translations';
import {ScheduleTimeline, ScheduleTimelinePage} from 'presentation/components/schedule-timeline';
import {Step1, Step2, Step3, Step4, Step5, Step6} from './components';
import * as S from './styles';

type Props = {
	beneficiaries: GetBeneficiary;
	states: GetOdontoStates;
	cities: GetOdontoCities;
	booked: GetOdontoBooked;
	specialties: GetOdontoSpecialties;
	districts: GetOdontoDistricts;
	providers: GetOdontoProviders;
	accreditedProviders: GetProvidersDentalGuide;
	date: GetOdontoDates;
	time: GetOdontoTimes;
	book: PostOdontoBookingConfirm;
	rebook: PostOdontoRebook;
};

export const OdontoBooking: React.FC<Props> = ({
	date,
	time,
	states,
	cities,
	book,
	specialties,
	districts,
	providers,
	accreditedProviders,
	rebook,
	booked,
}: Props) => {
	const [currentPage, setCurrentPage] = useState(0);

	const resetState = useResetRecoilState(odontoBookingStates);

	useEffect(() => {
		resetState();
	}, []);

	function nextPage(n: number) {
		setCurrentPage(n);
	}

	function backPage(n: number) {
		setCurrentPage(n);
	}

	return (
		<>
			<S.MainTitle>{translations['pt-br'].bookingFlow.titlePageOdonto}</S.MainTitle>

			<ScheduleTimeline
				currentPage={currentPage}
				onHeaderClick={index => setCurrentPage(index)}>
				<ScheduleTimelinePage label={translations['pt-br'].bookingFlow.locationStepLabel}>
					<Step1 states={states} cities={cities} onNextClick={() => nextPage(1)} />
				</ScheduleTimelinePage>

				<ScheduleTimelinePage label={translations['pt-br'].bookingFlow.specialtyStepLabel}>
					<Step2
						specialties={specialties}
						booked={booked}
						onBackClick={() => backPage(0)}
						onNextClick={() => nextPage(2)}
					/>
				</ScheduleTimelinePage>

				<ScheduleTimelinePage label={translations['pt-br'].bookingFlow.providerStepLabel}>
					<Step3
						districts={districts}
						providers={providers}
						accreditedProviders={accreditedProviders}
						onBackClick={() => backPage(1)}
						onNextClick={() => nextPage(3)}
					/>
				</ScheduleTimelinePage>

				<ScheduleTimelinePage
					label={translations['pt-br'].bookingFlow.dateStepLabel}
					title={translations['pt-br'].bookingFlow.dateStepTitle}
					description={translations['pt-br'].bookingFlow.dateStepSubtitle}>
					<Step4
						date={date}
						onBackClick={() => backPage(2)}
						onNextClick={() => nextPage(4)}
					/>
				</ScheduleTimelinePage>

				<ScheduleTimelinePage label={translations['pt-br'].bookingFlow.timeStepLabel}>
					<Step5
						time={time}
						onBackClick={() => backPage(3)}
						onNextClick={() => nextPage(5)}
					/>
				</ScheduleTimelinePage>
				<ScheduleTimelinePage
					label={translations['pt-br'].bookingFlow.concludeStepLabel}
					title={translations['pt-br'].bookingFlow.concludeStepTitle}
					description="">
					<Step6 schedule={book} reschedule={rebook} onBackClick={() => backPage(4)} />
				</ScheduleTimelinePage>
			</ScheduleTimeline>
		</>
	);
};

import React, {useEffect, useState} from 'react';
import {useResetRecoilState} from 'recoil';
import {healthBookingStates} from 'presentation/pages/states/atoms';
import {
	GetMedicalStates,
	GetMedicalCities,
	GetMedicalDates,
	GetMedicalSpecialists,
	PostMedicalCreateAppointment,
	GetMedicalClinics,
	GetMedicalSpecialties,
	GetMedicalAppointments,
	PutMedicalRescheduleAppointment,
	GetBeneficiaryContacts,
} from 'domain/usecases';
import {translations} from 'presentation/translations';
import {ScheduleTimeline, ScheduleTimelinePage} from 'presentation/components/schedule-timeline';
import {Step1, Step2, Step3, Step4, Step5, Step6, Step7} from './components';
import * as S from './styles';

type Props = {
	date: GetMedicalDates;
	time: GetMedicalSpecialists;
	states: GetMedicalStates;
	cities: GetMedicalCities;
	booked: GetMedicalAppointments;
	rebooking: PutMedicalRescheduleAppointment;
	providers: GetMedicalClinics;
	contacts: GetBeneficiaryContacts;
	confirm: PostMedicalCreateAppointment;
	specialties: GetMedicalSpecialties;
};

export const MedicalBooking: React.FC<Props> = ({
	date,
	time,
	states,
	cities,
	booked,
	confirm,
	contacts,
	providers,
	rebooking,
	specialties,
}: Props) => {
	const [currentPage, setCurrentPage] = useState(0);

	const resetState = useResetRecoilState(healthBookingStates);

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
			<S.MainTitle>{translations['pt-br'].bookingFlow.titlePageHealth}</S.MainTitle>

			<ScheduleTimeline
				currentPage={currentPage}
				onHeaderClick={index => setCurrentPage(index)}>
				<ScheduleTimelinePage
					label={translations['pt-br'].bookingFlow.beneficiaryStepLabel}>
					<Step1 contacts={contacts} onNextClick={() => nextPage(1)} />
				</ScheduleTimelinePage>
				<ScheduleTimelinePage
					label={translations['pt-br'].bookingFlow.locationStepLabel}
					title={translations['pt-br'].bookingFlow.locationStepTitle}
					description={translations['pt-br'].bookingFlow.locationStepSubtitle}>
					<Step2
						states={states}
						cities={cities}
						onBackClick={() => backPage(0)}
						onNextClick={() => nextPage(2)}
					/>
				</ScheduleTimelinePage>
				<ScheduleTimelinePage label={translations['pt-br'].bookingFlow.specialtyStepLabel}>
					<Step3
						specialties={specialties}
						booked={booked}
						onBackClick={() => backPage(1)}
						onNextClick={() => nextPage(3)}
					/>
				</ScheduleTimelinePage>
				<ScheduleTimelinePage
					label={translations['pt-br'].bookingFlow.providerStepLabel}
					title={translations['pt-br'].bookingFlow.providerStepTitle}
					description={translations['pt-br'].bookingFlow.providerStepSubtitle}>
					<Step4
						providers={providers}
						onBackClick={() => backPage(2)}
						onNextClick={() => nextPage(4)}
					/>
				</ScheduleTimelinePage>
				<ScheduleTimelinePage
					label={translations['pt-br'].bookingFlow.dateStepLabel}
					title={translations['pt-br'].bookingFlow.dateStepTitle}
					description={translations['pt-br'].bookingFlow.dateStepSubtitle}>
					<Step5
						date={date}
						onBackClick={() => backPage(3)}
						onNextClick={() => nextPage(5)}
					/>
				</ScheduleTimelinePage>
				<ScheduleTimelinePage label={translations['pt-br'].bookingFlow.timeStepLabel}>
					<Step6
						time={time}
						onBackClick={() => backPage(4)}
						onNextClick={() => nextPage(6)}
					/>
				</ScheduleTimelinePage>
				<ScheduleTimelinePage
					label={translations['pt-br'].bookingFlow.concludeStepLabel}
					title={translations['pt-br'].bookingFlow.concludeStepTitle}
					description="">
					<Step7
						booking={confirm}
						reschedule={rebooking}
						onBackClick={() => backPage(5)}
					/>
				</ScheduleTimelinePage>
			</ScheduleTimeline>
		</>
	);
};

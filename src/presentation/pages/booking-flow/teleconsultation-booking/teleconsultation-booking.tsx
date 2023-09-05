import React, {useEffect, useState} from 'react';
import {useResetRecoilState} from 'recoil';
import {telehealthBookingStates} from 'presentation/pages/states/atoms';
import {
	GetMedicalBooked,
	PostMedicalRebook,
	GetTelehealthDates,
	GetTelehealthTimes,
	PostTelehealthBooking,
	GetTelehealthProviders,
	GetTelehealthSpecialties,
	GetBeneficiaryContacts,
	GetMedicalExternalUrl,
} from 'domain/usecases';
import {translations} from 'presentation/translations';
import {ScheduleTimeline, ScheduleTimelinePage} from 'presentation/components/schedule-timeline';
import {Step1, Step2, Step3, Step4, Step5} from './components';
import * as S from './styles';

type Props = {
	booked: GetMedicalBooked;
	date: GetTelehealthDates;
	time: GetTelehealthTimes;
	rebook: PostMedicalRebook;
	book: PostTelehealthBooking;
	contacts: GetBeneficiaryContacts;
	providers: GetTelehealthProviders;
	specialties: GetTelehealthSpecialties;
	externalUrl: GetMedicalExternalUrl;
};

export const TeleconsultationBooking: React.FC<Props> = ({
	date,
	time,
	book,
	rebook,
	booked,
	contacts,
	providers,
	specialties,
	externalUrl,
}: Props) => {
	const [currentPage, setCurrentPage] = useState(0);

	const resetState = useResetRecoilState(telehealthBookingStates);

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
			<S.MainTitle>{translations['pt-br'].bookingFlow.titlePageTelemedicine}</S.MainTitle>
			<ScheduleTimeline
				currentPage={currentPage}
				onHeaderClick={index => setCurrentPage(index)}>
				<ScheduleTimelinePage
					label={translations['pt-br'].bookingFlow.beneficiaryStepLabel}>
					<Step1 contacts={contacts} onNextClick={() => nextPage(1)} />
				</ScheduleTimelinePage>
				<ScheduleTimelinePage label={translations['pt-br'].bookingFlow.specialtyStepLabel}>
					<Step2
						booked={booked}
						providers={providers}
						specialties={specialties}
						onBackClick={() => backPage(0)}
						onNextClick={() => nextPage(2)}
						externalUrl={externalUrl}
					/>
				</ScheduleTimelinePage>
				<ScheduleTimelinePage
					label={translations['pt-br'].bookingFlow.dateStepLabel}
					title={translations['pt-br'].bookingFlow.dateStepTitle}
					description={translations['pt-br'].bookingFlow.dateStepSubtitle}>
					<Step3
						date={date}
						onBackClick={() => backPage(1)}
						onNextClick={() => nextPage(3)}
					/>
				</ScheduleTimelinePage>
				<ScheduleTimelinePage label={translations['pt-br'].bookingFlow.timeStepLabel}>
					<Step4
						time={time}
						onBackClick={() => backPage(2)}
						onNextClick={() => nextPage(4)}
					/>
				</ScheduleTimelinePage>
				<ScheduleTimelinePage
					label={translations['pt-br'].bookingFlow.concludeStepLabel}
					title={translations['pt-br'].bookingFlow.concludeStepTitle}
					description="">
					<Step5 booking={book} reschedule={rebook} onBackClick={() => backPage(3)} />
				</ScheduleTimelinePage>
			</ScheduleTimeline>
		</>
	);
};

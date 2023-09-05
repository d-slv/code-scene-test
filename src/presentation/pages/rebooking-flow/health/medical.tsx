import React, {useState} from 'react';
import {
	GetMedicalDates,
	GetMedicalClinics,
	GetMedicalSpecialists,
	PutMedicalRescheduleAppointment,
} from 'domain/usecases';
import {translations} from 'presentation/translations';
import {ScheduleTimeline, ScheduleTimelinePage} from 'presentation/components/schedule-timeline';
import {Step1, Step2, Step3, Step4} from './components';
import * as S from './styles';

type Props = {
	providers: GetMedicalClinics;
	date: GetMedicalDates;
	time: GetMedicalSpecialists;
	rebooking: PutMedicalRescheduleAppointment;
};

export const MedicalMarkdown: React.FC<Props> = ({date, time, rebooking, providers}: Props) => {
	const [currentPage, setCurrentPage] = useState(0);

	function nextPage(n: number) {
		setCurrentPage(n);
	}

	function backPage(n: number) {
		setCurrentPage(n);
	}

	return (
		<>
			<S.MainTitle>{translations['pt-br'].bookingFlow.titlePageReplaceHealth}</S.MainTitle>
			<ScheduleTimeline
				currentPage={currentPage}
				onHeaderClick={index => setCurrentPage(index)}>
				<ScheduleTimelinePage
					label={translations['pt-br'].bookingFlow.providerStepLabel}
					title={translations['pt-br'].bookingFlow.providerStepTitle}
					description={translations['pt-br'].bookingFlow.providerStepSubtitle}>
					<Step1 onNextClick={() => nextPage(1)} providers={providers} />
				</ScheduleTimelinePage>
				<ScheduleTimelinePage
					label={translations['pt-br'].bookingFlow.dateStepLabel}
					title={translations['pt-br'].bookingFlow.dateStepTitle}
					description={translations['pt-br'].bookingFlow.dateStepSubtitle}>
					<Step2
						date={date}
						onBackClick={() => backPage(0)}
						onNextClick={() => nextPage(2)}
					/>
				</ScheduleTimelinePage>
				<ScheduleTimelinePage label={translations['pt-br'].bookingFlow.timeStepLabel}>
					<Step3
						time={time}
						onBackClick={() => backPage(1)}
						onNextClick={() => nextPage(3)}
					/>
				</ScheduleTimelinePage>
				<ScheduleTimelinePage
					label={translations['pt-br'].bookingFlow.concludeStepLabel}
					title={translations['pt-br'].bookingFlow.concludeStepTitle}
					description="">
					<Step4 rebooking={rebooking} onBackClick={() => backPage(2)} />
				</ScheduleTimelinePage>
			</ScheduleTimeline>
		</>
	);
};

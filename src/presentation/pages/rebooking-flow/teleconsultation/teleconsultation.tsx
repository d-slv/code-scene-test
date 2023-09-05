import React, {useState} from 'react';
import {GetTelehealthDates, GetTelehealthTimes, PostMedicalRebook} from 'domain/usecases';
import {translations} from 'presentation/translations';
import {ScheduleTimeline, ScheduleTimelinePage} from 'presentation/components/schedule-timeline';
import {Step1, Step2, Step3} from './components';
import * as S from './styles';

type Props = {
	date: GetTelehealthDates;
	time: GetTelehealthTimes;
	rebooking: PostMedicalRebook;
};

export const TeleconsultationMarkdown: React.FC<Props> = ({date, time, rebooking}: Props) => {
	const [currentPage, setCurrentPage] = useState(0);

	function nextPage(n: number) {
		setCurrentPage(n);
	}

	function backPage(n: number) {
		setCurrentPage(n);
	}

	return (
		<>
			<S.MainTitle>
				{translations['pt-br'].bookingFlow.titlePageReplaceTelemedicine}
			</S.MainTitle>

			<ScheduleTimeline
				currentPage={currentPage}
				onHeaderClick={index => setCurrentPage(index)}>
				<ScheduleTimelinePage
					label={translations['pt-br'].bookingFlow.dateStepLabel}
					title={translations['pt-br'].bookingFlow.dateStepTitle}
					description={translations['pt-br'].bookingFlow.dateStepSubtitle}>
					<Step1 date={date} onNextClick={() => nextPage(1)} />
				</ScheduleTimelinePage>
				<ScheduleTimelinePage label={translations['pt-br'].bookingFlow.timeStepLabel}>
					<Step2
						time={time}
						onBackClick={() => backPage(1)}
						onNextClick={() => nextPage(2)}
					/>
				</ScheduleTimelinePage>
				<ScheduleTimelinePage
					label={translations['pt-br'].bookingFlow.concludeStepLabel}
					title={translations['pt-br'].bookingFlow.concludeStepTitle}
					description="">
					<Step3 rebooking={rebooking} onBackClick={() => backPage(2)} />
				</ScheduleTimelinePage>
			</ScheduleTimeline>
		</>
	);
};

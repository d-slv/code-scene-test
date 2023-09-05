import React, {Suspense, useEffect} from 'react';
import {useRecoilState, useResetRecoilState} from 'recoil';

import {PostExamsRebook} from 'domain/usecases';
import {translations} from 'presentation/translations';
import {ScheduleTimeline, ScheduleTimelinePage} from 'presentation/components/schedule-timeline';
import {bookingTabIndexState} from 'presentation/pages/booking-flow/atoms';
import {Loading} from 'presentation/components/loading';
import {Step1, Step2, Step3, Step4} from './components';
import {MainTitle} from './styles';

type Props = {
	rebooking: PostExamsRebook;
};

export const ExamMarkdown: React.FC<Props> = ({rebooking}: Props) => {
	const [currentPage, setCurrentPage] = useRecoilState(bookingTabIndexState('exam'));

	const resetTabIndex = useResetRecoilState(bookingTabIndexState('exam'));

	useEffect(() => {
		resetTabIndex();
	}, []);

	function nextPage() {
		setCurrentPage(value => value + 1);
	}

	function backPage() {
		setCurrentPage(value => value - 1);
	}

	return (
		<>
			<MainTitle>{translations['pt-br'].bookingFlow.titlePageReplaceExam}</MainTitle>

			<ScheduleTimeline
				currentPage={currentPage}
				onHeaderClick={index => setCurrentPage(index)}>
				<ScheduleTimelinePage
					label={translations['pt-br'].bookingFlow.providerStepLabel}
					title={translations['pt-br'].bookingFlow.providerStepTitle}
					description={translations['pt-br'].bookingFlow.providerStepSubtitle}>
					<Suspense
						fallback={<Loading customMsg="Carregando..." style={{minHeight: 350}} />}>
						<Step1 onNextClick={nextPage} />
					</Suspense>
				</ScheduleTimelinePage>

				<ScheduleTimelinePage
					label={translations['pt-br'].bookingFlow.dateStepLabel}
					title={translations['pt-br'].bookingFlow.dateStepTitle}
					description={translations['pt-br'].bookingFlow.dateStepSubtitle}>
					<Suspense
						fallback={<Loading customMsg="Carregando..." style={{minHeight: 350}} />}>
						<Step2 onBackClick={backPage} onNextClick={nextPage} />
					</Suspense>
				</ScheduleTimelinePage>

				<ScheduleTimelinePage label={translations['pt-br'].bookingFlow.timeStepLabel}>
					<Suspense
						fallback={<Loading customMsg="Carregando..." style={{minHeight: 350}} />}>
						<Step3 onBackClick={backPage} onNextClick={nextPage} />
					</Suspense>
				</ScheduleTimelinePage>

				<ScheduleTimelinePage
					label={translations['pt-br'].bookingFlow.concludeStepLabel}
					title={translations['pt-br'].bookingFlow.concludeStepTitleExam}
					description="">
					<Suspense
						fallback={<Loading customMsg="Carregando..." style={{minHeight: 350}} />}>
						<Step4 rebooking={rebooking} onBackClick={backPage} />
					</Suspense>
				</ScheduleTimelinePage>
			</ScheduleTimeline>
		</>
	);
};

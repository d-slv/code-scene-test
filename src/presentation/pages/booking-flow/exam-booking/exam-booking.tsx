import React, {Suspense, useEffect} from 'react';
import {useRecoilState, useResetRecoilState} from 'recoil';

import {
	PostExamsRebook,
	PostExamsConfirm,
	GetExamsAuthorizedPassword,
	GetExamsAuthorizedPrePassword,
} from 'domain/usecases';
import {translations} from 'presentation/translations';
import {ScheduleTimeline, ScheduleTimelinePage} from 'presentation/components/schedule-timeline';
import {Loading} from 'presentation/components/loading';
import {Step1, Step2, Step3, Step4, Step5, Step6} from './components';
import {bookingTabIndexState, selectedCityState, selectedUfState} from '../atoms';
import {MainTitle} from './styles';
import {examBookingState} from './atoms';

type Props = {
	booking: PostExamsConfirm;
	rebooking: PostExamsRebook;
	authorizedPassword: GetExamsAuthorizedPassword;
	authorizedPrePassword: GetExamsAuthorizedPrePassword;
};

export const ExamBooking: React.FC<Props> = ({
	booking,
	rebooking,
	authorizedPassword,
	authorizedPrePassword,
}: Props) => {
	const [currentPage, setCurrentPage] = useRecoilState(bookingTabIndexState('exam'));

	const resetTabIndex = useResetRecoilState(bookingTabIndexState('exam'));
	const resetUf = useResetRecoilState(selectedUfState('exam'));
	const resetCity = useResetRecoilState(selectedCityState('exam'));
	const resetBookingState = useResetRecoilState(examBookingState);

	useEffect(() => {
		resetTabIndex();
		resetBookingState();
		resetCity();
		resetUf();
	}, []);

	function nextPage() {
		setCurrentPage(value => value + 1);
	}

	function backPage() {
		setCurrentPage(value => value - 1);
	}

	return (
		<>
			<MainTitle>{translations['pt-br'].bookingFlow.titlePageExam}</MainTitle>

			<ScheduleTimeline
				currentPage={currentPage}
				onHeaderClick={index => setCurrentPage(index)}>
				<ScheduleTimelinePage label={translations['pt-br'].bookingFlow.locationStepLabel}>
					<Suspense
						fallback={<Loading customMsg="Carregando..." style={{minHeight: 350}} />}>
						<Step1 onNextClick={nextPage} />
					</Suspense>
				</ScheduleTimelinePage>

				<ScheduleTimelinePage
					label={translations['pt-br'].bookingFlow.specialtyStepLabelExam}>
					<Suspense
						fallback={<Loading customMsg="Carregando..." style={{minHeight: 350}} />}>
						<Step2
							onBackClick={backPage}
							onNextClick={nextPage}
							authorizedPassword={authorizedPassword}
							authorizedPrePassword={authorizedPrePassword}
						/>
					</Suspense>
				</ScheduleTimelinePage>

				<ScheduleTimelinePage
					label={translations['pt-br'].bookingFlow.providerStepLabel}
					title={translations['pt-br'].bookingFlow.providerStepTitle}
					description={translations['pt-br'].bookingFlow.providerStepSubtitle}>
					<Suspense
						fallback={<Loading customMsg="Carregando..." style={{minHeight: 350}} />}>
						<Step3 onBackClick={backPage} onNextClick={nextPage} />
					</Suspense>
				</ScheduleTimelinePage>

				<ScheduleTimelinePage
					label={translations['pt-br'].bookingFlow.dateStepLabel}
					title={translations['pt-br'].bookingFlow.dateStepTitle}
					description={translations['pt-br'].bookingFlow.dateStepSubtitle}>
					<Suspense
						fallback={<Loading customMsg="Carregando..." style={{minHeight: 350}} />}>
						<Step4 onBackClick={backPage} onNextClick={nextPage} />
					</Suspense>
				</ScheduleTimelinePage>

				<ScheduleTimelinePage label={translations['pt-br'].bookingFlow.timeStepLabel}>
					<Suspense
						fallback={<Loading customMsg="Carregando..." style={{minHeight: 350}} />}>
						<Step5 onBackClick={backPage} onNextClick={nextPage} />
					</Suspense>
				</ScheduleTimelinePage>

				<ScheduleTimelinePage
					label={translations['pt-br'].bookingFlow.concludeStepLabel}
					title={translations['pt-br'].bookingFlow.concludeStepTitleExam}
					description="">
					<Suspense
						fallback={<Loading customMsg="Carregando..." style={{minHeight: 350}} />}>
						<Step6 booking={booking} rebooking={rebooking} onBackClick={backPage} />
					</Suspense>
				</ScheduleTimelinePage>
			</ScheduleTimeline>
		</>
	);
};

import React, {useEffect} from 'react';
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';

import {translations} from 'presentation/translations';
import {Calendar} from 'presentation/components/calendar';
import {CardUnavailable} from 'presentation/components/card-unavailable/card-unavailable';
import {RoomTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {
	examBookingState,
	selectedExamDateState,
	examsDatesState,
} from 'presentation/pages/booking-flow/exam-booking/atoms';
import {FooterNavigation} from '../FooterNavigation';

interface Step2Props {
	onNextClick: () => void;
	onBackClick: () => void;
}

export const Step2: React.FC<Step2Props> = ({onBackClick, onNextClick}) => {
	const [examBooking, setExamBooking] = useRecoilState(examBookingState);
	const [selectedDate, setSelectedDate] = useRecoilState(selectedExamDateState);

	const dates = useRecoilValue(examsDatesState);
	const resetSelectedDate = useResetRecoilState(selectedExamDateState);

	const failedToLoad = dates.length === 0;

	function handleBackClick() {
		setExamBooking({
			...examBooking,
			cdPrestadorJuridico: undefined,
			nmPrestadorJuridicoAux: '',
			nmLogradouro: '',
			cdNumero: undefined,
			nmBairro: '',
		});
		onBackClick();
	}

	function handleNextClick() {
		setExamBooking({
			...examBooking,
			dtData: selectedDate,
		});
		onNextClick();
	}

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepDateExamReschedule;
		resetSelectedDate();
	}, []);

	return (
		<>
			{failedToLoad ? (
				<CardUnavailable
					type={'date'}
					roomType={RoomTypeEnum.EXAM}
					onBackClick={onBackClick}
					user={examBooking.nmUsuario}
				/>
			) : (
				<>
					<Calendar onChange={value => setSelectedDate(value)} availableDays={dates} />
					<FooterNavigation
						disabled={!selectedDate}
						handleNextClick={handleNextClick}
						handleBackClick={handleBackClick}
					/>
				</>
			)}
		</>
	);
};

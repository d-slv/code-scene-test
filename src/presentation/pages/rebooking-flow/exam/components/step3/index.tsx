import React, {useEffect} from 'react';
import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from 'recoil';

import {formatText} from 'presentation/utils';
import {translations} from 'presentation/translations';
import {Accordion} from 'presentation/components/accordion';
import {ShiftButton} from 'presentation/components/shift-buttons';

import {CardUnavailable} from 'presentation/components/card-unavailable/card-unavailable';
import {RoomTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {
	examBookingState,
	selectedExamTimeState,
	selectedExamHourState,
	selectedExamShiftState,
	examAvailableTimeState,
} from 'presentation/pages/booking-flow/exam-booking/atoms';
import {formatAddress} from 'presentation/components/ticket/ticket-utils';
import {FooterNavigation} from '../FooterNavigation';
import {
	CardStepPageDescription,
	CardStepPageTitle,
	ConsultationAddress,
	ConsultationPlace,
	ContainerPlaceAppointment,
	HeaderContainer,
	HeaderWrapper,
} from './styles';

interface Step3Props {
	onNextClick: () => void;
	onBackClick: () => void;
}

export const Step3: React.FC<Step3Props> = ({onBackClick, onNextClick}) => {
	const [examBooking, setExamBooking] = useRecoilState(examBookingState);
	const [selectedTime, setSelectedTime] = useRecoilState(selectedExamTimeState);
	const [selectedHour, setSelectedHour] = useRecoilState(selectedExamHourState);

	const setSelectedShift = useSetRecoilState(selectedExamShiftState);

	const availableTime = useRecoilValue(examAvailableTimeState);
	const parsedTime = availableTime.map(item => ({
		provider: item.nmPrestadorFisico,
		cdProviders: String(item.cdPrestadorFisico),
		horarios: item.horariosDisponiveis,
	}));

	const resetShift = useResetRecoilState(selectedExamShiftState);
	const resetSelectTime = useResetRecoilState(selectedExamTimeState);
	const resetSelectHour = useResetRecoilState(selectedExamHourState);

	const failedToLoad = availableTime.length === 0;

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepTimeExamReschedule;
		resetShift();
		resetSelectTime();
		resetSelectHour();
	}, []);

	function handleBackClick() {
		setExamBooking({
			...examBooking,
			dtData: '',
		});
		onBackClick();
	}

	function handleNextClick() {
		setExamBooking({
			...examBooking,
			nmPrestadorFisico: selectedTime.provider,
			cdPrestadorFisico: Number(selectedTime.cdProviders),
			horarioAgendamento: selectedHour.horarioAgendamento,
		});
		onNextClick();
	}

	function cleanBooking() {
		resetSelectTime();
		resetSelectHour();
	}

	return (
		<>
			<HeaderContainer>
				<HeaderWrapper>
					<CardStepPageTitle>
						{translations['pt-br'].bookingFlow.stepHourTitle} {examBooking.dsTipoExame}{' '}
						{translations['pt-br'].bookingFlow.stepHourTitleContinue}{' '}
						{examBooking.dtData}
					</CardStepPageTitle>
					<CardStepPageDescription>
						{translations['pt-br'].bookingFlow.timeStepSubtitleExam}
					</CardStepPageDescription>
				</HeaderWrapper>
				<ShiftButton onChange={setSelectedShift} />
			</HeaderContainer>

			<ContainerPlaceAppointment>
				<ConsultationPlace>
					{formatText(examBooking.nmPrestadorJuridicoAux)}
				</ConsultationPlace>
				<ConsultationAddress>
					{formatAddress({
						address: examBooking.nmLogradouro,
						number: examBooking.cdNumero,
						district: examBooking.nmBairro,
						city: examBooking.nmCidade,
						state: examBooking.cdUf,
					})}
				</ConsultationAddress>
			</ContainerPlaceAppointment>

			{failedToLoad ? (
				<CardUnavailable
					type="hour"
					roomType={RoomTypeEnum.EXAM}
					onBackClick={onBackClick}
					user={examBooking.nmUsuario}
				/>
			) : (
				<>
					<Accordion
						data={parsedTime}
						onClick={setSelectedTime}
						setBooking={setSelectedHour}
						cleanBooking={cleanBooking}
					/>
					<FooterNavigation
						disabled={!selectedHour}
						backButtonText={translations['pt-br'].bookingFlow.buttonReturnCalendar}
						handleBackClick={handleBackClick}
						handleNextClick={handleNextClick}
					/>
				</>
			)}
		</>
	);
};

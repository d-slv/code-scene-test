import React, {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {MdOutlineArrowBack} from 'react-icons/md';
import {GetTelehealthDates} from 'domain/usecases';
import {translations} from 'presentation/translations';
import {Calendar} from 'presentation/components/calendar';
import {ButtonsFailure} from 'presentation/components/failure-to-load';
import {telehealthBookingStates} from 'presentation/pages/states/atoms';
import {CardUnavailable} from 'presentation/components/card-unavailable/card-unavailable';
import {RoomTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {Loading} from 'presentation/components/loading';
import * as S from './styles';

interface Step3Props {
	onNextClick: () => void;
	onBackClick: () => void;
	date: GetTelehealthDates;
}

export const Step3: React.FC<Step3Props> = ({date, onNextClick, onBackClick}) => {
	const [datas, setDatas] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [showError, setShowError] = useState(false);
	const [telehealthBooking, setTelehealthBooking] = useRecoilState(telehealthBookingStates);

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepDate;
		date.get({
			especialidade: telehealthBooking.cdEspecialidade,
			subEspecialidade: telehealthBooking.cdSubEspecialidadeAux,
			prestadorJuridico: telehealthBooking.cdPrestadorJuridico,
		})
			.then(data => {
				setDatas(data);
			})
			.catch(() => {
				setIsLoading(false);
				setShowError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	const footerButtons = () => (
		<>
			<S.FooterCardButtons>
				<S.ButtonScheduleHealth
					onClick={() => {
						onBackClick();
						setTelehealthBooking({
							...telehealthBooking,
							cdEspecialidade: '',
						});
					}}
					fontSize={'xxs'}
					variant="outlined"
					leftIcon={<MdOutlineArrowBack />}>
					{translations['pt-br'].bookingFlow.buttonPrev}
				</S.ButtonScheduleHealth>
				{!showError ? (
					<S.ButtonScheduleHealth
						color="primary"
						fontSize={'xxs'}
						variant="contained"
						onClick={() => onNextClick()}
						disabled={!telehealthBooking.dtConsulta}>
						{translations['pt-br'].bookingFlow.buttonNext}
					</S.ButtonScheduleHealth>
				) : (
					<ButtonsFailure />
				)}
			</S.FooterCardButtons>
		</>
	);

	return (
		<>
			{isLoading ? (
				<Loading style={{minHeight: 300}} />
			) : (
				<>
					{showError ? (
						<>
							<CardUnavailable
								type={'date'}
								roomType={RoomTypeEnum.HEALTH}
								isTelemedicine={true}
								onBackClick={onBackClick}
								user={telehealthBooking.nmUsuarioAux}
							/>
						</>
					) : (
						<>
							<Calendar
								onChange={value =>
									setTelehealthBooking({
										...telehealthBooking,
										dtConsulta: value,
									})
								}
								availableDays={datas}
							/>
							{footerButtons()}
						</>
					)}
				</>
			)}
		</>
	);
};

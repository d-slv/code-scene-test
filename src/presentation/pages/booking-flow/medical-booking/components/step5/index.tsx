import React, {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {GetMedicalDates} from 'domain/usecases';
import {MdOutlineArrowBack} from 'react-icons/md';
import {translations} from 'presentation/translations';
import {Calendar} from 'presentation/components/calendar';
import {healthBookingStates} from 'presentation/pages/states/atoms';
import {ButtonsFailure, FailureToLoad} from 'presentation/components/failure-to-load';
import {CardUnavailable} from 'presentation/components/card-unavailable/card-unavailable';
import {RoomTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {Loading} from 'presentation/components/loading';
import * as S from './styles';

interface Step5Props {
	onNextClick: () => void;
	onBackClick: () => void;
	date: GetMedicalDates;
}

export const Step5: React.FC<Step5Props> = ({date, onBackClick, onNextClick}) => {
	const [dates, setDatas] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [showError, setShowError] = useState(false);
	const [healthBooking, setHealthBooking] = useRecoilState(healthBookingStates);

	useEffect(() => {
		setIsLoading(true);
		date.get({
			specialty_code: healthBooking.cdEspecialidade,
			clinic_code: healthBooking.cdPrestadorJuridico,
		})
			.then(data => {
				setDatas(data.content);
			})
			.catch(error => {
				if (error.message.statusCode === 204) {
					setIsLoading(false);
				} else {
					setIsLoading(false);
					setShowError(true);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	const footerButtons = () => (
		<>
			<S.FooterCardButtons>
				<S.ButtonScheduleHealth
					fontSize={'xxs'}
					variant="outlined"
					onClick={() => {
						onBackClick();
						setHealthBooking({
							...healthBooking,
							cdPrestadorJuridico: '',
						});
					}}
					leftIcon={<MdOutlineArrowBack />}>
					{translations['pt-br'].bookingFlow.buttonPrev}
				</S.ButtonScheduleHealth>
				{!showError ? (
					<S.ButtonScheduleHealth
						color="primary"
						fontSize={'xxs'}
						variant="contained"
						onClick={() => onNextClick()}
						disabled={!healthBooking.dtConsulta}>
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
					{(() => {
						switch (true) {
							case dates.length === 0 && !showError: {
								return (
									<>
										<CardUnavailable
											type={'date'}
											roomType={RoomTypeEnum.HEALTH}
											onBackClick={onBackClick}
											user={healthBooking.nmUsuarioAux}
										/>
									</>
								);
							}
							case showError: {
								return (
									<>
										<FailureToLoad /> {footerButtons()}
									</>
								);
							}
							default: {
								return (
									<>
										<Calendar
											onChange={value =>
												setHealthBooking({
													...healthBooking,
													dtConsulta: value,
												})
											}
											availableDays={dates}
										/>
										{footerButtons()}
									</>
								);
							}
						}
					})()}
				</>
			)}
		</>
	);
};

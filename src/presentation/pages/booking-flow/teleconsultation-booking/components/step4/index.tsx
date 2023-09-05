/* eslint-disable consistent-return */
import React, {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {formatText} from 'presentation/utils';
import {MdOutlineArrowBack} from 'react-icons/md';
import {GetTelehealthTimes} from 'domain/usecases';
import {translations} from 'presentation/translations';
import {Accordion} from 'presentation/components/accordion';
import {ShiftButton} from 'presentation/components/shift-buttons';
import {telehealthBookingStates} from 'presentation/pages/states/atoms';
import {ButtonsFailure, FailureToLoad} from 'presentation/components/failure-to-load';
import {CardUnavailable} from 'presentation/components/card-unavailable/card-unavailable';
import {RoomTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {Loading} from 'presentation/components/loading';
import * as S from './styles';

interface Step4Props {
	onNextClick: () => void;
	onBackClick: () => void;
	time: GetTelehealthTimes;
}

export const Step4: React.FC<Step4Props> = ({time, onNextClick, onBackClick}: Step4Props) => {
	let dataAux = [];
	const [turno, setTurno] = useState('');
	const [horarios, setHorarios] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [showError, setShowError] = useState(false);
	const [telehealthBooking, setTelehealthBooking] = useRecoilState(telehealthBookingStates);

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepTime;
	}, []);

	const getTimes = value => {
		time.get({
			filtroTurno: value,
			dataConsulta: telehealthBooking.dtConsulta,
			especialidade: telehealthBooking.cdEspecialidade,
			prestadorJuridico: telehealthBooking.cdPrestadorJuridico,
			subEspecialidade: telehealthBooking.cdSubEspecialidadeAux,
		})
			.then(data => {
				data.horariosPrestadores.forEach(o =>
					dataAux.push({
						provider: o.nmPrestadorFisico,
						cdProviders: o.cdPrestadorFisico,
						horarios: o.horariosDisponiveis,
					}),
				);
			})
			.catch(error => {
				if (error.message.statusCode === 204) {
					setHorarios([]);
					setIsLoading(false);
				} else {
					setShowError(true);
					setIsLoading(false);
				}
			})
			.finally(() => {
				setIsLoading(false);
				dataAux = dataAux.sort();
				setHorarios(dataAux);
			});
	};

	const trocaTurno = value => {
		if (turno !== value) {
			setIsLoading(true);
			setHorarios([]);
			setTurno(value);
		}
	};

	useEffect(() => {
		getTimes(turno);
	}, [turno]);

	const setBooking = value => {
		setTelehealthBooking({
			...telehealthBooking,
			nmPrestadorFisicoAux: value.nmPrestadorFisico,
			cdPrestadorFisico: value.cdPrestadorFisico,
			horarioConsulta: value.horarioAgendamento,
		});
	};

	function cleanBooking() {
		setTelehealthBooking({
			...telehealthBooking,
			horarioConsulta: '',
			nmPrestadorFisicoAux: '',
			cdPrestadorFisico: '',
		});
	}

	const footerButtons = () => (
		<>
			<S.FooterCardButtons>
				<S.ButtonScheduleHealth
					onClick={() => {
						onBackClick();
						setTelehealthBooking({
							...telehealthBooking,
							dtConsulta: '',
						});
					}}
					fontSize={'xxs'}
					variant="outlined"
					leftIcon={<MdOutlineArrowBack />}>
					{translations['pt-br'].bookingFlow.buttonReturnCalendar}
				</S.ButtonScheduleHealth>
				{!showError ? (
					<S.ButtonScheduleHealth
						color="primary"
						fontSize={'xxs'}
						variant="contained"
						onClick={() => onNextClick()}
						disabled={!telehealthBooking.horarioConsulta}>
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
					<S.HeaderContainer>
						<div>
							<S.CardStepPageTile>
								{`Horarios para ${telehealthBooking.nmEspecialidadeAux} em ${telehealthBooking.dtConsulta}`}
							</S.CardStepPageTile>
							<S.CardStepPageDescription>
								{translations['pt-br'].bookingFlow.timeStepSubtitle}
							</S.CardStepPageDescription>
						</div>
						<ShiftButton onChange={value => trocaTurno(value)} />
					</S.HeaderContainer>

					<S.ContainerPlaceAppointment>
						<S.ConsultationPlace>
							{formatText(telehealthBooking.nmPrestadorJuridicoAux)}
						</S.ConsultationPlace>
					</S.ContainerPlaceAppointment>

					{horarios.length > 0 && !showError ? (
						<>
							<Accordion
								data={horarios}
								setBooking={setBooking}
								cleanBooking={cleanBooking}
							/>
							{footerButtons()}
						</>
					) : (
						<CardUnavailable
							type={'hour'}
							roomType={RoomTypeEnum.HEALTH}
							onBackClick={onBackClick}
							user={telehealthBooking.nmUsuarioAux}
						/>
					)}

					{showError && (
						<>
							<FailureToLoad /> {footerButtons()}
						</>
					)}
				</>
			)}
		</>
	);
};

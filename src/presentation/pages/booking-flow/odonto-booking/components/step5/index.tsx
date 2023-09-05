import React, {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {formatText} from 'presentation/utils';
import {GetOdontoTimes} from 'domain/usecases';
import {MdOutlineArrowBack} from 'react-icons/md';
import {translations} from 'presentation/translations';
import {Accordion} from 'presentation/components/accordion';
import {ShiftButton} from 'presentation/components/shift-buttons';
import {odontoBookingStates} from 'presentation/pages/states/atoms';
import {ButtonsFailure, FailureToLoad} from 'presentation/components/failure-to-load';
import {CardUnavailable} from 'presentation/components/card-unavailable/card-unavailable';
import {formatAddress} from 'presentation/components/ticket/ticket-utils';
import {RoomTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {Loading} from 'presentation/components/loading';
import * as S from './styles';

interface Step5Props {
	time: GetOdontoTimes;
	onNextClick: () => void;
	onBackClick: () => void;
}

export const Step5: React.FC<Step5Props> = ({time, onBackClick, onNextClick}) => {
	const dataAux = [];
	const [turno, setTurno] = useState('');
	const [horarios, setHorarios] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [showError, setShowError] = useState(false);
	const [odontoBooking, setOdontoBooking] = useRecoilState(odontoBookingStates);

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepTime;
	}, []);

	const getTimes = value => {
		time.get({
			filtroTurno: value,
			cdUf: odontoBooking.cdUfAux,
			nmCidade: odontoBooking.nmCidadeAux,
			dataConsulta: odontoBooking.dtConsulta,
			cdEspecialidade: odontoBooking.cdEspecialidade,
			cdSubEspecialidade: odontoBooking.cdSubEspecialidadeAux,
			cdPrestadorJuridico: odontoBooking.cdPrestadorJuridico,
			cdAtendimentoAcessoEspecial: odontoBooking.cdAtendimentoAcessoEspecialAux,
		})
			.then(data => {
				data.horariosDisponiveis.forEach(o =>
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
		setOdontoBooking({
			...odontoBooking,
			nmPrestadorFisicoAux: value.nmPrestadorFisico,
			cdPrestadorFisico: value.cdPrestadorFisico,
			horarioConsulta: value.horarioAgendamento,
		});
	};

	function cleanBooking() {
		setOdontoBooking({
			...odontoBooking,
			horarioConsulta: '',
			nmPrestadorFisicoAux: '',
			cdPrestadorFisico: '',
		});
	}

	const footerButtons = () => (
		<>
			<S.FooterCardButtons>
				<S.ButtonScheduleOdonto
					onClick={() => {
						onBackClick();
						setOdontoBooking({
							...odontoBooking,
							dtConsulta: '',
						});
					}}
					fontSize={'xxs'}
					variant="outlined"
					leftIcon={<MdOutlineArrowBack />}>
					{translations['pt-br'].bookingFlow.buttonReturnCalendar}
				</S.ButtonScheduleOdonto>
				{!showError ? (
					<S.ButtonScheduleOdonto
						color="primary"
						fontSize={'xxs'}
						variant="contained"
						onClick={() => onNextClick()}
						disabled={!odontoBooking.horarioConsulta}>
						{translations['pt-br'].bookingFlow.buttonNext}
					</S.ButtonScheduleOdonto>
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
								{`Horários para ${odontoBooking.nmEspecialidadeAux} em ${odontoBooking.dtConsulta}`}
							</S.CardStepPageTile>
							<S.CardStepPageDescription>
								{translations['pt-br'].bookingFlow.timeStepSubtitle}
							</S.CardStepPageDescription>
						</div>
						<ShiftButton onChange={value => trocaTurno(value)} />
					</S.HeaderContainer>

					<S.ContainerPlaceAppointment>
						<S.ConsultationPlace>
							{formatText(odontoBooking.nmPrestadorJuridicoAux)}
						</S.ConsultationPlace>
						<S.ConsultationAddress>
							{formatAddress({
								address: odontoBooking.nmLogradouro,
								district: odontoBooking.nmBairroAux,
								city: odontoBooking.nmCidadeAux,
							})}
						</S.ConsultationAddress>
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
							type={'odontoHour'}
							roomType={RoomTypeEnum.ODONTO}
							onBackClick={onBackClick}
							user={odontoBooking.nmUsuarioAux}
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

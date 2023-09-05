/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import React, {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {MdOutlineArrowBack} from 'react-icons/md';
import {GetTelehealthTimes} from 'domain/usecases';
import {translations} from 'presentation/translations';
import {Accordion} from 'presentation/components/accordion';
import {ShiftButton} from 'presentation/components/shift-buttons';
import {telehealthMarkdownStates} from 'presentation/pages/states/atoms';
import {ButtonsFailure, FailureToLoad} from 'presentation/components/failure-to-load';
import {CardUnavailable} from 'presentation/components/card-unavailable/card-unavailable';
import {RoomTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {Loading} from 'presentation/components/loading';
import * as S from './styles';

interface Step2Props {
	time: GetTelehealthTimes;
	onNextClick: () => void;
	onBackClick: () => void;
}

export const Step2: React.FC<Step2Props> = ({time, onNextClick, onBackClick}: Step2Props) => {
	let dataAux = [];
	const [turno, setTurno] = useState('');
	const [horarios, setHorarios] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [showError, setShowError] = useState(false);
	const [telehealthMarkdown, setTelehealthMarkdown] = useRecoilState(telehealthMarkdownStates);

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepTimeReschedule;
	}, []);

	const getTimes = value => {
		setIsLoading(true);
		time.get({
			filtroTurno: value,
			dataConsulta: telehealthMarkdown.dtConsulta,
			especialidade: telehealthMarkdown.cdEspecialidade,
			subEspecialidade: telehealthMarkdown.cdSubEspecialidadeAux,
			prestadorJuridico: telehealthMarkdown.cdPrestadorJuridico,
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
		setTelehealthMarkdown({
			...telehealthMarkdown,
			nmPrestadorFisicoAux: value.nmPrestadorFisico,
			cdPrestadorFisico: value.cdPrestadorFisico,
			horarioConsulta: value.horarioAgendamento,
		});
	};

	function cleanBooking() {
		setTelehealthMarkdown({
			...telehealthMarkdown,
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
						setTelehealthMarkdown({
							...telehealthMarkdown,
							dtConsulta: '',
						});
					}}
					fontSize={'xxs'}
					leftIcon={<MdOutlineArrowBack />}
					variant="outlined">
					{translations['pt-br'].bookingFlow.buttonReturnCalendar}
				</S.ButtonScheduleHealth>
				{!showError ? (
					<S.ButtonScheduleHealth
						color="primary"
						fontSize={'xxs'}
						variant="contained"
						onClick={() => onNextClick()}
						disabled={!telehealthMarkdown.horarioConsulta}>
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
								{`Horarios em ${telehealthMarkdown.nmEspecialidadeAux} de ${telehealthMarkdown.dtConsulta}`}
							</S.CardStepPageTile>
							<S.CardStepPageDescription>
								{translations['pt-br'].bookingFlow.timeStepSubtitle}
							</S.CardStepPageDescription>
						</div>
						<ShiftButton onChange={value => trocaTurno(value)} />
					</S.HeaderContainer>

					<S.ContainerPlaceAppointment>
						<S.ConsultationPlace>
							{telehealthMarkdown.nmPrestadorJuridicoAux}
						</S.ConsultationPlace>
						<S.ConsultationAddress>
							{telehealthMarkdown.enderecoAux}
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
							type={'hour'}
							roomType={RoomTypeEnum.HEALTH}
							onBackClick={onBackClick}
							user={telehealthMarkdown.nmUsuarioAux}
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

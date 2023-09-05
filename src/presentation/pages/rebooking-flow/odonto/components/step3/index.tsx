/* eslint-disable consistent-return */
import React, {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {GetOdontoTimes} from 'domain/usecases';
import {MdOutlineArrowBack} from 'react-icons/md';
import {translations} from 'presentation/translations';
import {Accordion} from 'presentation/components/accordion';
import {ShiftButton} from 'presentation/components/shift-buttons';
import {odontoMarkdownStates} from 'presentation/pages/states/atoms';
import {ButtonsFailure, FailureToLoad} from 'presentation/components/failure-to-load';
import {CardUnavailable} from 'presentation/components/card-unavailable/card-unavailable';
import {formatAddress} from 'presentation/components/ticket/ticket-utils';
import {RoomTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {Loading} from 'presentation/components/loading';
import * as S from './styles';

interface Step3Props {
	time: GetOdontoTimes;
	onNextClick: () => void;
	onBackClick: () => void;
}

export const Step3: React.FC<Step3Props> = ({time, onNextClick, onBackClick}) => {
	let dataAux = [];
	const [turno, setTurno] = useState('');
	const [horarios, setHorarios] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [showError, setShowError] = useState(false);
	const [odontoMarkdown, setOdontoMarkdown] = useRecoilState(odontoMarkdownStates);

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepTimeReschedule;
	}, []);

	const getTimes = value => {
		setIsLoading(true);
		time.get({
			filtroTurno: value,
			cdUf: odontoMarkdown.cdUfAux,
			nmCidade: odontoMarkdown.nmCidadeAux,
			dataConsulta: odontoMarkdown.dtConsulta,
			cdEspecialidade: odontoMarkdown.cdEspecialidade,
			cdSubEspecialidade: odontoMarkdown.cdSubEspecialidadeAux,
			cdPrestadorJuridico: odontoMarkdown.cdPrestadorJuridico,
			cdAtendimentoAcessoEspecial: odontoMarkdown.cdAtendimentoAcessoEspecialAux,
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
		setOdontoMarkdown({
			...odontoMarkdown,
			nmPrestadorFisicoAux: value.nmPrestadorFisico,
			cdPrestadorFisico: value.cdPrestadorFisico,
			horarioConsulta: value.horarioAgendamento,
		});
	};

	function cleanBooking() {
		setOdontoMarkdown({
			...odontoMarkdown,
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
						setOdontoMarkdown({
							...odontoMarkdown,
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
						disabled={!odontoMarkdown.horarioConsulta}>
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
								{`Horarios em ${odontoMarkdown.nmEspecialidadeAux} de ${odontoMarkdown.dtConsulta}`}
							</S.CardStepPageTile>
							<S.CardStepPageDescription>
								{translations['pt-br'].bookingFlow.timeStepSubtitle}
							</S.CardStepPageDescription>
						</div>
						<ShiftButton onChange={value => trocaTurno(value)} />
					</S.HeaderContainer>

					<S.ContainerPlaceAppointment>
						<S.ConsultationPlace>
							{odontoMarkdown.nmPrestadorJuridicoAux}
						</S.ConsultationPlace>
						<S.ConsultationAddress>
							{formatAddress({
								address: odontoMarkdown.nmLogradouro,
								district: odontoMarkdown.nmBairroAux,
								city: odontoMarkdown.nmCidadeAux,
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
							type={'date'}
							roomType={RoomTypeEnum.ODONTO}
							onBackClick={onBackClick}
							user={odontoMarkdown.nmUsuarioAux}
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

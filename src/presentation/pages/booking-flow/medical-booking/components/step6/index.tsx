/* eslint-disable consistent-return */
import React, {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {formatText} from 'presentation/utils';
import {GetMedicalSpecialists} from 'domain/usecases';
import {MdOutlineArrowBack} from 'react-icons/md';
import {translations} from 'presentation/translations';
import {Accordion} from 'presentation/components/accordion';
import {ShiftButton} from 'presentation/components/shift-buttons';
import {healthBookingStates} from 'presentation/pages/states/atoms';
import {ButtonsFailure, FailureToLoad} from 'presentation/components/failure-to-load';
import {CardUnavailable} from 'presentation/components/card-unavailable/card-unavailable';

import {RoomTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {Loading} from 'presentation/components/loading';
import * as S from './styles';

interface Step6Props {
	time: GetMedicalSpecialists;
	onNextClick: () => void;
	onBackClick: () => void;
}

export const Step6: React.FC<Step6Props> = ({time, onBackClick, onNextClick}: Step6Props) => {
	let dataAux = [];
	// FIXME falta parametro de turno no endpoint
	const [turno, setTurno] = useState('');
	const [horarios, setHorarios] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [showError, setShowError] = useState(false);
	const [healthBooking, setHealthBooking] = useRecoilState(healthBookingStates);

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepTime;
	}, []);

	const getTimes = value => {
		setIsLoading(true);
		time.get({
			specialty_code: healthBooking.cdEspecialidade,
			clinic_code: healthBooking.cdPrestadorJuridico,
			date: healthBooking.dtConsulta,
			shiftType: value,
		})
			.then(data => {
				data.content.providers.forEach(o =>
					dataAux.push({
						provider: o.name,
						cdProviders: o.code,
						horarios: o.availableTimes,
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
		setHealthBooking({
			...healthBooking,
			nmPrestadorFisicoAux: value.nmPrestadorFisico,
			cdPrestadorFisico: value.cdPrestadorFisico,
			horarioConsulta: value.horarioAgendamento,
		});
	};

	function cleanBooking() {
		setHealthBooking({
			...healthBooking,
			horarioConsulta: '',
			nmPrestadorFisicoAux: '',
			cdPrestadorFisico: '',
		});
	}

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
							dtConsulta: '',
						});
					}}
					leftIcon={<MdOutlineArrowBack />}>
					{translations['pt-br'].bookingFlow.buttonReturnCalendar}
				</S.ButtonScheduleHealth>
				{!showError ? (
					<S.ButtonScheduleHealth
						color="primary"
						fontSize={'xxs'}
						variant="contained"
						onClick={() => onNextClick()}
						disabled={!healthBooking.horarioConsulta}>
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
								{`Horarios em ${healthBooking.nmEspecialidadeAux} de ${healthBooking.dtConsulta}`}
							</S.CardStepPageTile>
							<S.CardStepPageDescription>
								{translations['pt-br'].bookingFlow.timeStepSubtitle}
							</S.CardStepPageDescription>
						</div>
						<ShiftButton onChange={value => trocaTurno(value)} />
					</S.HeaderContainer>

					<S.ContainerPlaceAppointment>
						<S.ConsultationPlace>
							{formatText(healthBooking.nmPrestadorJuridicoAux)}
						</S.ConsultationPlace>
						<S.ConsultationAddress>
							{healthBooking.nmLogradouro &&
								String(healthBooking.nmLogradouro).toLowerCase().trim()}
							, {healthBooking.cdNumero && String(healthBooking.cdNumero).trim()} -{' '}
							{healthBooking.nmBairro &&
								String(healthBooking.nmBairro).toLowerCase().trim()}
							, {String(healthBooking.nmCidadeAux).toLowerCase()} -{' '}
							{healthBooking.cdUfAux}
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
							user={healthBooking.nmUsuarioAux}
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

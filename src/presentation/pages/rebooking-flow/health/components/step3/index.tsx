/* eslint-disable consistent-return */
import React, {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {formatText} from 'presentation/utils';
import {GetMedicalSpecialists} from 'domain/usecases';
import {MdOutlineArrowBack} from 'react-icons/md';
import {translations} from 'presentation/translations';
import {Accordion} from 'presentation/components/accordion';
import {ShiftButton} from 'presentation/components/shift-buttons';
import {healthMarkdownStates} from 'presentation/pages/states/atoms';
import {ButtonsFailure, FailureToLoad} from 'presentation/components/failure-to-load';
import {CardUnavailable} from 'presentation/components/card-unavailable/card-unavailable';
import {RoomTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {Loading} from 'presentation/components/loading';
import * as S from './styles';

interface Step3Props {
	time: GetMedicalSpecialists;
	onNextClick: () => void;
	onBackClick: () => void;
}

export const Step3: React.FC<Step3Props> = ({time, onNextClick, onBackClick}: Step3Props) => {
	let dataAux = [];
	const [turno, setTurno] = useState('');
	const [horarios, setHorarios] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [showError, setShowError] = useState(false);
	const [healthMarkdown, setHealthMarkdown] = useRecoilState(healthMarkdownStates);

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepTimeReschedule;
	}, []);

	const getTimes = value => {
		setIsLoading(true);
		time.get({
			specialty_code: healthMarkdown.cdEspecialidade,
			clinic_code: healthMarkdown.cdPrestadorJuridico,
			date: healthMarkdown.dtConsulta,
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
		setHealthMarkdown({
			...healthMarkdown,
			nmPrestadorFisicoAux: value.nmPrestadorFisico,
			cdPrestadorFisico: value.cdPrestadorFisico,
			horarioConsulta: value.horarioAgendamento,
		});
	};

	function cleanBooking() {
		setHealthMarkdown({
			...healthMarkdown,
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
						setHealthMarkdown({
							...healthMarkdown,
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
						disabled={!healthMarkdown.horarioConsulta}>
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
								{`Horarios em ${healthMarkdown.nmEspecialidadeAux} de ${healthMarkdown.dtConsulta}`}
							</S.CardStepPageTile>
							<S.CardStepPageDescription>
								{translations['pt-br'].bookingFlow.timeStepSubtitle}
							</S.CardStepPageDescription>
						</div>
						<ShiftButton onChange={value => trocaTurno(value)} />
					</S.HeaderContainer>

					<S.ContainerPlaceAppointment>
						<S.ConsultationPlace>
							{formatText(healthMarkdown.nmPrestadorJuridicoAux)}
						</S.ConsultationPlace>
						<S.ConsultationAddress>
							{healthMarkdown.nmLogradouro &&
								String(healthMarkdown.nmLogradouro).toLowerCase().trim()}
							, {healthMarkdown.cdNumero && String(healthMarkdown.cdNumero).trim()} -{' '}
							{healthMarkdown.nmBairro &&
								String(healthMarkdown.nmBairro).toLowerCase().trim()}
							, {String(healthMarkdown.nmCidadeAux).toLowerCase()} -{' '}
							{healthMarkdown.cdUfAux}
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
							user={healthMarkdown.nmUsuarioAux}
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

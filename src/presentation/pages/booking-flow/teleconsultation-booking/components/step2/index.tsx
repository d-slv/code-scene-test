import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useRecoilState, useRecoilValue} from 'recoil';
import {formatText} from 'presentation/utils';
import {MdOutlineArrowBack} from 'react-icons/md';
import {Modal} from 'presentation/components/modal';
import theme from 'presentation/styles/theme.styles';
import {translations} from 'presentation/translations';
import {Button} from 'presentation/components/button/button';
import {SearchBar} from 'presentation/components/search-bar';
import {telehealthBookingStates} from 'presentation/pages/states/atoms';
import {FilteredResult, verifyAppointment} from 'presentation/utils/utilFunctions';
import {RadioCheckButtonContainer} from 'presentation/components/radio-check-button';
import {ButtonsFailure, FailureToLoad} from 'presentation/components/failure-to-load';
import {
	GetMedicalBooked,
	GetMedicalExternalUrl,
	GetTelehealthProviders,
	GetTelehealthSpecialties,
} from 'domain/usecases';
import {Loading} from 'presentation/components/loading';
import {accountDataState} from 'presentation/pages/entry-flow/atoms';
import * as S from './styles';

interface Step2Props {
	onNextClick: () => void;
	onBackClick: () => void;
	booked: GetMedicalBooked;
	providers: GetTelehealthProviders;
	specialties: GetTelehealthSpecialties;
	onLetterFilterChange?: (value: string) => void;
	externalUrl: GetMedicalExternalUrl;
}

const redirectSpecialties = [{cdEspecialidade: 145, dsEspecialidade: 'PSICOTERAPIA'}];
const redirectCds = redirectSpecialties.map(redirectObj => redirectObj.cdEspecialidade);

export const Step2: React.FC<Step2Props> = ({
	booked,
	providers,
	specialties,
	externalUrl,
	onNextClick,
	onBackClick,
	onLetterFilterChange,
}: Step2Props) => {
	const letters = [];
	const [especialidades] = useState([]);
	const [query, setQuery] = useState('');
	const [loaded, setIsLoaded] = useState(false);
	const [appointmentScheduledList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [scheduled, setScheduled] = useState(false);
	const [showError, setShowError] = useState(false);
	const [selectedLetter, setSelectedLetter] = useState('A');
	const {beneficiary} = useRecoilValue(accountDataState);
	const [filteredList, setFilteredList] = useState<FilteredResult>();
	const [isModalLastScheduledOpen, setIsModalLastScheduledOpen] = useState(false);
	const [isModalRedirectOpen, setIsModalRedirectOpen] = useState(false);
	const [telehealthBooking, setTelehealthBooking] = useRecoilState(telehealthBookingStates);
	const [externalConsultUrl, setExternalConsultUrl] = useState<string>('');

	const navigate = useNavigate();

	const concatEspSub = value => {
		value.map(o =>
			o.subEspecialidades.length !== 0
				? o.subEspecialidades.map(b =>
						especialidades.push({
							cdEsp: o.cdEspecialidade,
							nmEspConcat: `${o.dsEspecialidade}: ${b.dsSubEspecialidade}`,
							cdSub: b.cdSubEspecialidade,
						}),
				  )
				: especialidades.push({
						cdEsp: o.cdEspecialidade,
						nmEspConcat: o.dsEspecialidade,
						cdSub: '0',
				  }),
		);
		setIsLoaded(true);
	};

	const getProvider = () => {
		setIsModalLastScheduledOpen(false);
		setIsLoading(true);
		providers
			.get({
				telemedicina: 'S',
				uf: telehealthBooking.cdUfAux,
				cidade: telehealthBooking.nmCidadeAux,
				especialidade: telehealthBooking.cdEspecialidade,
				subEspecialidade: telehealthBooking.cdSubEspecialidadeAux,
			})
			.then(data => {
				data.unidades.forEach(
					obj =>
						obj.telemedicina === 'S' &&
						setTelehealthBooking(prevState => ({
							...prevState,
							cdPrestadorJuridico: obj.codigo,
							nmPrestadorJuridicoAux: obj.nmPrestador,
							nmLogradouro: obj.logradouro,
							cdNumero: obj.numero,
							nmBairro: obj.bairro,
						})),
				);
			})
			.catch(error => {
				if (error.message.statusCode === 204) {
					setScheduled(false);
				} else {
					setIsLoading(false);
					setShowError(true);
				}
			})
			.finally(() => {
				onNextClick();
			});
	};

	const getExternalTeleconsultUrl = async () => {
		const {nuContrato} = beneficiary;
		return externalUrl.get({nuContrato}).then(response => response);
	};

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepSpecialty;
		setTelehealthBooking({
			...telehealthBooking,
			nmUsuarioAux: beneficiary.nmUsuario,
		});

		specialties
			.get({
				telemedicina: 'S',
				cdUf: telehealthBooking.cdUfAux,
				nmCidade: telehealthBooking.nmCidadeAux,
			})
			.then(data => {
				concatEspSub(data.especialidades);
			})
			.catch(error => {
				if (error.message.statusCode === 204) {
					setIsLoading(false);
				} else {
					setShowError(true);
					setIsLoading(false);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});

		booked
			.get()
			.then(data => {
				data.agendamentos.forEach(
					e =>
						e.cdStatus === '0' &&
						(appointmentScheduledList.push({
							cdAppointment: e.cdEspecialidade,
							nmDoctor: e.nmPrestadorFisico,
							dsSpecialty: e.dsEspecialidade,
							nuConsulta: e.nuConsulta,
							dtConsulta: e.dtConsulta,
						}),
						setScheduled(true)),
				);
			})
			.catch(error => {
				if (error.message.statusCode === 204) {
					setScheduled(false);
				} else {
					setShowError(true);
				}
			});
	}, []);

	function handleChangeFilter(value: string) {
		setSelectedLetter(value);
		if (onLetterFilterChange) {
			onLetterFilterChange(value);
		}
	}

	especialidades.forEach(obj =>
		letters.push(
			letters.includes(obj.nmEspConcat.charAt(0)) ? null : obj.nmEspConcat.charAt(0),
		),
	);

	const search = value => {
		setQuery(value);
		if (value !== '') {
			handleChangeFilter(value.charAt(0).toUpperCase());
		} else {
			handleChangeFilter('A');
		}
	};

	const searchModeSwitcher = value => {
		search('');
		handleChangeFilter(value);
	};

	const lastAppointmentScheduled = async value => {
		if (redirectCds.includes(value[0])) {
			setIsModalRedirectOpen(true);
			const consultUrl = await getExternalTeleconsultUrl();
			setExternalConsultUrl(consultUrl);
			return;
		}

		if (scheduled) {
			appointmentScheduledList
				.map(e => e.cdAppointment)
				.forEach(
					e =>
						value[0] === Number(e) &&
						verifyAppointment(
							value[0],
							setFilteredList,
							appointmentScheduledList,
							setIsModalLastScheduledOpen,
						),
				);
		} else {
			setTelehealthBooking({
				...telehealthBooking,
				cdEspecialidade: String(value[0]),
				nmEspecialidadeAux: value[1],
				cdSubEspecialidadeAux: String(value[2]),
			});
		}
		setTelehealthBooking({
			...telehealthBooking,
			cdEspecialidade: String(value[0]),
			nmEspecialidadeAux: value[1],
			cdSubEspecialidadeAux: String(value[2]),
		});
	};

	const replaceLastAppointment = () => {
		setTelehealthBooking({
			...telehealthBooking,
			flReagendamento: true,
			nuConsulta: filteredList.nuConsulta,
			cdEspecialidade: filteredList.cdAppointment,
			nmEspecialidadeAux: filteredList.dsSpecialty,
			cdSubEspecialidadeAux: '',
		});
		getProvider();
	};

	const returnList = param => ({
		key: param.nmEspConcat,
		value: [param.cdEsp, param.nmEspConcat, param.cdSub, param.telemedicina],
	});

	function filterListValidate() {
		if (query !== '') {
			return especialidades
				.filter(obj => obj.nmEspConcat.includes(query.toUpperCase()))
				.map(typ => returnList(typ));
		}
		return especialidades
			.filter(obj => obj.nmEspConcat.charAt(0) === selectedLetter)
			?.map(typ => returnList(typ));
	}

	const clearModalStates = () => {
		setTelehealthBooking({
			...telehealthBooking,
			cdEspecialidade: '',
		});
		setIsModalLastScheduledOpen(!isModalLastScheduledOpen);
	};

	return (
		<>
			{isLoading ? (
				<Loading style={{minHeight: 300}} />
			) : (
				<>
					<S.HeaderContainer>
						<div>
							<S.CardStepPageTile>
								{translations['pt-br'].bookingFlow.specialtyStepTitle}
							</S.CardStepPageTile>
							<S.CardStepPageDescription>
								{translations['pt-br'].bookingFlow.specialtyStepSubtitle}
							</S.CardStepPageDescription>
						</div>
						<SearchBar
							onChange={value => search(value)}
							onSubmit={value => search(value)}
						/>
					</S.HeaderContainer>

					{!showError ? (
						<>
							<S.Scroll>
								{letters
									.filter(obj => obj !== null)
									.sort()
									.map((u, key) => (
										<S.SpecialtyLetters
											onClick={() => searchModeSwitcher(u)}
											isSelected={u === selectedLetter}
											key={key}>
											{u}
										</S.SpecialtyLetters>
									))}
							</S.Scroll>

							{loaded && (
								<RadioCheckButtonContainer
									unselectedColor={theme.colors.primary}
									columns={2}
									onChange={value => lastAppointmentScheduled(value)}
									list={filterListValidate()}
								/>
							)}
						</>
					) : (
						<FailureToLoad />
					)}

					<S.FooterCardButtons>
						<S.ButtonScheduleHealth
							onClick={() => {
								onBackClick();
								setTelehealthBooking({
									...telehealthBooking,
									nuTelefone: '',
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
								onClick={() => getProvider()}
								disabled={!telehealthBooking.cdEspecialidade}>
								{translations['pt-br'].bookingFlow.buttonNext}
							</S.ButtonScheduleHealth>
						) : (
							<ButtonsFailure />
						)}
					</S.FooterCardButtons>

					{isModalLastScheduledOpen && (
						<Modal
							isOpen={isModalLastScheduledOpen}
							title={''}
							variant="guide"
							onClose={() => clearModalStates()}>
							<>
								<S.ModalTitleScheduled>
									{translations['pt-br'].bookingFlow.modalTitleScheduled}
								</S.ModalTitleScheduled>
								<S.ModalBody>
									<S.TitleBody>
										{filteredList?.dtConsulta}
										<S.Stethoscope />
									</S.TitleBody>
									<S.ContentBody>
										<b>Para:</b>
										<p>{formatText(telehealthBooking.nmUsuarioAux)}</p>
										<hr />
										<b>Médico:</b>
										<p>{formatText(filteredList?.nmDoctor)}</p>
										<hr />
										<b>{formatText(filteredList?.dsSpecialty)}</b>
									</S.ContentBody>
								</S.ModalBody>
								<S.TitleButtonReplace>
									{translations['pt-br'].bookingFlow.modalContinueAndReplace}
								</S.TitleButtonReplace>
								<S.ModalButtonReplace>
									<Button onClick={() => clearModalStates()}>
										{translations['pt-br'].bookingFlow.buttonReturn}
									</Button>
									<Button
										onClick={() => replaceLastAppointment()}
										variant="outlined">
										{translations['pt-br'].bookingFlow.buttonReplace}
									</Button>
								</S.ModalButtonReplace>
							</>
						</Modal>
					)}

					{isModalRedirectOpen && (
						<Modal
							isOpen={isModalRedirectOpen}
							title={''}
							variant="guide"
							onClose={() => setIsModalRedirectOpen(!isModalRedirectOpen)}>
							<S.ModalBodyContainer>
								<S.Attendant />
								<S.ModalRedirectText>
									Para especialidade de psicoterapia, precisamos fazer o
									agendamento via portal de telemedicina, clique no botão abaixo
									para ser redirecionado.
								</S.ModalRedirectText>

								<S.RedirectButton
									onClick={() => window.open(externalConsultUrl)}
									leftIcon={<S.Teleconsultation />}
									spacingInsetX="lg"
									fontWeight="bold"
									fontSize="xs">
									Entrar Telemedicina
								</S.RedirectButton>
								<S.RedirectButton
									onClick={() => navigate('/home')}
									leftIcon={<S.House />}
									spacingInsetX="lg"
									fontWeight="bold"
									variant="outlined"
									fontSize="xs">
									Voltar para a home
								</S.RedirectButton>
							</S.ModalBodyContainer>
						</Modal>
					)}
				</>
			)}
		</>
	);
};

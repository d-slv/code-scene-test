import React, {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {formatText} from 'presentation/utils';
import {MdOutlineArrowBack} from 'react-icons/md';
import {Modal} from 'presentation/components/modal';
import theme from 'presentation/styles/theme.styles';
import {translations} from 'presentation/translations';
import {Button} from 'presentation/components/button/button';
import {SearchBar} from 'presentation/components/search-bar';
import {healthBookingStates} from 'presentation/pages/states/atoms';
import {GetMedicalSpecialties, GetMedicalAppointments} from 'domain/usecases';
import {FilteredResult, verifyAppointment} from 'presentation/utils/utilFunctions';
import {RadioCheckButtonContainer} from 'presentation/components/radio-check-button';
import {ButtonsFailure, FailureToLoad} from 'presentation/components/failure-to-load';
import {Loading} from 'presentation/components/loading';
import * as S from './styles';

interface Step3Props {
	onNextClick: () => void;
	onBackClick: () => void;
	specialties: GetMedicalSpecialties;
	booked: GetMedicalAppointments;
	onLetterFilterChange?: (value: string) => void;
}

export const Step3: React.FC<Step3Props> = ({
	booked,
	specialties,
	onBackClick,
	onNextClick,
	onLetterFilterChange,
}: Step3Props) => {
	const letters = [];
	const [especialidades] = useState([]);
	const [query, setQuery] = useState('');
	const [loaded, setIsLoaded] = useState(false);
	const [appointmentScheduledList] = useState([]);
	const [scheduled, setScheduled] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [showError, setShowError] = useState(false);
	const [selectedLetter, setSelectedLetter] = useState('A');
	const [filteredList, setFilteredList] = useState<FilteredResult>();
	const [healthBooking, setHealthBooking] = useRecoilState(healthBookingStates);
	const [isModalLastScheduledOpen, setIsModalLastScheduledOpen] = useState(false);

	const concatEspSub = value => {
		value.map(o =>
			o.subspecialties.length !== 0
				? o.subspecialties.map(b =>
						especialidades.push({
							cdEsp: o.code,
							nmEspConcat: `${o.description}: ${b.subspecialtyDescription}`,
							cdSub: b.subspecialtyCode,
						}),
				  )
				: especialidades.push({
						cdEsp: o.code,
						nmEspConcat: o.description,
						cdSub: '0',
				  }),
		);
		setIsLoaded(true);
	};

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepSpecialty;
		setIsLoading(true);
		specialties
			.get({
				state_code: healthBooking.cdUfAux,
				city: healthBooking.nmCidadeAux,
			})
			.then(data => {
				concatEspSub(data.content);
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
				data.content.forEach(
					e =>
						e.status === 1 &&
						(appointmentScheduledList.push({
							cdAppointment: e.number,
							cdSpecialty: e.specialty.code,
							dsSpecialty: e.specialty.description,
							nuConsulta: e.number,
							dtConsulta: e.date,
							nmDoctor: e.provider.name,
							cdSubSpecialty: e.subSpecialtyCode,
						}),
						setScheduled(true)),
				);
			})
			.catch(error => {
				if (error.message.statusCode === 400) {
					setScheduled(false);
				} else {
					setIsLoading(false);
					setShowError(true);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	function handleChangeFilter(value: string) {
		setSelectedLetter(value);
		if (onLetterFilterChange) {
			onLetterFilterChange(value);
		}
	}

	especialidades?.map(obj =>
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

	const lastAppointmentScheduled = value => {
		if (scheduled) {
			appointmentScheduledList
				.map(e => e.cdSpecialty)
				.forEach(
					e =>
						value[0] === e &&
						verifyAppointment(
							value[0],
							setFilteredList,
							appointmentScheduledList,
							setIsModalLastScheduledOpen,
						),
				);
		} else {
			setHealthBooking({
				...healthBooking,
				cdEspecialidade: value[0],
				nmEspecialidadeAux: value[1],
				cdSubEspecialidadeAux: String(value[2]),
			});
		}
		setHealthBooking({
			...healthBooking,
			cdEspecialidade: value[0],
			nmEspecialidadeAux: value[1],
			cdSubEspecialidadeAux: String(value[2]),
		});
	};

	const returnList = param => ({
		key: param.nmEspConcat,
		value: [param.cdEsp, param.nmEspConcat, param.cdSub],
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

	const replaceLastAppointment = () => {
		setHealthBooking({
			...healthBooking,
			flReagendamento: true,
			nuConsulta: filteredList.nuConsulta,
			cdEspecialidade: String(filteredList.cdSpecialty),
			nmEspecialidadeAux: filteredList.dsSpecialty,
			cdSubEspecialidadeAux:
				filteredList.cdSubSpecialty === null ? '0' : filteredList.cdSubSpecialty,
		});
		onNextClick();
	};

	const cleanModalStates = () => {
		setHealthBooking({
			...healthBooking,
			cdEspecialidade: String(0),
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
							fontSize={'xxs'}
							variant="outlined"
							onClick={() => {
								onBackClick();
								setHealthBooking({
									...healthBooking,
									nmCidadeAux: '',
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
								disabled={!healthBooking.cdEspecialidade}>
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
							onClose={() => cleanModalStates()}>
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
										<p>{formatText(healthBooking.nmUsuarioAux)}</p>
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
									<Button onClick={() => cleanModalStates()}>
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
				</>
			)}
		</>
	);
};

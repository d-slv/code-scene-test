import React, {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {formatText} from 'presentation/utils';
import {MdOutlineArrowBack} from 'react-icons/md';
import {Modal} from 'presentation/components/modal';
import theme from 'presentation/styles/theme.styles';
import {translations} from 'presentation/translations';
import {Button} from 'presentation/components/button/button';
import {SearchBar} from 'presentation/components/search-bar';
import {odontoBookingStates} from 'presentation/pages/states/atoms';
import {GetOdontoSpecialties, GetOdontoBooked} from 'domain/usecases';
import {FilteredResult, verifyAppointment} from 'presentation/utils/utilFunctions';
import {RadioCheckButtonContainer} from 'presentation/components/radio-check-button';
import {ButtonsFailure, FailureToLoad} from 'presentation/components/failure-to-load';
import {Loading} from 'presentation/components/loading';
import * as S from './styles';

interface Step2Props {
	onNextClick: () => void;
	onBackClick: () => void;
	booked: GetOdontoBooked;
	specialties: GetOdontoSpecialties;
	onLetterFilterChange?: (value: string) => void;
}

export const Step2: React.FC<Step2Props> = ({
	booked,
	specialties,
	onBackClick,
	onNextClick,
	onLetterFilterChange,
}) => {
	const letters = [];
	const [especialidades] = useState([]);
	const [query, setQuery] = useState('');
	const [loaded, setIsLoaded] = useState(false);
	const [appointmentScheduledList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [showError, setShowError] = useState(false);
	const [selectedLetter, setSelectedLetter] = useState('');
	const [filteredList, setFilteredList] = useState<FilteredResult>();
	const [odontoBooking, setOdontoBooking] = useRecoilState(odontoBookingStates);
	const [isModalLastScheduledOpen, setIsModalLastScheduledOpen] = useState(false);
	const isOdontoBooking = window.location.pathname.includes('marcar-dentista');

	const concatEspSub = value => {
		value.map(
			o =>
				o.subEspecialidades.length !== 0 &&
				o.subEspecialidades.map(b =>
					especialidades.push({
						cdEsp: o.cdEspecialidade,
						nmEspConcat: `${o.dsEspecialidade}: ${b.dsSubEspecialidade}`,
						cdSub: b.cdSubEspecialidade,
					}),
				),
		);
		setIsLoaded(true);
	};

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepSpecialty;
		specialties
			.get()
			.then(data => {
				concatEspSub(data.especialidades);
			})
			.catch(() => {
				setShowError(true);
				setIsLoading(false);
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
						appointmentScheduledList.push({
							cdAppointment: e.cdEspecialidade,
							nmDoctor: e.nmPrestadorFisico,
							dsSpecialty: e.dsEspecialidade,
							nuConsulta: e.nuConsulta,
							dtConsulta: e.dtConsulta,
						}),
				);
			})
			.catch(error => {
				if (error.message.statusCode === 204) {
					setIsLoading(false);
				} else {
					setIsLoading(false);
					setShowError(true);
				}
			});
	}, []);

	especialidades?.map(obj =>
		letters.push(
			letters.includes(obj.nmEspConcat.charAt(0)) ? null : obj.nmEspConcat.charAt(0),
		),
	);
	letters.sort();

	const handleChangeFilter = (value: string) => {
		setSelectedLetter(value);
		if (onLetterFilterChange) {
			onLetterFilterChange(value);
		}
	};

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

	const getcdSubSpecialty = async value => {
		try {
			const codeResult = await specialties.get();
			codeResult.especialidades.forEach(
				obj =>
					obj.cdEspecialidade === value &&
					setOdontoBooking({
						...odontoBooking,
						cdSubEspecialidadeAux: obj.subEspecialidades
							.map(e => e.cdSubEspecialidade)
							.toString(),
					}),
			);
		} catch {
			setShowError(true);
		}
	};

	const lastAppointmentScheduled = value => {
		if (
			appointmentScheduledList.map(e => e.cdAppointment === String(value[0])).includes(true)
		) {
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
					getcdSubSpecialty(value[0]),
				);
		} else {
			setOdontoBooking({
				...odontoBooking,
				cdEspecialidade: String(value[0]),
				nmEspecialidadeAux: value[1],
				cdSubEspecialidadeAux: String(value[2]),
			});
		}
		setOdontoBooking({
			...odontoBooking,
			cdEspecialidade: String(value[0]),
			nmEspecialidadeAux: value[1],
			cdSubEspecialidadeAux: String(value[2]),
		});
	};

	const replaceLastAppointment = () => {
		setOdontoBooking({
			...odontoBooking,
			flReagendamento: true,
			nuConsulta: filteredList.nuConsulta,
			cdEspecialidade: filteredList.cdAppointment,
			nmEspecialidadeAux: filteredList.dsSpecialty,
			cdSubEspecialidadeAux: odontoBooking.cdSubEspecialidadeAux,
		});
		onNextClick();
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

	const clearModalStates = () => {
		setOdontoBooking({
			...odontoBooking,
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
									.map((u, key) => (
										<S.SpecialtyLetters
											onClick={() => searchModeSwitcher(u)}
											isSelected={
												selectedLetter
													? u === selectedLetter
													: key === 0 && setSelectedLetter(letters[0])
											}
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
						<S.ButtonScheduleOdonto
							onClick={() => {
								onBackClick();
								setOdontoBooking({
									...odontoBooking,
									nmCidadeAux: '',
								});
							}}
							fontSize={'xxs'}
							variant="outlined"
							leftIcon={<MdOutlineArrowBack />}>
							{translations['pt-br'].bookingFlow.buttonPrev}
						</S.ButtonScheduleOdonto>
						{!showError ? (
							<S.ButtonScheduleOdonto
								color="primary"
								fontSize={'xxs'}
								variant="contained"
								onClick={() => onNextClick()}
								disabled={!odontoBooking.cdEspecialidade}>
								{translations['pt-br'].bookingFlow.buttonNext}
							</S.ButtonScheduleOdonto>
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
										<p>{formatText(odontoBooking.nmUsuarioAux)}</p>
										<hr />
										<b>{isOdontoBooking ? 'Dentista' : 'Médico'}:</b>
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
				</>
			)}
		</>
	);
};

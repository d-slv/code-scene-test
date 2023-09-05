import React, {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {formatText} from 'presentation/utils';
import {MdOutlineArrowBack} from 'react-icons/md';
import {Switch} from 'presentation/components/switch';
import {translations} from 'presentation/translations';
import {SelectField} from 'presentation/components/select-field';
import {odontoBookingStates} from 'presentation/pages/states/atoms';
import {GetOdontoProviders, GetOdontoDistricts, GetProvidersDentalGuide} from 'domain/usecases';
import {CardCheckBoxContainer} from 'presentation/components/card-check-box';
import {HapVidaLocationIcon} from 'presentation/components/icons/hapvida-location';
import {ButtonsFailure, FailureToLoad} from 'presentation/components/failure-to-load';
import {CardUnavailable} from 'presentation/components/card-unavailable/card-unavailable';
import {Modal} from 'presentation/components/modal';
import {Button} from 'presentation/components/button/button';
import {PhoneIcon} from 'presentation/components/icons/phone-icon';
import {RoomTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {Loading} from 'presentation/components/loading';
import * as S from './styles';

interface Step3Props {
	onNextClick: () => void;
	onBackClick: () => void;
	districts: GetOdontoDistricts;
	providers: GetOdontoProviders;
	accreditedProviders: GetProvidersDentalGuide;
}

export const Step3: React.FC<Step3Props> = ({
	districts,
	providers,
	accreditedProviders,
	onBackClick,
	onNextClick,
}) => {
	const [bairros, setBairros] = useState([]);
	const [checkedNgbh, setCheckedNgbh] = useState(false);
	const [checkedShc, setCheckedShc] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [showError, setShowError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [prestadores, setPrestadores] = useState([]);
	const [odontoBooking, setOdontoBooking] = useRecoilState(odontoBookingStates);
	const [accreditedNetwork, setAccreditedNetwork] = useState(false);
	const [accreditedNetworkOnly, setAccreditedNetworkOnly] = useState(false);
	const [openContactModal, setOpenContactModal] = useState(false);
	const [contactModalData, setContactModalData] = useState([]);

	const callAccreditedProviders = async (value): Promise<void> => {
		setOdontoBooking({
			...odontoBooking,
			nmBairroAux: value,
			cdPrestadorJuridico: '',
		});
		setShowError(false);
		setIsLoading(true);
		try {
			const providersResult = await accreditedProviders.get({
				nmBairro: value,
				cdUf: odontoBooking.cdUfAux,
				nmCidade: odontoBooking.nmCidadeAux,
				cdEspecialidade: odontoBooking.cdEspecialidade,
				dsTipo: 'CONSULTORIOS/CLINICAS',
			});
			setPrestadores(providersResult.prestadores);
			setSuccess(true);
			setAccreditedNetwork(true);
			setIsLoading(false);
		} catch (error) {
			if (error.message.statusCode === 204) {
				setPrestadores([]);
				setIsLoading(false);
			} else {
				setSuccess(false);
				setShowError(true);
				setIsLoading(false);
			}
		}
	};

	const callProviders = async (value, tglNgbh, tglShc): Promise<void> => {
		setAccreditedNetwork(false);
		setAccreditedNetworkOnly(false);
		setShowError(false);
		setIsLoading(true);

		const requestData = {
			nmBairro: value,
			cdUf: odontoBooking.cdUfAux,
			incluirBairrosVizinhos: tglNgbh,
			nmCidade: odontoBooking.nmCidadeAux,
			cdEspecialidade: odontoBooking.cdEspecialidade,
			cdAtendimentoAcessoEspecial: tglShc,
		};

		// eslint-disable-next-line eqeqeq
		if (value == 0) {
			delete requestData.nmBairro;
		} else {
			setOdontoBooking({
				...odontoBooking,
				nmBairroAux: value,
			});
		}

		try {
			const providersResult = await providers.get(requestData);
			setPrestadores(providersResult.unidades);
			setSuccess(true);
			setIsLoading(false);
		} catch (error) {
			if (error.message.statusCode === 204) {
				if (tglShc === 'T') {
					setAccreditedNetworkOnly(true);
				}
				callAccreditedProviders(value);
			} else {
				setSuccess(false);
				setShowError(true);
				setIsLoading(false);
			}
		}
	};

	const checkNghToogle = () => {
		if (checkedNgbh) {
			callProviders(odontoBooking.nmBairroAux, 'N', checkedShc ? 'S' : 'T');
		} else {
			callProviders(odontoBooking.nmBairroAux, 'S', checkedShc ? 'S' : 'T');
		}
	};

	const checkShcToogle = () => {
		if (checkedShc) {
			callProviders(odontoBooking.nmBairroAux, checkedNgbh ? 'S' : 'N', 'T');
		} else {
			callProviders(odontoBooking.nmBairroAux, checkedNgbh ? 'S' : 'N', 'S');
		}
	};

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepProvider;
		districts
			.get({
				cdUf: odontoBooking.cdUfAux,
				nmCidade: odontoBooking.nmCidadeAux,
				cdEspecialidade: odontoBooking.cdEspecialidade,
				cdSubEspecialidade: odontoBooking.cdSubEspecialidadeAux,
				cdAtendimentoAcessoEspecial: odontoBooking.cdAtendimentoAcessoEspecialAux,
			})
			.then(data => {
				setBairros(data.bairros);
				setIsLoading(false);
			})
			.catch(() => {
				setShowError(true);
				setIsLoading(false);
			});
	}, []);

	const footerButtons = () => (
		<>
			<S.FooterCardButtons>
				<S.ButtonScheduleOdonto
					onClick={() => {
						onBackClick();
						setOdontoBooking({
							...odontoBooking,
							cdEspecialidade: '',
						});
					}}
					fontSize={'xxs'}
					variant="outlined"
					leftIcon={<MdOutlineArrowBack />}>
					{translations['pt-br'].bookingFlow.buttonPrev}
				</S.ButtonScheduleOdonto>
				{!showError ? (
					<>
						{!accreditedNetwork && (
							<S.ButtonScheduleOdonto
								color="primary"
								fontSize={'xxs'}
								variant="contained"
								onClick={() => onNextClick()}
								disabled={!odontoBooking.cdPrestadorJuridico}>
								{translations['pt-br'].bookingFlow.buttonNext}
							</S.ButtonScheduleOdonto>
						)}
					</>
				) : (
					<ButtonsFailure />
				)}
			</S.FooterCardButtons>
		</>
	);

	const closeModal = () => {
		setContactModalData([]);
		setOpenContactModal(!openContactModal);
	};
	return (
		<>
			{isLoading ? (
				<Loading style={{minHeight: 300}} />
			) : (
				<>
					{bairros.length !== 0 ? (
						<>
							<S.HeaderContainer>
								<S.CardStepPageTile>
									{translations['pt-br'].bookingFlow.providerStepTitleOdonto}
								</S.CardStepPageTile>
								<S.CardStepPageDescription>
									{translations['pt-br'].bookingFlow.providerStepSubtitleOdonto}{' '}
									<b>
										{odontoBooking.nmCidadeAux}/{odontoBooking.cdUfAux}
									</b>{' '}
									{
										translations['pt-br'].bookingFlow
											.providerStepSubtitleContinueOdonto
									}
								</S.CardStepPageDescription>
							</S.HeaderContainer>
							<S.ContainerSelect>
								<S.ContentSelect>
									<S.LabelSelect>
										{translations['pt-br'].bookingFlow.labeldistrict}
									</S.LabelSelect>
									<SelectField
										placeholder="Selecione o bairro"
										onChange={value => {
											setCheckedNgbh(false);
											setCheckedShc(false);
											callProviders(value, 'N', 'T');
										}}>
										<>
											<option value={0}>
												{formatText(
													translations['pt-br'].bookingFlow.alldistricts,
												)}
											</option>
											{bairros?.map((obj, index) => (
												<option key={index} value={String(obj.nmBairro)}>
													{formatText(obj.nmBairro)}
												</option>
											))}
										</>
									</SelectField>
								</S.ContentSelect>
								{!accreditedNetwork && (
									<S.ContainerToggles>
										<S.LabelSelect>
											{translations['pt-br'].bookingFlow.includeLabelToggle}
										</S.LabelSelect>
										<S.ContentToggles>
											<S.Toggle>
												<S.IncludeToogles>
													{
														translations['pt-br'].bookingFlow
															.includeLabeldistrict
													}
												</S.IncludeToogles>
												<Switch
													disabled={
														odontoBooking.nmBairroAux === '' ||
														undefined
													}
													isOn={checkedNgbh}
													name="ngbh"
													handleToggle={() => {
														setCheckedNgbh(!checkedNgbh);
														checkNghToogle();
													}}
												/>
											</S.Toggle>
											<S.Toggle>
												<S.IncludeToogles>
													{
														translations['pt-br'].bookingFlow
															.includeSpecialHealthCare
													}
												</S.IncludeToogles>
												<Switch
													disabled={
														odontoBooking.nmBairroAux === '' ||
														undefined
													}
													isOn={checkedShc}
													name="shc"
													handleToggle={() => {
														setCheckedShc(!checkedShc);
														checkShcToogle();
													}}
												/>
											</S.Toggle>
										</S.ContentToggles>
									</S.ContainerToggles>
								)}
							</S.ContainerSelect>
							<S.CardContainerRender>
								{showError && (
									<>
										<FailureToLoad />
									</>
								)}
								{success && (
									<>
										{prestadores.length !== 0 ? (
											<>
												{accreditedNetwork ? (
													<>
														<S.CardHeader>
															<S.CardHeaderTitle>
																{
																	translations['pt-br']
																		.bookingFlow
																		.selectAccreditedClinicTitle
																}
															</S.CardHeaderTitle>
															<S.CardHeaderDescription>
																{
																	translations['pt-br']
																		.bookingFlow
																		.selectAccreditedClinicDescription
																}
															</S.CardHeaderDescription>
														</S.CardHeader>
														<S.CardContainer>
															<CardCheckBoxContainer
																columns={2}
																selectVariant="outlined"
																locationType="other"
																onChange={value => {
																	setContactModalData([
																		value[0],
																		value[1],
																		value[2],
																		value[3],
																		value[4],
																		value[5],
																		value[6],
																		value[7],
																	]);
																	setOpenContactModal(
																		!openContactModal,
																	);
																}}
																list={prestadores?.map(obj => ({
																	component: (
																		<S.CardLocation>
																			<S.CardLocationContent>
																				<S.CardLocationTitle>
																					{obj.nome || ''}
																				</S.CardLocationTitle>
																				<S.CardLocationAddress>
																					{(obj.logradouro
																						? `${obj.logradouro}, `
																						: ''
																					).toLowerCase()}
																					{obj.numero ||
																						''}
																					{', '}
																					{obj.bairro &&
																						obj.bairro
																							.trim()
																							.toLowerCase()}
																					{' - '}
																					{formatText(
																						odontoBooking.nmCidadeAux,
																					)}
																					{' - '}
																					{
																						odontoBooking.cdUfAux
																					}
																				</S.CardLocationAddress>
																			</S.CardLocationContent>
																		</S.CardLocation>
																	),
																	value: [
																		obj.nome,
																		obj.logradouro,
																		obj.numero,
																		obj.complemento,
																		obj.bairro,
																		obj.cidade,
																		obj.uf,
																		obj.contatos,
																	],
																}))}
															/>
															{!accreditedNetworkOnly && (
																<S.CardSwitchNetwork>
																	<S.CardOptionsTitleFooter>
																		{
																			translations['pt-br']
																				.bookingFlow
																				.clinicsTitle
																		}
																	</S.CardOptionsTitleFooter>
																	<S.CardOptionsDescriptionFooter>
																		{
																			translations['pt-br']
																				.bookingFlow
																				.clinicsDescription
																		}
																	</S.CardOptionsDescriptionFooter>
																	<S.ButtonScheduleOdonto
																		color="primary"
																		fontSize={'xxs'}
																		variant="contained"
																		onClick={() => {
																			setCheckedNgbh(false);
																			setCheckedShc(false);
																			callProviders(
																				odontoBooking.nmBairroAux,
																				'N',
																				'T',
																			);
																		}}>
																		{
																			translations['pt-br']
																				.bookingFlow
																				.buttonSeeClinics
																		}
																	</S.ButtonScheduleOdonto>
																</S.CardSwitchNetwork>
															)}
														</S.CardContainer>
													</>
												) : (
													<>
														<S.CardHeader>
															<S.CardHeaderTitle>
																{
																	translations['pt-br']
																		.bookingFlow
																		.selectClinicTitle
																}
															</S.CardHeaderTitle>
															<S.CardHeaderDescription>
																{
																	translations['pt-br']
																		.bookingFlow
																		.selectClinicDescription
																}
															</S.CardHeaderDescription>
														</S.CardHeader>

														<S.CardContainer>
															<CardCheckBoxContainer
																columns={2}
																selectVariant="outlined"
																onChange={value =>
																	setOdontoBooking({
																		...odontoBooking,
																		cdPrestadorJuridico: String(
																			value[0],
																		),
																		nmPrestadorJuridicoAux:
																			value[1],
																		nmLogradouro: value[2],
																		cdNumero: value[3],
																		nmBairro: value[4],
																	})
																}
																list={prestadores?.map(obj => ({
																	component: (
																		<S.CardLocation>
																			<S.CardLocationIconContainer>
																				<HapVidaLocationIcon />
																			</S.CardLocationIconContainer>
																			<S.CardLocationContent>
																				<S.CardLocationTitle>
																					{obj.nome || ''}
																				</S.CardLocationTitle>
																				<S.CardLocationAddress>
																					{(obj.logradouro
																						? `${obj.logradouro}, `
																						: ''
																					).toLowerCase()}
																					{obj.bairro &&
																						obj.bairro
																							.trim()
																							.toLowerCase()}
																					{' - '}
																					{formatText(
																						odontoBooking.nmCidadeAux,
																					)}
																					{' - '}
																					{
																						odontoBooking.cdUfAux
																					}
																				</S.CardLocationAddress>
																			</S.CardLocationContent>
																		</S.CardLocation>
																	),
																	value: [
																		obj.codigo,
																		obj.nome,
																		obj.logradouro,
																		obj.numero,
																		obj.complemento,
																		obj.bairro,
																	],
																}))}
															/>
															<S.CardSwitchNetwork>
																<S.CardOptionsTitleFooter>
																	{
																		translations['pt-br']
																			.bookingFlow
																			.accreditedClinicsTitle
																	}
																</S.CardOptionsTitleFooter>
																<S.CardOptionsDescriptionFooter>
																	{
																		translations['pt-br']
																			.bookingFlow
																			.accreditedClinicsDescription
																	}
																</S.CardOptionsDescriptionFooter>
																<S.ButtonScheduleOdonto
																	color="primary"
																	fontSize={'xxs'}
																	variant="contained"
																	onClick={() => {
																		callAccreditedProviders(
																			odontoBooking.nmBairroAux,
																		);
																	}}>
																	{
																		translations['pt-br']
																			.bookingFlow
																			.buttonSeeClinics
																	}
																</S.ButtonScheduleOdonto>
															</S.CardSwitchNetwork>
														</S.CardContainer>
													</>
												)}
											</>
										) : (
											<>
												<CardUnavailable
													type={'odontoProviders'}
													roomType={RoomTypeEnum.ODONTO}
													user={odontoBooking.nmUsuarioAux}
												/>
											</>
										)}
									</>
								)}
							</S.CardContainerRender>
							{footerButtons()}
						</>
					) : (
						<>
							<FailureToLoad />
							{footerButtons()}
						</>
					)}

					{openContactModal && (
						<Modal
							isOpen={openContactModal}
							hideTitle={true}
							variant={'other'}
							onClose={() => closeModal()}
							style={{maxWidth: '400px'}}>
							<S.ModalTitleAccredited>{contactModalData[0]}</S.ModalTitleAccredited>
							<S.ModalBody>
								<S.AddressTitle>
									{
										translations['pt-br'].bookingFlow
											.odontoAccreditedProviderModalAddress
									}
								</S.AddressTitle>
								{contactModalData[1]}
								{', '}
								{contactModalData[2]}
								{', '}
								{contactModalData[3]}
								{', '}
								{contactModalData[4]}
								{', '}
								{contactModalData[5]}
								{'-'}
								{contactModalData[6]}
							</S.ModalBody>
							<S.TitleButtonReplace>
								{
									translations['pt-br'].bookingFlow
										.odontoAccreditedProviderModalPhone
								}
							</S.TitleButtonReplace>
							<S.ModalButtonReplace>
								{contactModalData[7]?.map(e => (
									<>
										<Button
											fullWidth
											rightIcon={
												<PhoneIcon
													width={18}
													height={18}
													fill={'#FFFFFF'}
												/>
											}>
											{e}
										</Button>
									</>
								))}
							</S.ModalButtonReplace>
						</Modal>
					)}
				</>
			)}
		</>
	);
};

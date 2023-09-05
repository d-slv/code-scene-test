/* eslint-disable no-alert */
import React, {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {formatText} from 'presentation/utils';
import {Switch} from 'presentation/components/switch';
import {translations} from 'presentation/translations';
import {SelectField} from 'presentation/components/select-field';
import {odontoMarkdownStates} from 'presentation/pages/states/atoms';
import {CardCheckBoxContainer} from 'presentation/components/card-check-box';
import {HapVidaLocationIcon} from 'presentation/components/icons/hapvida-location';
import {ButtonsFailure, FailureToLoad} from 'presentation/components/failure-to-load';
import {CardUnavailable} from 'presentation/components/card-unavailable/card-unavailable';
import {
	GetOdontoProviders,
	GetOdontoDistricts,
	GetOdontoSpecialties,
	GetProvidersDentalGuide,
} from 'domain/usecases';
import {Modal} from 'presentation/components/modal';
import {Button} from 'presentation/components/button/button';
import {PhoneIcon} from 'presentation/components/icons/phone-icon';
import {RoomTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {Loading} from 'presentation/components/loading';
import * as S from './styles';

interface Step1Props {
	onNextClick: () => void;
	districts: GetOdontoDistricts;
	providers: GetOdontoProviders;
	specialties: GetOdontoSpecialties;
	accreditedProviders: GetProvidersDentalGuide;
}

export const Step1: React.FC<Step1Props> = ({
	districts,
	providers,
	accreditedProviders,
	specialties,
	onNextClick,
}) => {
	const [bairros, setBairros] = useState([]);
	const [checkedNgbh, setCheckedNgbh] = useState(false);
	const [checkedShc, setCheckedShc] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [showError, setShowError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [prestadores, setPrestadores] = useState([]);
	const [odontoMarkdown, setOdontoMarkdown] = useRecoilState(odontoMarkdownStates);
	const [accreditedNetwork, setAccreditedNetwork] = useState(false);
	const [accreditedNetworkOnly, setAccreditedNetworkOnly] = useState(false);
	const [openContactModal, setOpenContactModal] = useState(false);
	const [contactModalData, setContactModalData] = useState([]);

	const callAccreditedProviders = async (value): Promise<void> => {
		setOdontoMarkdown({
			...odontoMarkdown,
			nmBairroAux: value,
		});
		setShowError(false);
		setIsLoading(true);
		try {
			const providersResult = await accreditedProviders.get({
				nmBairro: value,
				cdUf: odontoMarkdown.cdUfAux,
				nmCidade: odontoMarkdown.nmCidadeAux,
				cdEspecialidade: odontoMarkdown.cdEspecialidade,
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
		setOdontoMarkdown({
			...odontoMarkdown,
			nmBairroAux: value,
		});
		setAccreditedNetwork(false);
		setAccreditedNetworkOnly(false);
		setShowError(false);
		setIsLoading(true);
		try {
			const providersResult = await providers.get({
				nmBairro: value,
				incluirBairrosVizinhos: tglNgbh,
				cdUf: odontoMarkdown.cdUfAux,
				nmCidade: odontoMarkdown.nmCidadeAux,
				cdEspecialidade: odontoMarkdown.cdEspecialidade,
				cdAtendimentoAcessoEspecial: tglShc,
			});
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

	const getDistricts = async () => {
		districts
			.get({
				cdUf: odontoMarkdown.cdUfAux,
				nmCidade: odontoMarkdown.nmCidadeAux,
				cdEspecialidade: odontoMarkdown.cdEspecialidade,
				cdSubEspecialidade: odontoMarkdown.cdSubEspecialidadeAux,
				cdAtendimentoAcessoEspecial: odontoMarkdown.cdAtendimentoAcessoEspecialAux,
			})
			.then(data => {
				setBairros(data.bairros);
				setIsLoading(false);
			})
			.catch(() => {
				setShowError(true);
				setIsLoading(false);
			});
	};

	useEffect(() => {
		setIsLoading(true);
		document.title = translations['pt-br'].bookingFlow.titleStepProviderReschedule;

		specialties
			.get()
			.then(data =>
				data.especialidades.forEach(
					obj =>
						String(obj.cdEspecialidade) === odontoMarkdown.cdEspecialidade &&
						setOdontoMarkdown({
							...odontoMarkdown,
							cdSubEspecialidadeAux: obj.subEspecialidades
								.map(e => e.cdSubEspecialidade)
								.toString(),
						}),
				),
			)
			.catch(() => {
				setShowError(true);
			})
			.finally(() => {
				getDistricts();
			});
	}, []);

	const checkNghToogle = () => {
		if (checkedNgbh) {
			callProviders(odontoMarkdown.nmBairroAux, 'N', checkedShc ? 'S' : 'T');
		} else {
			callProviders(odontoMarkdown.nmBairroAux, 'S', checkedShc ? 'S' : 'T');
		}
	};

	const checkShcToogle = () => {
		if (checkedShc) {
			callProviders(odontoMarkdown.nmBairroAux, checkedNgbh ? 'S' : 'N', 'T');
		} else {
			callProviders(odontoMarkdown.nmBairroAux, checkedNgbh ? 'S' : 'N', 'S');
		}
	};

	const footerButtons = () => (
		<>
			<S.FooterCardButtons>
				{!showError ? (
					<>
						{!accreditedNetwork && (
							<S.ButtonScheduleOdonto
								color="primary"
								fontSize={'xxs'}
								variant="contained"
								onClick={() => onNextClick()}
								disabled={!odontoMarkdown.cdPrestadorJuridico}>
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
										{odontoMarkdown.nmCidadeAux}/{odontoMarkdown.cdUfAux}
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
														odontoMarkdown.nmBairroAux === '' ||
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
														odontoMarkdown.nmBairroAux === '' ||
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
																					{obj.numero
																						? `${obj.numero}, `
																						: ''}
																					{obj.bairro &&
																						obj.bairro
																							.trim()
																							.toLowerCase()}
																					{' - '}
																					{formatText(
																						odontoMarkdown.nmCidadeAux,
																					)}
																					{' - '}
																					{
																						odontoMarkdown.cdUfAux
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
																				odontoMarkdown.nmBairroAux,
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
																	setOdontoMarkdown({
																		...odontoMarkdown,
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
																						odontoMarkdown.nmCidadeAux,
																					)}
																					{' - '}
																					{
																						odontoMarkdown.cdUfAux
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
																			odontoMarkdown.nmBairroAux,
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
													user={odontoMarkdown.nmUsuarioAux}
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

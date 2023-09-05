import React, {useEffect, useState} from 'react';
import {GetMedicalClinics, GetMedicalClinicsModel} from 'domain/usecases';
import amplitude from 'amplitude-js';
import {useRecoilState} from 'recoil';
import TagManager from 'react-gtm-module';
import {Modal} from 'presentation/components/modal';
import {translations} from 'presentation/translations';
import {formatMasks, formatText} from 'presentation/utils';
import {Button} from 'presentation/components/button/button';
import {healthMarkdownStates} from 'presentation/pages/states/atoms';
import {CardCheckBoxContainer} from 'presentation/components/card-check-box';
import {HapVidaLocationIcon} from 'presentation/components/icons/hapvida-location';
import {ButtonsFailure, FailureToLoad} from 'presentation/components/failure-to-load';
import {CardUnavailable} from 'presentation/components/card-unavailable/card-unavailable';
import {RoomTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {Loading} from 'presentation/components/loading';
import * as S from './styles';

interface Step1Props {
	onNextClick: () => void;
	providers: GetMedicalClinics;
}

interface ClinicDataProps {
	cdUf: string;
	nmBairro: string;
	nmCidade: string;
	nmContato: string;
	dsEndereco: string;
	nuEndereco: string;
	nmPrestador: string;
	dsComplemento: string;
}

export const Step1: React.FC<Step1Props> = ({providers, onNextClick}: Step1Props) => {
	const [isLoading, setIsLoading] = useState(true);
	const [showError, setShowError] = useState(false);
	const [prestadores, setPrestadores] = useState<GetMedicalClinicsModel>();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showEmptyCard, setShowEmptyCard] = useState(false);
	const [clinicData, setClinicData] = useState<ClinicDataProps>();
	const [healthMarkdown, setHealthMarkdown] = useRecoilState(healthMarkdownStates);

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepProviderReschedule;
		providers
			.get({
				state_code: healthMarkdown.cdUfAux,
				city: healthMarkdown.nmCidadeAux,
				specialty_code: healthMarkdown.cdEspecialidade,
				telemedicine: '',
			})
			.then(data => {
				setPrestadores(data);
			})
			.catch(error => {
				if (error.message.statusCode === 204) {
					setShowEmptyCard(true);
				} else {
					setShowError(true);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	const footerButtons = () => (
		<>
			<S.FooterCardButtons>
				{!showError ? (
					<S.ButtonScheduleHealth
						color="primary"
						fontSize={'xxs'}
						variant="contained"
						onClick={() => {
							const tagManagerArgs = {
								gtmId: 'GTM-KQKN552',
								events: {
									sendUserInfo: 'Iniciou remarcação saúde',
								},
							};
							TagManager.initialize(tagManagerArgs);
							amplitude.getInstance().logEvent('Iniciou remarcação saúde');
							onNextClick();
						}}
						disabled={!healthMarkdown.cdPrestadorJuridico}>
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
					{isLoading === false && prestadores !== undefined && (
						<>
							{prestadores?.content.networkType.code === '1' ? (
								<>
									<CardCheckBoxContainer
										columns={2}
										selectVariant="outlined"
										onChange={value =>
											setHealthMarkdown({
												...healthMarkdown,
												cdPrestadorJuridico: String(value[0]),
												nmPrestadorJuridicoAux: value[1],
												nmLogradouro: value[2],
												cdNumero: value[3],
												nmBairro: value[4],
											})
										}
										list={prestadores.content.units?.map(obj => ({
											component: (
												<S.CardLocation>
													<S.CardLocationIconContainer>
														<HapVidaLocationIcon />
													</S.CardLocationIconContainer>
													<S.CardLocationContent>
														<S.CardLocationTitle>
															{formatText(obj.name)}
														</S.CardLocationTitle>
														<S.CardLocationAddress>
															{String(obj.addressName).toLowerCase()},{' '}
															{obj.addressNumber &&
																String(obj.addressNumber)
																	.trim()
																	.toLowerCase()}{' '}
															-{' '}
															{obj.district &&
																String(obj.district)
																	.trim()
																	.toLowerCase()}{' '}
															-{' '}
															{formatText(healthMarkdown.nmCidadeAux)}{' '}
															- {healthMarkdown.cdUfAux}
														</S.CardLocationAddress>
													</S.CardLocationContent>
												</S.CardLocation>
											),
											value: [
												obj.code,
												obj.name,
												obj.addressName,
												obj.addressNumber,
												obj.district,
											],
										}))}
									/>
									{footerButtons()}
								</>
							) : (
								<>
									<CardCheckBoxContainer
										columns={2}
										locationType="other"
										selectVariant="outlined"
										onChange={value => {
											setClinicData({
												...clinicData,
												nmPrestador: value[0],
												dsEndereco: value[1],
												nuEndereco: value[2],
												dsComplemento: value[3],
												nmBairro: value[4],
												nmCidade: value[5],
												cdUf: value[6],
												nmContato: formatMasks('phone', value[7]),
											});
											setIsModalOpen(!isModalOpen);
										}}
										list={prestadores.content.units?.map(obj => ({
											component: (
												<S.CardLocation>
													<S.CardLocationIconContainer>
														<HapVidaLocationIcon fill="#F5821E" />
													</S.CardLocationIconContainer>
													<S.CardLocationContent>
														<S.CardLocationTitle>
															{formatText(obj.name)}
														</S.CardLocationTitle>
														<S.CardLocationAddress>
															{String(obj.addressName).toLowerCase()},{' '}
															{obj.addressNumber &&
																String(obj.addressNumber)
																	.trim()
																	.toLowerCase()}{' '}
															-{' '}
															{obj.district &&
																String(obj.district)
																	.trim()
																	.toLowerCase()}{' '}
															{obj.addressComplement &&
																String(obj.addressComplement)
																	.trim()
																	.toLowerCase()}{' '}
															- {formatText(obj.city)} -{' '}
															{obj.stateCode}
														</S.CardLocationAddress>
													</S.CardLocationContent>
												</S.CardLocation>
											),
											value: [
												obj.name,
												obj.addressName,
												obj.addressNumber,
												obj.addressComplement,
												obj.district,
												obj.city,
												obj.stateCode,
												obj.phoneNumber,
											],
										}))}
									/>
									{footerButtons()}
								</>
							)}
						</>
					)}

					{showEmptyCard && (
						<>
							<CardUnavailable
								type={'place'}
								roomType={RoomTypeEnum.HEALTH}
								user={healthMarkdown.nmUsuarioAux}
							/>
						</>
					)}

					{showError && (
						<>
							<FailureToLoad /> {footerButtons()}
						</>
					)}

					<Modal
						isOpen={isModalOpen}
						title={''}
						style={{width: '20vw'}}
						onClose={() => {
							setIsModalOpen(!isModalOpen);
						}}>
						<>
							<S.ModalHeaderTitle>
								{String(clinicData?.nmPrestador).toLowerCase()}
							</S.ModalHeaderTitle>

							<S.ModalBody>
								<S.ContentAddress>
									<b>{translations['pt-br'].bookingFlow.address}</b>
									<p>
										{String(clinicData?.dsEndereco).trim().toLowerCase()},{' '}
										{clinicData?.nuEndereco &&
											String(clinicData?.nuEndereco).trim().toLowerCase()}
										,{' '}
										{clinicData?.dsComplemento &&
											String(clinicData?.dsComplemento).trim().toLowerCase()}
										,{' '}
										{clinicData?.nmBairro &&
											String(clinicData?.nmBairro).trim().toLowerCase()}{' '}
										- {String(clinicData?.nmCidade).trim().toLowerCase()}/
										{String(clinicData?.cdUf).trim().toLowerCase()}
									</p>
								</S.ContentAddress>
								<S.CardDirection>
									<S.DirectiontIcon />
								</S.CardDirection>
							</S.ModalBody>

							<S.TitleFooterContent>
								{translations['pt-br'].bookingFlow.callAppointment}
							</S.TitleFooterContent>
							<S.FooterButton>
								<Button color="orange.400" rightIcon={<S.PhoneRightIcon />}>
									{clinicData?.nmContato}
								</Button>
							</S.FooterButton>
						</>
					</Modal>
				</>
			)}
		</>
	);
};

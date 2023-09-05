import React, {useEffect, useState} from 'react';
import amplitude from 'amplitude-js';
import {odontoBookingStates} from 'presentation/pages/states/atoms';
import TagManager from 'react-gtm-module';
import {formatText} from 'presentation/utils';
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
import {translations} from 'presentation/translations';
import {GetOdontoCities, GetOdontoStates} from 'domain/usecases';
// components
import {FailureToLoad, FailureToLoadModal} from 'presentation/components/failure-to-load';
import {SelectField} from 'presentation/components/select-field';
// styles
import {Loading} from 'presentation/components/loading';
import {accountDataState} from 'presentation/pages/entry-flow/atoms';
import * as S from './styles';

interface Step1Props {
	onNextClick: () => void;
	states: GetOdontoStates;
	cities: GetOdontoCities;
}

export const Step1: React.FC<Step1Props> = ({states, cities, onNextClick}) => {
	const [estados, setEstados] = useState([]);
	const [cidades, setCidades] = useState([]);
	const [showError, setShowError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const {beneficiary} = useRecoilValue(accountDataState);
	const resetBeneficiaryListStates = useResetRecoilState(odontoBookingStates);
	const [odontoBooking, setOdontoBooking] = useRecoilState(odontoBookingStates);
	const [selectedState, setSelectedState] = useState<string>();

	const requestStates = async (): Promise<void> => {
		setIsLoading(true);
		try {
			const stateResult = await states.get();
			setEstados(stateResult.estados);

			setOdontoBooking({
				...odontoBooking,
				nmUsuarioAux: beneficiary.nmUsuarioC,
			});
		} catch {
			setShowError(true);
		} finally {
			setIsLoading(false);
		}
	};

	const requestCities = async (value: string): Promise<void> => {
		setIsLoading(true);
		setOdontoBooking({...odontoBooking, cdUfAux: value});
		try {
			const cityResult = await cities.get({cdUf: value});
			setCidades(cityResult.cidades);
		} catch {
			setShowError(true);
		} finally {
			setIsLoading(false);
		}
		setSelectedState(value);
	};

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepLocation;
		resetBeneficiaryListStates();
		requestStates();
	}, []);

	return (
		<>
			{isLoading ? (
				<Loading style={{minHeight: 300}} />
			) : (
				<>
					<S.Container>
						{!showError ? (
							<S.ContainerSelect>
								<S.HeaderContainer>
									<S.Title>
										<S.CardStepPageTile>
											{translations['pt-br'].bookingFlow.beneficiaryStepTitle}
										</S.CardStepPageTile>
										<S.CardStepPageSubtitle>
											{odontoBooking.nmUsuarioAux}
										</S.CardStepPageSubtitle>
									</S.Title>
									<S.CardStepPageDescription>
										{translations['pt-br'].bookingFlow.locationStepTitleOdonto}
									</S.CardStepPageDescription>
									<S.CardStepPageSubDescription>
										{translations['pt-br'].bookingFlow.locationStepSubtitle}
									</S.CardStepPageSubDescription>
								</S.HeaderContainer>

								<S.ContentConteiner>
									<S.ContentSelect>
										<S.LabelSelect>
											{translations['pt-br'].bookingFlow.labelState}
										</S.LabelSelect>
										<SelectField
											placeholder="Selecione o estado"
											onChange={value => requestCities(value)}
											value={selectedState}>
											<>
												{estados?.map((obj, index) => (
													<option key={index} value={obj.cdUf}>
														{obj.cdUf}
													</option>
												))}
											</>
										</SelectField>
									</S.ContentSelect>

									<S.ContentSelect>
										<S.LabelSelect>
											{translations['pt-br'].bookingFlow.labelCity}
										</S.LabelSelect>
										<SelectField
											disabled={cidades.length === 0}
											placeholder="Selecione a cidade"
											onChange={value =>
												setOdontoBooking({
													...odontoBooking,
													nmCidadeAux: value,
												})
											}>
											<>
												{cidades?.map((obj, index) => (
													<option key={index} value={obj.nmCidade}>
														{formatText(obj.nmCidade)}
													</option>
												))}
											</>
										</SelectField>
									</S.ContentSelect>
								</S.ContentConteiner>
							</S.ContainerSelect>
						) : (
							<FailureToLoad />
						)}

						<S.FooterCard>
							<S.ContainerInfo>
								<S.ContentInfoTitle>
									{translations['pt-br'].bookingFlow.infoTitle}
								</S.ContentInfoTitle>
								<S.ContentInfo>
									{translations['pt-br'].bookingFlow.contentInfo}{' '}
									<a href="/plano"> clique aqui.</a>
								</S.ContentInfo>
							</S.ContainerInfo>
							<S.ButtonScheduleOdonto
								fontSize={'xxs'}
								onClick={() => {
									const tagManagerArgs = {
										gtmId: 'GTM-KQKN552',
										events: {
											sendUserInfo: 'Iniciou marcação odonto',
										},
									};

									TagManager.initialize(tagManagerArgs);
									amplitude.getInstance().logEvent('Iniciou marcação odonto');
									onNextClick();
								}}
								disabled={!odontoBooking.nmCidadeAux}>
								{translations['pt-br'].bookingFlow.buttonNext}
							</S.ButtonScheduleOdonto>
						</S.FooterCard>
					</S.Container>

					<FailureToLoadModal isModalOpen={showError} setIsModalOpen={setShowError} />
				</>
			)}
		</>
	);
};

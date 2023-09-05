import React, {useEffect} from 'react';
import amplitude from 'amplitude-js';
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
import TagManager from 'react-gtm-module';
import {formatText} from 'presentation/utils';
import {translations} from 'presentation/translations';

import {ExamProvider} from 'domain/usecases';
import {CardCheckBoxContainer} from 'presentation/components/card-check-box';
import {HapVidaLocationIcon} from 'presentation/components/icons/hapvida-location';
import {CardUnavailable} from 'presentation/components/card-unavailable/card-unavailable';
import {RoomTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {
	examBookingState,
	selectedExamProviderState,
	examProvidersState,
} from 'presentation/pages/booking-flow/exam-booking/atoms';
import {formatAddress} from 'presentation/components/ticket/ticket-utils';
import {
	CardLocation,
	CardLocationAddress,
	CardLocationContent,
	CardLocationIconContainer,
	CardLocationTitle,
} from './styles';
import {FooterNavigation} from '../FooterNavigation';

interface Step1Props {
	onNextClick: () => void;
}

export const Step1: React.FC<Step1Props> = ({onNextClick}) => {
	const [examBooking, setExamBooking] = useRecoilState(examBookingState);
	const [selectedProvider, setSelectedProvider] = useRecoilState(selectedExamProviderState);

	const providers = useRecoilValue(examProvidersState);

	const resetSelectedProvider = useResetRecoilState(selectedExamProviderState);

	const failedToLoad = providers.length === 0;

	function handleNextClick() {
		setExamBooking({
			...examBooking,
			cdPrestadorJuridico: selectedProvider.codigo,
			nmPrestadorJuridicoAux: selectedProvider.nome,
			nmLogradouro: selectedProvider.logradouro,
			cdNumero: selectedProvider.numero,
			nmBairro: selectedProvider.bairro,
		});

		const tagManagerArgs = {
			gtmId: 'GTM-KQKN552',
			events: {
				sendUserInfo: 'Iniciou remarcação de exame',
			},
		};
		TagManager.initialize(tagManagerArgs);
		amplitude.getInstance().logEvent('Iniciou remarcação de exame');

		onNextClick();
	}

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepProviderExamReschedule;
		resetSelectedProvider();
	}, []);

	return (
		<>
			{failedToLoad ? (
				<CardUnavailable
					user={examBooking.nmUsuario}
					type="place"
					roomType={RoomTypeEnum.EXAM}
				/>
			) : (
				<>
					<CardCheckBoxContainer
						columns={2}
						selectVariant="outlined"
						onChange={(value: ExamProvider) => setSelectedProvider(value)}
						list={providers.map(provider => ({
							component: (
								<CardLocation>
									<CardLocationIconContainer>
										<HapVidaLocationIcon />
									</CardLocationIconContainer>
									<CardLocationContent>
										<CardLocationTitle>
											{formatText(provider.nome)}
										</CardLocationTitle>
										<CardLocationAddress>
											{formatAddress({
												address: provider.logradouro,
												number: provider.numero,
												district: provider.bairro,
												city: provider.nmCidade,
												state: provider.cdUf,
											})}
										</CardLocationAddress>
									</CardLocationContent>
								</CardLocation>
							),
							value: provider,
						}))}
					/>
					<FooterNavigation
						disabled={!selectedProvider}
						handleNextClick={handleNextClick}
						isStep1
					/>
				</>
			)}
		</>
	);
};

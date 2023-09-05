import React, {useEffect} from 'react';
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';

import {formatText} from 'presentation/utils';
import {translations} from 'presentation/translations';
import {CardCheckBoxContainer} from 'presentation/components/card-check-box';
import {HapVidaLocationIcon} from 'presentation/components/icons/hapvida-location';

import {ExamProvider} from 'domain/usecases';
import {CardUnavailable} from 'presentation/components/card-unavailable/card-unavailable';
import {RoomTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {formatAddress} from 'presentation/components/ticket/ticket-utils';
import {
	CardLocation,
	CardLocationAddress,
	CardLocationContent,
	CardLocationIconContainer,
	CardLocationTitle,
} from './styles';
import {FooterNavigation} from '../FooterNavigation';
import {examBookingState, examProvidersState, selectedExamProviderState} from '../../atoms';

interface Step3Props {
	onNextClick: () => void;
	onBackClick: () => void;
}

export const Step3: React.FC<Step3Props> = ({onBackClick, onNextClick}) => {
	const [examBooking, setExamBooking] = useRecoilState(examBookingState);
	const [selectedProvider, setSelectedProvider] = useRecoilState(selectedExamProviderState);

	const providers = useRecoilValue(examProvidersState);

	const resetSelectedProvider = useResetRecoilState(selectedExamProviderState);

	const failedToLoad = providers.length === 0;

	function handleBackClick() {
		setExamBooking({
			...examBooking,
			cdTipoExame: undefined,
			dsTipoExame: '',
			flAutorizacao: false,
			cdProcedimento: '',
			dtCarenciaExame: '',
		});
		onBackClick();
	}

	function handleNextClick() {
		setExamBooking({
			...examBooking,
			cdPrestadorJuridico: selectedProvider.codigo,
			nmPrestadorJuridicoAux: selectedProvider.nome,
			nmLogradouro: selectedProvider.logradouro,
			cdNumero: selectedProvider.numero,
			nmBairro: selectedProvider.bairro,
		});
		onNextClick();
	}

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepProviderExam;
		resetSelectedProvider();
	}, []);

	return (
		<>
			{failedToLoad ? (
				<CardUnavailable
					user={examBooking.nmUsuario}
					type="place"
					roomType={RoomTypeEnum.EXAM}
					onBackClick={onBackClick}
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
						handleBackClick={handleBackClick}
					/>
				</>
			)}
		</>
	);
};

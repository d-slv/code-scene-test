import React, {useEffect} from 'react';
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
import amplitude from 'amplitude-js';

import {formatText} from 'presentation/utils';
import {translations} from 'presentation/translations';
import {SelectField} from 'presentation/components/select-field';
import {
	citiesState,
	selectedCityState,
	selectedUfState,
	ufState,
} from 'presentation/pages/booking-flow/atoms';
import {accountDataState} from 'presentation/pages/entry-flow/atoms';
import {
	CardStepPageDescription,
	CardStepPageSubDescription,
	CardStepPageSubtitle,
	CardStepPageTitle,
	Container,
	ContainerSelect,
	ContentContainer,
	ContentSelect,
	HeaderContainer,
	LabelSelect,
	Title,
} from './styles';
import {FooterNavigation} from '../FooterNavigation';
import {examBookingState} from '../../atoms';
import {LoadingError} from '../LoadingError';

interface Step1Props {
	onNextClick: () => void;
}

export const Step1: React.FC<Step1Props> = ({onNextClick}) => {
	const [examBooking, setExamBooking] = useRecoilState(examBookingState);

	const {beneficiary} = useRecoilValue(accountDataState);
	const [selectedUf, setSelectedUf] = useRecoilState(selectedUfState('exam'));
	const [selectedCity, setSelectedCity] = useRecoilState(selectedCityState('exam'));
	const ufList = useRecoilValue(ufState('exam'));
	const citiesList = useRecoilValue(citiesState('exam'));

	const resetCity = useResetRecoilState(selectedCityState('exam'));

	const failToLoad = ufList.length === 0 || (selectedUf && citiesList.length === 0);

	function handleNextStep() {
		setExamBooking({
			...examBooking,
			cdUf: selectedUf,
			nmCidade: selectedCity,
			nmUsuario: beneficiary.nmUsuarioC,
			sexo: beneficiary.flSexoUsuario,
			nuIdade: beneficiary.idadeC,
		});
		onNextClick();
		amplitude.getInstance().logEvent('Iniciou marcação exame');
	}

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepBeneficiaryExam;
	}, []);

	return (
		<>
			{failToLoad ? (
				<LoadingError />
			) : (
				<Container>
					<ContainerSelect>
						<HeaderContainer>
							<Title>
								<CardStepPageTitle>
									{translations['pt-br'].bookingFlow.beneficiaryStepTitle}
								</CardStepPageTitle>
								<CardStepPageSubtitle>{beneficiary.nmUsuario}</CardStepPageSubtitle>
							</Title>
							<CardStepPageDescription>
								{translations['pt-br'].bookingFlow.locationStepTitleExam}
							</CardStepPageDescription>
							<CardStepPageSubDescription>
								{translations['pt-br'].bookingFlow.locationStepSubtitle}
							</CardStepPageSubDescription>
						</HeaderContainer>

						<ContentContainer>
							<ContentSelect>
								<LabelSelect>
									{translations['pt-br'].bookingFlow.labelState}
								</LabelSelect>
								<SelectField
									placeholder="Selecione o estado"
									onChange={value => {
										resetCity();
										setSelectedUf(value);
									}}
									value={selectedUf}>
									<>
										{ufList.map(obj => (
											<option key={obj.cdUf} value={obj.cdUf}>
												{obj.cdUf}
											</option>
										))}
									</>
								</SelectField>
							</ContentSelect>
							<ContentSelect>
								<LabelSelect>
									{translations['pt-br'].bookingFlow.labelCity}
								</LabelSelect>
								<SelectField
									disabled={citiesList.length === 0}
									placeholder="Selecione a cidade"
									onChange={value => setSelectedCity(value)}
									value={selectedCity}>
									<>
										{citiesList.map(obj => (
											<option key={obj.nmCidade} value={obj.nmCidade}>
												{formatText(obj.nmCidade)}
											</option>
										))}
									</>
								</SelectField>
							</ContentSelect>
						</ContentContainer>
					</ContainerSelect>
					<FooterNavigation
						isStep1
						disabled={!selectedCity}
						handleNextClick={handleNextStep}
					/>
				</Container>
			)}
		</>
	);
};

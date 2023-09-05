import React, {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {formatText} from 'presentation/utils';
import {MdOutlineArrowBack} from 'react-icons/md';
import {translations} from 'presentation/translations';
import {SelectField} from 'presentation/components/select-field';
import {GetMedicalStates, GetMedicalCities} from 'domain/usecases';
import {healthBookingStates} from 'presentation/pages/states/atoms';
import {ButtonsFailure, FailureToLoad} from 'presentation/components/failure-to-load';
import {Loading} from 'presentation/components/loading';
import {accountDataState} from 'presentation/pages/entry-flow/atoms';
import * as S from './styles';

interface Step2Props {
	onNextClick: () => void;
	onBackClick: () => void;
	states: GetMedicalStates;
	cities: GetMedicalCities;
}

export const Step2: React.FC<Step2Props> = ({
	states,
	cities,
	onBackClick,
	onNextClick,
}: Step2Props) => {
	const [estados, setEstados] = useState([]);
	const [cidades, setCidades] = useState([]);
	const [showError, setShowError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const {beneficiary} = useRecoilValue(accountDataState);
	const [healthBooking, setHealthBooking] = useRecoilState(healthBookingStates);
	const [selectedState, setSelectedState] = useState<string>();

	const requestStates = async (): Promise<void> => {
		setIsLoading(true);
		try {
			const stateResult = await states.get();
			setEstados(stateResult.content);
			setHealthBooking({
				...healthBooking,
				nmUsuarioAux: beneficiary.nmUsuario,
			});
		} catch {
			setIsLoading(false);
			setShowError(true);
		} finally {
			setIsLoading(false);
		}
	};

	const requestCities = async (value: string): Promise<void> => {
		setIsLoading(true);
		setHealthBooking({...healthBooking, cdUfAux: value});
		try {
			const cityResult = await cities.get({state_code: value});
			setCidades(cityResult.content);
		} catch {
			setIsLoading(false);
			setShowError(true);
		} finally {
			setIsLoading(false);
		}
		setSelectedState(value);
	};

	useEffect(() => {
		requestStates();
		setHealthBooking({
			...healthBooking,
			nmUsuarioAux: beneficiary.nmUsuario,
		});
		document.title = translations['pt-br'].bookingFlow.titleStepLocation;
	}, []);

	return (
		<>
			{isLoading ? (
				<Loading style={{minHeight: 300}} />
			) : (
				<>
					{!showError ? (
						<S.ContainerSelect>
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
											<option key={index} value={obj.code}>
												{obj.name}
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
										setHealthBooking({...healthBooking, nmCidadeAux: value})
									}>
									<>
										{cidades?.map((obj, index) => (
											<option key={index} value={obj.city}>
												{formatText(obj.city)}
											</option>
										))}
									</>
								</SelectField>
							</S.ContentSelect>
						</S.ContainerSelect>
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
									nuTelefone: '',
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
								disabled={!healthBooking.nmCidadeAux}>
								{translations['pt-br'].bookingFlow.buttonNext}
							</S.ButtonScheduleHealth>
						) : (
							<ButtonsFailure />
						)}
					</S.FooterCardButtons>
				</>
			)}
		</>
	);
};

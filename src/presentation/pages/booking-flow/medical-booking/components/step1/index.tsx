import React, {useEffect, useState} from 'react';
import amplitude from 'amplitude-js';
import {GetBeneficiaryContacts} from 'domain/usecases';
import {translations} from 'presentation/translations';
import {UpdatePhone} from 'presentation/components/update-phones';
import {useRecoilValue, useRecoilState, useResetRecoilState} from 'recoil';
import {FailureToLoadModal} from 'presentation/components/failure-to-load';
import {healthBookingStates} from 'presentation/pages/states/atoms';
import {Loading} from 'presentation/components/loading';
import {accountDataState} from 'presentation/pages/entry-flow/atoms';
import * as S from './styles';

interface Step1Props {
	onNextClick: () => void;
	contacts: GetBeneficiaryContacts;
}

export const Step1: React.FC<Step1Props> = ({contacts, onNextClick}: Step1Props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [showError, setShowError] = useState(false);
	const [phoneNumbers, setPhoneNumbers] = useState([]);
	const {beneficiary} = useRecoilValue(accountDataState);
	const resetHealthBookingStates = useResetRecoilState(healthBookingStates);
	const [healthBooking, setHealthBooking] = useRecoilState(healthBookingStates);

	useEffect(() => {
		setIsLoading(true);
		document.title = translations['pt-br'].bookingFlow.titleStepBeneficiary;

		contacts
			.get()
			.then(data => {
				data.contato.telefones.forEach(e => setPhoneNumbers(old => [...old, e.telefone]));
			})
			.catch()
			.finally(() => {
				setIsLoading(false);
				setHealthBooking({
					...healthBooking,
					nmUsuarioAux: beneficiary.nmUsuarioC,
				});
			});

		resetHealthBookingStates();
	}, []);

	return (
		<>
			{isLoading ? (
				<Loading style={{minHeight: 300}} />
			) : (
				<>
					<S.Container>
						<S.HeaderContainer>
							<S.CardStepPageTile>
								{translations['pt-br'].bookingFlow.beneficiaryStepTitle}
							</S.CardStepPageTile>
							<S.CardStepPageSubtitle>
								{healthBooking.nmUsuarioAux}
							</S.CardStepPageSubtitle>
						</S.HeaderContainer>

						<S.ContentConteiner>
							{!isLoading && (
								<UpdatePhone phones={phoneNumbers} isTelemedicine={false} />
							)}
						</S.ContentConteiner>

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
							<S.NextButton
								onClick={() => {
									onNextClick();
									amplitude.getInstance().logEvent('Iniciou marcação saúde');
								}}
								disabled={healthBooking.nuTelefone === ''}>
								{translations['pt-br'].bookingFlow.buttonNext}
							</S.NextButton>
						</S.FooterCard>
					</S.Container>

					<FailureToLoadModal isModalOpen={showError} setIsModalOpen={setShowError} />
				</>
			)}
		</>
	);
};

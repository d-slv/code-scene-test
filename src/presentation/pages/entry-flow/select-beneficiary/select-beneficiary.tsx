/* eslint-disable no-console */
import React, {Suspense, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from 'recoil';
import amplitude from 'amplitude-js';
import TagManager from 'react-gtm-module';
import {MdArrowBack, MdOutlineCheck} from 'react-icons/md';

import {formatText} from 'presentation/utils';
import {translations} from 'presentation/translations';
import {Button} from 'presentation/components/button/button';
import {Header, Footer} from 'presentation/components/select-contract';
import {CardCheckBoxContainer} from 'presentation/components/card-check-box';
import {makeGetSidebar, makePostBeneficiary} from 'main/factories/usecases';

import {Loading} from 'presentation/components/loading';
import {
	warningBarState,
	selectedYearState,
	selectedMonthState,
} from 'presentation/pages/my-payments-flow/atoms';
import {
	Container,
	Main,
	TitleContractSelected,
	CardOptionSelected,
	ContentCardOptionDiv,
	TitleSelect,
	BeneficiaryContent,
	FooterButtons,
	SelectContainer,
	SelectedPlanName,
	BoldText,
	SelectedPlanHolder,
	SelectedContractNumber,
	LightText,
} from '../select-plan/styles';
import {
	accountDataState,
	beneficiariesListState,
	selectedBeneficiaryState,
	refresherIdState,
} from '../atoms';

const BeneficiariesList = () => {
	const accountData = useRecoilValue(accountDataState);
	const {nmPlano, nuContrato} = accountData.beneficiary;
	const beneficiariesList = useRecoilValue(beneficiariesListState({nmPlano, nuContrato}));
	const [selectedBeneficiary, setSelectedBeneficiary] = useRecoilState(selectedBeneficiaryState);

	const handleSelectedBeneficiary = value => {
		setSelectedBeneficiary(value);
	};

	return (
		<CardCheckBoxContainer
			hiddenIcon
			selectVariant="filled"
			list={beneficiariesList.map(obj => ({
				component: (
					<BeneficiaryContent>
						<BoldText>{formatText(obj.nmUsuarioC)}</BoldText>
						<LightText isSelected={selectedBeneficiary === obj}>
							{formatText(obj.tipoUsuarioC)}
						</LightText>
					</BeneficiaryContent>
				),
				value: obj,
			}))}
			onChange={value => handleSelectedBeneficiary(value)}
		/>
	);
};

export const SelectBeneficiary: React.FC = () => {
	const navigate = useNavigate();
	const selectedBeneficiary = useRecoilValue(selectedBeneficiaryState);
	const resetSelectedBeneficiary = useResetRecoilState(selectedBeneficiaryState);
	const {
		beneficiary: {nmPlano, nmUsuario, nuContrato},
	} = useRecoilValue(accountDataState);
	const setAccountData = useSetRecoilState(accountDataState);
	const setRefresh = useSetRecoilState(refresherIdState);

	const resetWarningBarCoparticipationExtract = useResetRecoilState(
		warningBarState('coparticipationExtract'),
	);
	const resetWarningBarIncomeTax = useResetRecoilState(warningBarState('incomeTax'));
	const resetSelectedYearCoparticipationExtract = useResetRecoilState(
		selectedYearState({tab: 'coparticipationExtract'}),
	);
	const resetSelectedYearPayments = useResetRecoilState(selectedYearState({tab: 'history'}));
	const resetSelectedYearIncomeTax = useResetRecoilState(selectedYearState({tab: 'incomeTax'}));

	const resetSelectedMonth = useResetRecoilState(selectedMonthState);

	const [isSubmitting, setIsSubmitting] = useState(false);

	function resetAllLocalStates() {
		resetWarningBarCoparticipationExtract();
		resetWarningBarIncomeTax();
		resetSelectedYearCoparticipationExtract();
		resetSelectedMonth();
		resetSelectedYearPayments();
		resetSelectedYearIncomeTax();
	}

	async function handleConfirmBeneficiarySelection() {
		setIsSubmitting(true);
		try {
			const beneficiaryData = await makePostBeneficiary().postBeneficiary({
				nmPlano: selectedBeneficiary.nmPlano,
				nmUsuarioC: selectedBeneficiary.nmUsuarioC,
				nuContrato: selectedBeneficiary.nuContrato,
			});
			setAccountData(beneficiaryData);
			setRefresh(value => value + 1);

			const {sideBar} = await makeGetSidebar().getSidebarData();
			const updatedAccountData = {
				...beneficiaryData,
				sidebar: {...sideBar},
			};
			setAccountData(updatedAccountData);
			resetAllLocalStates();
			setRefresh(value => value + 1);

			const tagManagerArgs = {
				gtmId: 'GTM-KQKN552',
				events: {
					sendUserInfo: 'Entrar Portal',
				},
			};
			TagManager.initialize(tagManagerArgs);
			amplitude.getInstance().logEvent('Entrar Portal');
			navigate('/home');
		} catch (error) {
			console.log(error);
		} finally {
			setIsSubmitting(false);
		}
	}

	function handleBackToPlansPage() {
		navigate(-1);
	}

	useEffect(() => {
		resetSelectedBeneficiary();
	}, []);

	return (
		<Container>
			<Header />
			<Main>
				<SelectContainer>
					<TitleContractSelected>
						{translations['pt-br'].selectContractPage.titleContractSelected}
					</TitleContractSelected>
					<CardOptionSelected>
						<ContentCardOptionDiv>
							<SelectedPlanName>
								{nmPlano.replace(/[^a-z A-Z]/g, ' ').replace(/[^a-z A-Z]/g, ' ')}
							</SelectedPlanName>
							<SelectedPlanHolder>
								Titular: {formatText(nmUsuario)}
							</SelectedPlanHolder>
							<SelectedContractNumber>Nº: {nuContrato}</SelectedContractNumber>
						</ContentCardOptionDiv>
					</CardOptionSelected>

					<TitleSelect>
						{translations['pt-br'].selectContractPage.TitleSelectBeneficiary}{' '}
						<BoldText>
							{
								translations['pt-br'].selectContractPage
									.TitleSelectBeneficiaryContinue
							}
						</BoldText>
					</TitleSelect>

					<Suspense
						fallback={<Loading customMsg="Carregando..." style={{minHeight: 160}} />}>
						<BeneficiariesList />
					</Suspense>

					<FooterButtons>
						<Button
							spacingInsetY={'nano'}
							variant="outlined"
							leftIcon={<MdArrowBack />}
							onClick={handleBackToPlansPage}>
							{translations['pt-br'].selectContractPage.returnToContract}
						</Button>
						<Button
							spacingInsetY={'nano'}
							rightIcon={<MdOutlineCheck />}
							isLoading={isSubmitting}
							disabled={!selectedBeneficiary}
							onClick={handleConfirmBeneficiarySelection}>
							{translations['pt-br'].selectContractPage.confirmSelection}
						</Button>
					</FooterButtons>
				</SelectContainer>
			</Main>
			<Footer />
		</Container>
	);
};

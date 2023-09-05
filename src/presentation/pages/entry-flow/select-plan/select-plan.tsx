import React, {Suspense} from 'react';
import {useNavigate} from 'react-router-dom';
import {useRecoilState, useRecoilValue} from 'recoil';

import {Footer, Header, InfoCard} from 'presentation/components/select-contract';
import {translations} from 'presentation/translations';
import {CardCheckBoxContainer} from 'presentation/components/card-check-box';
import {formatText} from 'presentation/utils';
import {Loading} from 'presentation/components/loading';
import {
	Main,
	SelectContainer,
	TitleSelect,
	ContentCardOptionDiv,
	Container,
	BoldText,
	PlanName,
	LightText,
} from './styles';
import {accountDataState, plansListState} from '../atoms';

export const PlanList = () => {
	const navigate = useNavigate();
	const [accountData, setAccountData] = useRecoilState(accountDataState);
	const {login_token} = accountData;
	const plansList = useRecoilValue(plansListState({login_token}));

	const handleChosenPlan = value => {
		setAccountData({...accountData, beneficiary: {...accountData.beneficiary, ...value}});
		navigate('beneficiarios');
	};

	return (
		<CardCheckBoxContainer
			list={plansList.map(obj => ({
				component: (
					<ContentCardOptionDiv>
						<PlanName>{obj.nmPlano.replace(/[^a-z A-Z]/g, ' ')}</PlanName>
						<LightText>Titular: {formatText(obj.nmUsuario)}</LightText>
						<LightText>
							<BoldText>Nº: {obj.nuContrato}</BoldText>
						</LightText>
					</ContentCardOptionDiv>
				),
				value: obj,
			}))}
			onChange={value => handleChosenPlan(value)}
		/>
	);
};

export const SelectPlanPage: React.FC = () => (
	<Container>
		<Header />
		<Main>
			<InfoCard />
			<SelectContainer>
				<TitleSelect>
					{translations['pt-br'].selectContractPage.titleSelectContract}{' '}
					<BoldText>
						{translations['pt-br'].selectContractPage.titleSelectContractContinue}
					</BoldText>
				</TitleSelect>
				<Suspense fallback={<Loading customMsg="Carregando..." style={{minHeight: 160}} />}>
					<PlanList />
				</Suspense>
			</SelectContainer>
		</Main>
		<Footer />
	</Container>
);

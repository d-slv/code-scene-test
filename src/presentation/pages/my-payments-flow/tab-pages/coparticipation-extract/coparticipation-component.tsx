import React from 'react';
import {useRecoilValue} from 'recoil';

import {translations} from 'presentation/translations';
import theme from 'presentation/styles/theme.styles';
import {PlanTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {accountDataState} from 'presentation/pages/entry-flow/atoms';
import {DataLine} from '../components/data-line';
import {
	CardTitle,
	Container,
	DataText,
	DataWrapper,
	Divider,
	SectionContainer,
	SectionDivisor,
} from './coparticipation.styles';
import {InnerCard} from './components/inner-card';
import {ExtractList} from './components/extract-list';
import {coParticipationExtractState} from '../../atoms';

const localTranslations = translations['pt-br'].myPaymentsPage.coparticipationExtract;

export const CoparticipationComponent = () => {
	const {titular, contratos, cpf} = useRecoilValue(coParticipationExtractState);
	const {
		beneficiary: {tipoPlanoC},
	} = useRecoilValue(accountDataState);

	const contractDetails = contratos[0];
	const payments = contractDetails.vencimentos[0];
	const extractList = payments.extratos;

	return (
		<>
			<Container>
				<SectionContainer customMarginBottom={16}>
					<CardTitle>{localTranslations.title}</CardTitle>
				</SectionContainer>

				<SectionDivisor />

				<SectionContainer>
					<DataLine
						title={localTranslations.data.contract}
						value={contractDetails.contrato}
					/>
					<DataLine title={localTranslations.data.holder} value={titular} />
					<DataLine
						title={localTranslations.data.registration}
						value={contractDetails.matricula}
					/>
					<DataLine title={localTranslations.data.cpf} value={cpf} />
					<DataLine title={localTranslations.data.baseDate} value={payments.vencimento} />
					<DataLine
						title={localTranslations.data.healthCard}
						value={contractDetails.contrato}
					/>
					<DataLine
						title={localTranslations.data.beneficiary}
						value={contractDetails.nmUsuario}
					/>
				</SectionContainer>

				<SectionDivisor />

				<SectionContainer customMarginBottom={16}>
					<InnerCard title="Lista de utilização">
						<ExtractList extracts={extractList} />
					</InnerCard>
				</SectionContainer>

				<SectionContainer>
					<InnerCard title="Totais">
						{tipoPlanoC !== PlanTypeEnum.ODONTO && (
							<>
								<DataWrapper>
									<DataText size={1.125} weight={600} color={theme.colors.dark}>
										Total de utilização
									</DataText>
									<DataText size={1.125} weight={600}>
										{contractDetails.valorTotalUtilizacao}
									</DataText>
								</DataWrapper>
								<Divider />
							</>
						)}

						<DataWrapper>
							<DataText size={1.125} weight={600} color={theme.colors.dark}>
								Total de participação
							</DataText>
							<DataText size={1.125} weight={600}>
								{contractDetails.valorTotalParticipacao}
							</DataText>
						</DataWrapper>
					</InnerCard>
				</SectionContainer>
			</Container>
		</>
	);
};

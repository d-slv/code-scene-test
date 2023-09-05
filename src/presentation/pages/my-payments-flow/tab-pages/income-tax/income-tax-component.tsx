import React from 'react';
import {useRecoilValue} from 'recoil';

import {translations} from 'presentation/translations';
import useWindowDimensions from 'presentation/hooks/useWindowDimensions';
import {DataLine} from '../components/data-line';
import {
	BaseText,
	IncomeTaxContainer,
	PriceLine,
	PriceNumber,
	SectionDivisor,
} from './income-tax.styles';
import {tabState, selectedYearState, incomeTaxState} from '../../atoms';

const localTranslations = translations['pt-br'].myPaymentsPage.incomeTax;

export function IncomeTaxComponent() {
	const {isResponsive} = useWindowDimensions();
	const currentTab = useRecoilValue(tabState);
	const dtExercicio = useRecoilValue(selectedYearState({tab: currentTab.slang}));
	const {impostoDeRenda} = useRecoilValue(incomeTaxState);
	const {
		cdUsuario,
		dsEnderecoFontePagadora,
		dsFonteRecebedora,
		dsSituacaoUsuario,
		dtEmissao,
		listaValoresPorBeneficiarios,
		nuCnpjFonteRecebedora,
		nuValorTotalPago,
	} = impostoDeRenda[0];

	return (
		<>
			<IncomeTaxContainer isResponsive={isResponsive}>
				<section>
					{!isResponsive && (
						<BaseText
							fontWeight="bold"
							fontSize={isResponsive ? 'xs' : 'sm'}
							color="primaryBlue.500"
							bottomSpace="xxs">
							{localTranslations.title}
						</BaseText>
					)}
					<BaseText
						fontWeight="bold"
						fontSize={isResponsive ? 'xxs' : 'xs'}
						color="primaryBlue.500"
						bottomSpace="xxs">
						{localTranslations.subtitle}
					</BaseText>

					<BaseText
						fontSize={isResponsive ? 'xxs' : 'xs'}
						bottomSpace="xxs"
						lineHeight="21px">
						{localTranslations.description[0]} <strong>{dtExercicio}</strong>
						<br />
						{localTranslations.description[1]}&nbsp;
						<strong>{dtEmissao}</strong>
					</BaseText>
				</section>

				<SectionDivisor bottomSpace="xxs" />

				<section>
					<DataLine
						value={dsFonteRecebedora}
						title={localTranslations.data.receivingSource}
					/>
					<DataLine value={nuCnpjFonteRecebedora} title={localTranslations.data.cgc} />
					<DataLine
						value={dsEnderecoFontePagadora}
						title={localTranslations.data.address}
					/>
					<DataLine value={cdUsuario} title={localTranslations.data.userCode} />
					<DataLine value={dsSituacaoUsuario} title={localTranslations.data.situation} />
				</section>

				<SectionDivisor bottomSpace="xs" />

				<section>
					{listaValoresPorBeneficiarios.map((beneficiario, index) => (
						<PriceLine key={index}>
							<div>
								<BaseText
									fontSize={isResponsive ? 'xxs' : 'xs'}
									fontWeight="medium"
									color="gray.5"
									bottomSpace="quarck">
									{beneficiario.nmBeneficiario}
								</BaseText>
								<BaseText fontSize={isResponsive ? 'xxxs' : 'xxs'} color="gray.5">
									{beneficiario.dsTipoBeneficiario}
								</BaseText>
							</div>
							<PriceNumber
								fontSize={isResponsive ? 'xxs' : 'xs'}
								color="primaryBlue.500"
								fontWeight="medium">
								{translations['pt-br'].myPaymentsPage.currencySymbol}&nbsp;
								{beneficiario.nuVlNominalBeneficiarioFormatado}
							</PriceNumber>
						</PriceLine>
					))}
				</section>

				<SectionDivisor backgroundColor="#00ACD7" bottomSpace="xxs" />

				<section>
					<PriceLine>
						<BaseText fontWeight="bold" color="primaryBlue.500">
							{localTranslations.total}
						</BaseText>
						<PriceNumber
							fontSize={isResponsive ? 'xxs' : 'xs'}
							color="primaryBlue.500"
							fontWeight="medium">
							{translations['pt-br'].myPaymentsPage.currencySymbol}&nbsp;
							{nuValorTotalPago}
						</PriceNumber>
					</PriceLine>
				</section>
			</IncomeTaxContainer>
		</>
	);
}

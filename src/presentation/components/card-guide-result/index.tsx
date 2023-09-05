/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable consistent-return */
import React, {useState} from 'react';
import {formatMasks} from 'presentation/utils';
import {Modal} from 'presentation/components/modal';
import {translations} from 'presentation/translations';
import {Button} from 'presentation/components/button/button';
import {
	GetProvidersDetailsDentalGuideModel,
	GetProvidersDetailsMedicalGuideModel,
} from 'domain/usecases';
import * as qlIcon from 'presentation/assets/images/qualificationsIcons';
import {PlanTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {LoadingIcon} from '../icons/loading-icon';
import PhoneButton from './phone-button';
import * as S from './styles';

type QualificationsCardResultProps = {
	cdTipoQualificacao: string;
	dsTipoQualificacao: string;
}[];

type MarkersResultProps = {
	nome: string;
}[];
interface CardGuideResultProps {
	type?: string;
	city?: string;
	state?: string;
	doctor?: string;
	clinic?: string;
	cgccpf?: string;
	status?: boolean;
	address?: string;
	zipCode?: string;
	loading?: boolean;
	district?: string;
	provider?: string;
	contacts?: string[];
	providerCode?: string;
	documentType?: string;
	documentNumber?: string;
	registrationNumber?: number | string;
	markers?: MarkersResultProps;
	cardType: PlanTypeEnum;
	requestCode?: (code: string) => Promise<void>;
	detailsOdonto?: GetProvidersDetailsDentalGuideModel;
	detailsHealth?: GetProvidersDetailsMedicalGuideModel;
	qualifications?: QualificationsCardResultProps;
}

const legendData = [
	{
		id: 1,
		image: qlIcon.qlA,
		text: 'Programa de Acreditação-A',
	},
	{
		id: 2,
		image: qlIcon.qlD,
		text: 'Profissional com especialização Pós-Graduação-S',
	},
	{
		id: 3,
		image: qlIcon.qlE,
		text: 'Título de Especialista',
	},
	{
		id: 4,
		image: qlIcon.qlG,
		text: 'Certificação de Entidades Gestoras de outros Programas de Qualidade',
	},
	{
		id: 5,
		image: qlIcon.qlI,
		text: 'Certificação ISO9001-l',
	},
	{
		id: 6,
		image: qlIcon.qlM,
		text: 'Profissional com Mestrado',
	},
	{
		id: 7,
		image: qlIcon.qlN,
		text: 'Comunicação de eventos adversos',
	},
	{
		id: 8,
		image: qlIcon.qlP,
		text: 'Profissional com especialização',
	},
	{
		id: 9,
		image: qlIcon.qlQ,
		text: 'Qualidade monitorada',
	},
	{
		id: 10,
		image: qlIcon.qlR,
		text: 'Programa com Residência',
	},
];

export const GuideResultCard: React.FC<CardGuideResultProps> = ({
	type,
	markers,
	address,
	loading,
	provider,
	cardType,
	contacts,
	requestCode,
	documentType,
	providerCode,
	detailsOdonto,
	detailsHealth,
	documentNumber,
	qualifications,
	registrationNumber,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const localTranslations = translations['pt-br'].guideFlow;
	const [isModalLegendOpen, setIsModalLegendOpen] = useState(false);

	const qualificationsOptions = (qlfCode: number, qlfName: string) => {
		if (qlfCode === 1) {
			return <img key={qlfCode} src={qlIcon.qlA} alt={qlfName} />;
		}
		if (qlfCode === 6) {
			return <img key={qlfCode} src={qlIcon.qlN} alt={qlfName} />;
		}
		if (qlfCode === 7) {
			return <img key={qlfCode} src={qlIcon.qlP} alt={qlfName} />;
		}
		if (qlfCode === 8) {
			return <img key={qlfCode} src={qlIcon.qlR} alt={qlfName} />;
		}
		if (qlfCode === 9) {
			return <img key={qlfCode} src={qlIcon.qlE} alt={qlfName} />;
		}
		if (qlfCode === 10) {
			return <img key={qlfCode} src={qlIcon.qlQ} alt={qlfName} />;
		}
		if (qlfCode === 12) {
			return <img key={qlfCode} src={qlIcon.qlG} alt={qlfName} />;
		}
		if (qlfCode === 13) {
			return <img key={qlfCode} src={qlIcon.qlI} alt={qlfName} />;
		}
		if (qlfCode === 14) {
			return <img key={qlfCode} src={qlIcon.qlD} alt={qlfName} />;
		}
		if (qlfCode === 15) {
			return <img key={qlfCode} src={qlIcon.qlM} alt={qlfName} />;
		}
	};

	function qualificationsRender() {
		return qualifications?.map(legend =>
			qualificationsOptions(Number(legend.cdTipoQualificacao), legend.dsTipoQualificacao),
		);
	}

	const phoneTreatmentByModalType = () => {
		if (cardType === PlanTypeEnum.ODONTO) {
			return (
				<S.PhonesModalContainer>
					{contacts?.map((contact, index) => (
						<Button key={index} fullWidth spacingInsetX={'nano'} fontWeight={'regular'}>
							{contact}
						</Button>
					))}
				</S.PhonesModalContainer>
			);
		}
		return (
			<S.PhonesModalContainer>
				{contacts?.map((contact, index) => (
					<Button key={index} fullWidth spacingInsetX={'nano'} fontWeight={'regular'}>
						{contact === null
							? localTranslations.uninformedContact
							: String(formatMasks('phone', contact).replace(/\//g, ''))}
					</Button>
				))}
			</S.PhonesModalContainer>
		);
	};

	return (
		<S.Container>
			<S.CardGuideContainer>
				<S.Header>
					<S.CardTitle type={cardType}>{provider}</S.CardTitle>
					<S.AddressContainer>
						<S.AddressContent>
							<S.AddressTitle>{localTranslations.address}</S.AddressTitle>
							<S.AddressText>{address}</S.AddressText>
						</S.AddressContent>
						{/* <S.AddressButton type={cardType}>
							<FaDirections size={25} />
						</S.AddressButton> */}
					</S.AddressContainer>
				</S.Header>
				{qualifications && (
					<S.QualificationsContainer
						onClick={() => {
							setIsModalLegendOpen(true);
						}}>
						{qualificationsRender()}
					</S.QualificationsContainer>
				)}
				<S.ButtonsContainer>
					{contacts && (
						<S.ButtonsContentCard autoWidth={contacts?.length === 1}>
							{contacts
								?.filter(
									(_contact, idx) =>
										idx === contacts.length - 1 || idx === contacts.length - 2,
								)
								.map((contact, index) => (
									<PhoneButton key={index} phoneNumber={contact} />
								))}
						</S.ButtonsContentCard>
					)}

					<S.ButtonsContentCard isFooter={true}>
						<Button
							variant="outlined"
							fullWidth
							onClick={() => {
								requestCode(providerCode);
								setIsModalOpen(true);
							}}>
							{localTranslations.details}
						</Button>
					</S.ButtonsContentCard>
				</S.ButtonsContainer>
			</S.CardGuideContainer>

			<Modal
				variant={'other'}
				isOpen={isModalOpen}
				style={{maxWidth: '370px'}}
				hideTitle={true}
				onClose={() => setIsModalOpen(!isModalOpen)}>
				<>
					{loading ? (
						<LoadingIcon />
					) : (
						<>
							<S.TitleContentModal type={cardType}>{provider}</S.TitleContentModal>
							{qualifications && (
								<S.QualificationsContentModal
									isEmpty={qualifications === null}
									onClick={() => {
										setIsModalLegendOpen(true);
									}}>
									{qualificationsRender()}
								</S.QualificationsContentModal>
							)}
							<S.ContentDivider>
								<p>
									{localTranslations.socialReason}
									<span>{provider}</span>
								</p>
								{(documentType !== 'CNPJ' ||
									documentNumber !== registrationNumber) && (
									<p>
										{documentType}: <span>{documentNumber}</span>
									</p>
								)}

								<p>
									{localTranslations.juridicalName}
									<span>{registrationNumber || '-'}</span>
								</p>
							</S.ContentDivider>
							<S.ContentDivider>
								<p>{localTranslations.address}</p>
								<p>
									<span>{address}</span>
								</p>
							</S.ContentDivider>
							<S.ContentDivider>
								<p>
									{localTranslations.serviceType}
									<span>
										<b>{type}</b>
									</span>
								</p>

								{detailsOdonto?.detalhamento?.especialidades?.length > 0 && (
									<p>
										{localTranslations.specialties}
										{detailsOdonto?.detalhamento?.especialidades?.map(
											(specialty, index) => (
												<span key={index}>
													<b>
														{specialty?.descricao}
														{index <
														detailsOdonto?.detalhamento?.especialidades
															?.length -
															1
															? ', '
															: ''}
													</b>
												</span>
											),
										)}
									</p>
								)}

								{detailsHealth?.especialidades?.length > 0 && (
									<p>
										{localTranslations.specialties}
										{detailsHealth?.especialidades?.map((specialty, index) => (
											<span key={index}>
												<b>
													{specialty?.descricao}
													{index <
													detailsHealth?.especialidades?.length - 1
														? ', '
														: ''}
												</b>
											</span>
										))}
									</p>
								)}

								<S.MotivatorsModalContainer>
									{markers?.map(marker => (
										<Button
											key={marker?.nome}
											fontSize={'xxs'}
											fontWeight={'regular'}
											spacingInsetY={'quarck'}
											spacingInsetX={'quarck'}>
											{marker?.nome}
										</Button>
									))}
								</S.MotivatorsModalContainer>
							</S.ContentDivider>
							<S.ContentDivider>
								{detailsOdonto !== undefined &&
									detailsOdonto?.detalhamento?.informativo !== null && (
										<S.InfoContent>
											<h6>
												{detailsOdonto?.detalhamento?.informativo?.titulo}
											</h6>
											<p>
												{
													detailsOdonto?.detalhamento?.informativo
														?.descricao
												}
											</p>
											<h5>
												{detailsOdonto?.detalhamento?.informativo?.prestadoresSubstitutos.map(
													info => info?.nome,
												)}
											</h5>
										</S.InfoContent>
									)}

								{detailsHealth !== undefined &&
									detailsHealth?.informativo !== null && (
										<S.InfoContent>
											<h6>{detailsHealth?.informativo?.titulo}</h6>
											<p>{detailsHealth?.informativo?.descricao}</p>
											<h5>
												{detailsHealth?.informativo?.prestadoresSubstitutos.map(
													info => info?.nome,
												)}
											</h5>
										</S.InfoContent>
									)}

								<p>{localTranslations.callToMakeAppointment}</p>
								{phoneTreatmentByModalType()}
							</S.ContentDivider>
						</>
					)}
				</>
			</Modal>

			<Modal
				variant={'other'}
				isOpen={isModalLegendOpen}
				style={{maxWidth: '360px'}}
				title={localTranslations.legendTitle}
				leftTitle={true}
				onClose={() => setIsModalLegendOpen(!isModalLegendOpen)}>
				{legendData.map(legend => (
					<S.LegendContent key={legend.id}>
						<img src={legend.image} alt="" /> <p>{legend.text}</p>
					</S.LegendContent>
				))}
			</Modal>
		</S.Container>
	);
};

import React, {useState} from 'react';
import {useRecoilValue} from 'recoil';

import {Modal} from 'presentation/components/modal';
import {translations} from 'presentation/translations';
import {formatMasks, formatText} from 'presentation/utils';
import {ConsultationTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {formatCompleteAddress} from 'presentation/utils/formatText';
import {accountDataState} from 'presentation/pages/entry-flow/atoms';
import {Button} from '../button/button';
import {TicketProps} from './ticket.types';
import {formatAddress, getDayOfWeek} from './ticket-utils';
import {
	Address,
	AppointmentAddress,
	AppointmentDate,
	Divisor,
	HeaderInfo,
	HeaderTopContent,
	IconCellPhone,
	Logo,
	ModalPhonesBody,
	ModalPhonesTitle,
	OrientationText,
	OrientationTitle,
	PhoneContainer,
	PhoneIcon,
	Protocol,
	ProtocolInfo,
	RightCornerLogo,
	RightCornerLogoContainer,
	SummaryBlock,
	SummaryContent,
	SummaryTitle,
	TicketContainer,
	TicketFooter,
	TicketHeader,
	TicketOrientation,
	WarningText,
	WarningTitle,
} from './ticket.styles';

const localTranslations = translations['pt-br'].bookingFlow;

const Ticket = (props: TicketProps) => {
	const {
		ticketTitle,
		appointmentDate,
		nmPrestadorJuridico,
		nmPrestadorFisico,
		nuProtocolo,
		dsEspecialidade,
		tipoConsulta,
		nmTipoExame,
		dsDescricao,
		completeAddress,
		separatedAddress = {},
		nuTelefones = [],
	} = props;
	const [openContactModal, setOpenContactModal] = useState(false);
	const {beneficiary} = useRecoilValue(accountDataState);

	const address = completeAddress
		? formatCompleteAddress(completeAddress)
		: formatAddress(separatedAddress);

	return (
		<>
			<TicketContainer>
				<TicketHeader>
					<RightCornerLogoContainer>
						<RightCornerLogo />
					</RightCornerLogoContainer>
					<HeaderTopContent>
						<Logo />
						<h2>{ticketTitle}</h2>
					</HeaderTopContent>

					<HeaderInfo>
						<div className="date-address">
							<AppointmentDate>
								<b>{getDayOfWeek(appointmentDate)},</b>
								<br />
								{appointmentDate}
							</AppointmentDate>

							<AppointmentAddress>
								<Address>
									<b>{formatText(nmPrestadorJuridico)}</b>
									<br />
									{tipoConsulta === ConsultationTypeEnum.TELECONSULTATION
										? localTranslations.warningContentTelemedicine
										: address}
								</Address>

								{nuTelefones.length !== 0 && (
									<PhoneContainer>
										<span>
											<PhoneIcon />
											<p>{formatMasks('phone', nuTelefones[0])}</p>
										</span>

										{tipoConsulta === ConsultationTypeEnum.ODONTO &&
											nuTelefones.length > 1 && (
												<Button
													fontSize={'xxs'}
													fontWeight={'regular'}
													spacingInsetX={'nano'}
													spacingInsetY={'nano'}
													onClick={() => setOpenContactModal(true)}>
													<IconCellPhone />
													{localTranslations.moreNumbers}
												</Button>
											)}
									</PhoneContainer>
								)}
							</AppointmentAddress>
						</div>

						<div className="summary">
							{nmTipoExame && (
								<SummaryBlock>
									<SummaryTitle>{localTranslations.exam}</SummaryTitle>
									<SummaryContent>{nmTipoExame.toUpperCase()}</SummaryContent>
								</SummaryBlock>
							)}

							<SummaryBlock>
								<SummaryTitle>
									{tipoConsulta === ConsultationTypeEnum.ODONTO
										? localTranslations.dentist
										: localTranslations.doctor}
								</SummaryTitle>
								<SummaryContent>{formatText(nmPrestadorFisico)}</SummaryContent>
							</SummaryBlock>

							{dsEspecialidade && (
								<SummaryBlock>
									<SummaryTitle>{localTranslations.specialty}</SummaryTitle>
									<SummaryContent>{formatText(dsEspecialidade)}</SummaryContent>
								</SummaryBlock>
							)}

							<SummaryBlock>
								<SummaryTitle>{localTranslations.beneficiary}</SummaryTitle>
								<SummaryContent>
									{formatText(beneficiary.nmUsuarioC)}
								</SummaryContent>
							</SummaryBlock>
						</div>

						<div className="warning">
							{tipoConsulta !== ConsultationTypeEnum.TELECONSULTATION && (
								<>
									<WarningTitle>{localTranslations.warningTitle}</WarningTitle>
									<WarningText>
										{nmTipoExame
											? localTranslations.warningContentExam
											: localTranslations.warningContent}
										&nbsp;
										<b>{localTranslations.warningContentContinue}</b>
									</WarningText>
								</>
							)}
						</div>
					</HeaderInfo>

					<Divisor />
				</TicketHeader>

				{dsDescricao && (
					<TicketOrientation>
						<OrientationTitle>
							<b>{localTranslations.scheduledTitleOrientation}</b>
						</OrientationTitle>

						{dsDescricao.includes('escolhido') ? (
							<OrientationText>{dsDescricao}</OrientationText>
						) : (
							<>
								<OrientationTitle>
									{localTranslations.scheduledContentOrientation}
									&nbsp;<b>{nmTipoExame}</b>,&nbsp;
									{localTranslations.scheduledContentOrientationContinue}
								</OrientationTitle>

								<OrientationText>{dsDescricao}</OrientationText>
							</>
						)}

						<Divisor />
					</TicketOrientation>
				)}

				<TicketFooter>
					<Protocol>
						<b>
							{nmTipoExame
								? localTranslations.protocolExam
								: localTranslations.protocol}
						</b>
						&nbsp;{nuProtocolo}
					</Protocol>
					<ProtocolInfo>{localTranslations.protocolInfo}</ProtocolInfo>
				</TicketFooter>
			</TicketContainer>

			<Modal
				hideTitle={true}
				variant={'other'}
				isOpen={openContactModal}
				style={{maxWidth: '350px'}}
				onClose={() => setOpenContactModal(false)}>
				<ModalPhonesTitle>{formatText(nmPrestadorJuridico)}</ModalPhonesTitle>
				<ModalPhonesBody>
					{nuTelefones?.map(phone => (
						<Button key={phone} fullWidth rightIcon={<PhoneIcon />}>
							{formatMasks('phone', phone)}
						</Button>
					))}
				</ModalPhonesBody>
			</Modal>
		</>
	);
};

export default Ticket;

import React, {useState} from 'react';
import {useRecoilValue} from 'recoil';
import moment from 'moment';

import {formatText} from 'presentation/utils';
import {Modal} from 'presentation/components/modal';
import {translations} from 'presentation/translations';
import {Button} from 'presentation/components/button/button';
import {ConsultationTypeEnum} from 'presentation/constants/bookingTypesEnum';
import theme from 'presentation/styles/theme.styles';
import {formatCompleteAddress} from 'presentation/utils/formatText';
import {prepareExamState} from 'presentation/pages/my-exams-flow/atoms';
import {
	AddressBodyAppointments,
	AddressInfoWrapper,
	BodyCardAppointments,
	BoldText,
	ButtonContainer,
	CardModalCancel,
	CardModalCancelBody,
	CircleHeaderIcon,
	ContainerAppointments,
	ContentModalContainer,
	ContentHeaderAppointments,
	Divider,
	Exam,
	ExaminationGuidelines,
	FooterCTAButtonWrapper,
	FooterNearAppointmentContainer,
	FooterNearAppointmentCTAContainer,
	HeaderCardAppointments,
	Health,
	InfoBodyAppointments,
	StyledText,
	Teleconsultation,
	ToastAppointmentConfirmed,
	Tooth,
} from './styles';

interface CardMyAppointmentsProps {
	protocol: string;
	link?: string;
	type: string;
	phone?: string;
	doctor: string;
	clinic: string;
	confirmed: boolean;
	address: string;
	patient: string;
	specialty: string;
	examNumber?: string;
	onClickIgo: () => void;
	dateAppointment: string;
	appointmentNumber: string;
	onClickDetail: () => void;
	onClickMarkdown: () => void;
	confirmationAppointmentDate: boolean;
	cancelAppointmentExam?: (code: string) => Promise<void>;
	cancelOdontoAppointment?: (code: string) => Promise<void>;
	cancelHealthAppointment?: (code: string) => Promise<void>;
}

interface ModalPrepareProps {
	examNumber: string;
	isOpen: boolean;
	onClose: (value: boolean) => void;
	specialty: string;
}

const ModalPrepare = ({examNumber, isOpen, onClose, specialty}: ModalPrepareProps) => {
	const {dsDescricao} = useRecoilValue(prepareExamState(examNumber));

	return (
		<Modal
			leftTitle
			variant="other"
			isOpen={isOpen}
			title={'Orientações para o Exame'}
			onClose={() => onClose(false)}>
			<ContentModalContainer>
				<StyledText>
					{translations['pt-br'].myAppointmentsCard.modalPrepareText}
					{''}
					<BoldText>{specialty}</BoldText>,{' '}
					{translations['pt-br'].myAppointmentsCard.modalPrepareTextContinue}
				</StyledText>
				<StyledText size={0.875} color={theme.colors['gray.4']}>
					{dsDescricao}
				</StyledText>
				<Button
					style={{alignSelf: 'center'}}
					fontSize="xxs"
					variant="contained"
					color="primary"
					onClick={() => onClose(false)}>
					{translations['pt-br'].myAppointmentsCard.modalPrepareButton}
				</Button>
			</ContentModalContainer>
		</Modal>
	);
};

export const MyAppointmentsCard: React.FC<CardMyAppointmentsProps> = ({
	link,
	protocol,
	type,
	confirmed,
	doctor,
	clinic,
	address,
	patient,
	specialty,
	onClickIgo,
	examNumber,
	onClickDetail,
	dateAppointment,
	onClickMarkdown,
	appointmentNumber,
	cancelAppointmentExam,
	cancelOdontoAppointment,
	cancelHealthAppointment,
	confirmationAppointmentDate,
}) => {
	const [isModalPrepareOpen, setIsModalPrepareOpen] = useState(false);
	const [isModalCancelConsultationOpen, setIsModalCancelConsultationOpen] = useState(false);

	const formattedAppointmentDate = moment(dateAppointment, 'D/M/YYYY HH:mm').format(
		'YYYY/MM/DD [-] HH:mm',
	);

	function cancelAppointments(typeCancel: string) {
		switch (typeCancel) {
			case ConsultationTypeEnum.ODONTO:
				return (
					cancelOdontoAppointment(appointmentNumber),
					setIsModalCancelConsultationOpen(false)
				);
			case ConsultationTypeEnum.EXAM:
				return (
					cancelAppointmentExam(appointmentNumber),
					setIsModalCancelConsultationOpen(false)
				);
			default:
				return (
					cancelHealthAppointment(appointmentNumber),
					setIsModalCancelConsultationOpen(false)
				);
		}
	}

	return (
		<>
			<ContainerAppointments>
				<HeaderCardAppointments variantCard={type !== ConsultationTypeEnum.EXAM}>
					<ContentHeaderAppointments>
						<StyledText color={theme.colors.white}>{formatText(specialty)}</StyledText>
						<StyledText weight={700} size={1.25} color={theme.colors.white}>
							{formattedAppointmentDate}
						</StyledText>
					</ContentHeaderAppointments>
					<CircleHeaderIcon>
						{type === ConsultationTypeEnum.HEALTH && <Health />}
						{type === ConsultationTypeEnum.ODONTO && <Tooth />}
						{type === ConsultationTypeEnum.TELECONSULTATION && <Teleconsultation />}
						{type === ConsultationTypeEnum.EXAM && <Exam />}
					</CircleHeaderIcon>
				</HeaderCardAppointments>

				<BodyCardAppointments>
					{confirmed && (
						<ToastAppointmentConfirmed>
							{type !== ConsultationTypeEnum.EXAM
								? `Consulta confirmada!`
								: `Exame confirmado!`}
						</ToastAppointmentConfirmed>
					)}
					<InfoBodyAppointments>
						<StyledText>
							<BoldText>
								{translations['pt-br'].myAppointmentsCard.appointmentFor}
							</BoldText>{' '}
							{formatText(patient)}
						</StyledText>
						<StyledText>
							<BoldText>
								{
									translations['pt-br'].myAppointmentsCard[
										type === ConsultationTypeEnum.ODONTO
											? 'appointmentDentist'
											: 'appointmentDoctor'
									]
								}
							</BoldText>{' '}
							{formatText(doctor)}
						</StyledText>
						<StyledText color="rgba(73, 73, 73, 1)">
							<BoldText color={theme.colors.primary}>
								{translations['pt-br'].myAppointmentsCard.appointmentProtocol}{' '}
							</BoldText>{' '}
							{protocol}
						</StyledText>

						<Divider />

						{type === ConsultationTypeEnum.EXAM && (
							<>
								<ExaminationGuidelines>
									<StyledText size={0.875} color="rgba(90, 90, 90, 1)">
										{translations['pt-br'].myAppointmentsCard.guidelineText}
									</StyledText>

									<Button
										fontSize="xxs"
										fontWeight="medium"
										variant="outlined"
										spacingInsetX="nano"
										spacingInsetY="nano"
										onClick={() => {
											setIsModalPrepareOpen(true);
										}}>
										{translations['pt-br'].myAppointmentsCard.orientationButton}
									</Button>
								</ExaminationGuidelines>
								<Divider />
							</>
						)}

						{type === ConsultationTypeEnum.TELECONSULTATION ? (
							<>
								<StyledText>Hapclínica Digital</StyledText>
								<ButtonContainer>
									<Button
										disabled={!confirmed}
										fullWidth
										fontSize="xxs"
										spacingInsetY="nano"
										onClick={() => window.open(link, '_blank')}>
										{
											translations['pt-br'].myAppointmentsCard
												.buttonTeleconsultation
										}
									</Button>
								</ButtonContainer>
							</>
						) : (
							<AddressBodyAppointments>
								<AddressInfoWrapper>
									<StyledText>{formatText(clinic)}</StyledText>
									<StyledText size={0.875} color={theme.colors['gray.5']}>
										{formatCompleteAddress(address)}
									</StyledText>
								</AddressInfoWrapper>
							</AddressBodyAppointments>
						)}
						{!confirmationAppointmentDate && (
							<>
								<Divider />
								<FooterCTAButtonWrapper>
									<Button
										fontSize="xxs"
										color="danger"
										variant="outlined"
										spacingInsetY="nano"
										onClick={() => setIsModalCancelConsultationOpen(true)}>
										{translations['pt-br'].myAppointmentsCard.buttonCancel}
									</Button>
									<Button
										fontSize="xxs"
										variant="outlined"
										spacingInsetY="nano"
										onClick={onClickMarkdown}>
										{translations['pt-br'].myAppointmentsCard.buttonReschedule}
									</Button>
									<Button
										fontSize="xxs"
										variant="outlined"
										spacingInsetY="nano"
										onClick={onClickDetail}>
										{translations['pt-br'].myAppointmentsCard.buttonDetails}
									</Button>
								</FooterCTAButtonWrapper>
							</>
						)}
					</InfoBodyAppointments>
				</BodyCardAppointments>
			</ContainerAppointments>

			{confirmationAppointmentDate && !confirmed && (
				<FooterNearAppointmentContainer>
					<StyledText size={0.875}>
						Sua consulta é daqui a dois dias, você vai?
					</StyledText>
					<FooterNearAppointmentCTAContainer>
						<Button
							fontSize="xxs"
							color="success"
							spacingInsetY="nano"
							onClick={onClickIgo}>
							{translations['pt-br'].myAppointmentsCard.buttonIGo}
						</Button>
						<Button
							color="danger"
							fontSize="xxs"
							spacingInsetY="nano"
							onClick={() => setIsModalCancelConsultationOpen(true)}>
							{translations['pt-br'].myAppointmentsCard.buttonCancel}
						</Button>
						<Button
							fontSize="xxs"
							variant="outlined"
							spacingInsetY="nano"
							style={{background: 'white'}}
							onClick={onClickMarkdown}>
							{translations['pt-br'].myAppointmentsCard.buttonReschedule}
						</Button>
					</FooterNearAppointmentCTAContainer>
				</FooterNearAppointmentContainer>
			)}

			<Modal
				leftTitle
				variant="other"
				isOpen={isModalCancelConsultationOpen}
				title={type !== ConsultationTypeEnum.EXAM ? 'Cancelar Consulta' : 'Cancelar Exame'}
				onClose={() => {
					setIsModalCancelConsultationOpen(false);
				}}>
				<ContentModalContainer>
					<StyledText>
						<BoldText>{translations['pt-br'].myAppointmentsCard.warningTitle}</BoldText>
						{''}
						{translations['pt-br'].myAppointmentsCard.warningText}
					</StyledText>
					<StyledText>
						{type !== ConsultationTypeEnum.EXAM
							? translations['pt-br'].myAppointmentsCard.warningQuestion
							: translations['pt-br'].myAppointmentsCard.warningQuestionExam}
					</StyledText>
					<CardModalCancel>
						<HeaderCardAppointments variantCard={type !== ConsultationTypeEnum.EXAM}>
							<ContentHeaderAppointments>
								{type !== ConsultationTypeEnum.EXAM ? (
									<StyledText color={theme.colors.white}>
										{formatText(specialty)}
									</StyledText>
								) : (
									<StyledText color={theme.colors.white}>{specialty}</StyledText>
								)}

								<StyledText weight={700} size={1.25} color={theme.colors.white}>
									{dateAppointment}
								</StyledText>
							</ContentHeaderAppointments>
							<CircleHeaderIcon>
								{type === ConsultationTypeEnum.HEALTH && <Health />}
								{type === ConsultationTypeEnum.ODONTO && <Tooth />}
								{type === ConsultationTypeEnum.TELECONSULTATION && (
									<Teleconsultation />
								)}
								{type === ConsultationTypeEnum.EXAM && <Exam />}
							</CircleHeaderIcon>
						</HeaderCardAppointments>
						<CardModalCancelBody>
							<StyledText>
								<BoldText>
									{translations['pt-br'].myAppointmentsCard.appointmentFor}
								</BoldText>{' '}
								{formatText(patient)}
							</StyledText>
							<StyledText>
								<BoldText>
									{
										translations['pt-br'].myAppointmentsCard[
											type === ConsultationTypeEnum.ODONTO
												? 'appointmentDentist'
												: 'appointmentDoctor'
										]
									}
								</BoldText>{' '}
								{formatText(doctor)}
							</StyledText>
							<Divider />
							<StyledText>
								<BoldText>{formatText(clinic)}</BoldText>
							</StyledText>
							{type !== ConsultationTypeEnum.TELECONSULTATION && (
								<StyledText size={0.875} color={theme.colors['gray.5']}>
									{formatCompleteAddress(address)}
								</StyledText>
							)}
						</CardModalCancelBody>
					</CardModalCancel>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						onClick={() => cancelAppointments(type)}>
						{translations['pt-br'].myAppointmentsCard.cancelConfirmButton}
					</Button>
				</ContentModalContainer>
			</Modal>
			{type === ConsultationTypeEnum.EXAM && (
				<ModalPrepare
					examNumber={examNumber}
					specialty={specialty}
					isOpen={isModalPrepareOpen}
					onClose={setIsModalPrepareOpen}
				/>
			)}
		</>
	);
};

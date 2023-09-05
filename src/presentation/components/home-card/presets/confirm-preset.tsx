import React, {useState} from 'react';
import {MdChevronRight} from 'react-icons/md';
import {
	IconCheck,
	StethoscopeIcon,
	ToothIcon,
	ExamsIcon,
	TeleconsultationIcon,
} from 'presentation/components/icons';
import moment from 'moment';
import theme from 'presentation/styles/theme.styles';
import {translations} from 'presentation/translations';
import {Button} from 'presentation/components/button/button';
import {
	AgendamentoConsulta,
	ExamBooked,
	PatchMedicalConfirm,
	PatchMedicalConfirmParams,
	PatchOdontoConfirm,
	PatchExamsConfirm,
	PatchExamsConfirmParams,
} from 'domain/usecases';
import {ConsultationTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {formatText} from 'presentation/utils';
import {HomeCard} from '..';
import * as S from '../home-card.styles';

const localTranslations = translations['pt-br'].homePage;

const cardIcons = {
	saude: <StethoscopeIcon width={80} height={109} contained={false} />,
	teleconsulta: <StethoscopeIcon width={80} height={109} contained={false} />,
	odonto: <ToothIcon width={84} height={109} weight="0.5" color="#F38900" />,
	exame: <ExamsIcon width={78} height={85} color="#00ACD7" />,
};

type PresetProps = {
	cardData: AgendamentoConsulta | ExamBooked;
	confirmPatch?: PatchMedicalConfirm | PatchOdontoConfirm | PatchExamsConfirm;
	appointmentType: ConsultationTypeEnum;
	linkAction: (data: AgendamentoConsulta | ExamBooked) => void;
};

export const ConfirmPreset = (props: PresetProps) => {
	const {
		cardData,
		confirmPatch,
		linkAction,
		appointmentType = ConsultationTypeEnum.HEALTH,
	} = props;

	const [localCardData, setLocalCardData] = useState<AgendamentoConsulta | ExamBooked>(cardData);
	const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);

	const isExam = appointmentType === ConsultationTypeEnum.EXAM;

	const checkConfirm = (appointmentDate: string) => {
		const referenceDate = moment();
		return moment(referenceDate, 'DD/MM/YYYY HH:mm:ss').isAfter(
			moment(appointmentDate, 'DD/MM/YYYY HH:mm:ss').subtract(48, 'hours'),
		);
	};

	function handleConfirm(appointmentNumber: string | number) {
		setIsConfirmLoading(true);

		const defaultConfirmBody = {
			nuConsulta: appointmentNumber,
			flagConfirmado: 's',
		};
		const examConfirmBody = {
			nuExame: appointmentNumber,
			cdPontoEntrada: '1',
			flConfirmado: 'S',
		};

		const getPatchConfirmPromise = (): Promise<unknown> => {
			if (isExam) {
				return (confirmPatch as PatchExamsConfirm).patch(
					examConfirmBody as PatchExamsConfirmParams,
				);
			}
			return (confirmPatch as PatchMedicalConfirm).patch(
				defaultConfirmBody as PatchMedicalConfirmParams,
			);
		};

		getPatchConfirmPromise()
			.then(() => {
				setLocalCardData({
					...localCardData,
					[isExam ? 'flConfirmado' : 'confirmado']: 'Sim',
				});
			})
			.catch(error => console.log('HomeCard Error:', error))
			.finally(() => setIsConfirmLoading(false));
	}

	const variableData = {
		appointmentDate: isExam
			? (localCardData as ExamBooked).dtExameMarcado
			: (localCardData as AgendamentoConsulta).dtConsulta,
		confirmed: isExam
			? (localCardData as ExamBooked).flConfirmado
			: (localCardData as AgendamentoConsulta).confirmado,
		appointmentNumber: isExam
			? (localCardData as ExamBooked).nuExame
			: (localCardData as AgendamentoConsulta).nuConsulta,
		appointmentEvent: isExam
			? (localCardData as ExamBooked).nmTipoExame
			: (localCardData as AgendamentoConsulta).dsEspecialidade,
	};

	return (
		<HomeCard
			title={
				<>
					{isExam ? localTranslations.examTitle : localTranslations.consultTitle}{' '}
					{variableData.appointmentDate.split(' ')[0]}
					{localCardData.tipoConsulta === ConsultationTypeEnum.TELECONSULTATION && (
						<TeleconsultationIcon height={12} width={25} />
					)}
				</>
			}
			content={
				<>
					<strong>
						{formatText(variableData.appointmentEvent)} {localTranslations.atTime}{' '}
						{variableData.appointmentDate.split(' ')[1].replace(':', 'h').split(':')[0]}
					</strong>{' '}
					{localTranslations.inPlace} {formatText(localCardData.nmPrestadorJuridico)}
				</>
			}
			textColor="#666666"
			rightIcon={cardIcons[appointmentType]}
			footer={
				<>
					{checkConfirm(variableData.appointmentDate) &&
						(variableData.confirmed === 'Sim' || variableData.confirmed === 'S' ? (
							<S.ConfirmedSpan>
								<p>{localTranslations.confirmed}</p>
								<IconCheck width={14} height={13} fill={theme.colors.success} />
							</S.ConfirmedSpan>
						) : (
							<Button
								onClick={() => handleConfirm(variableData.appointmentNumber)}
								isLoading={isConfirmLoading}
								spacingInsetX="xs"
								color="success">
								{localTranslations.IWill}
							</Button>
						))}
					<S.Link
						spaceLeft={checkConfirm(variableData.appointmentDate)}
						onClick={() => linkAction(localCardData)}>
						{localTranslations.details}
						<MdChevronRight />
					</S.Link>
				</>
			}
		/>
	);
};

import React from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';

import {ConfirmPreset} from 'presentation/components/home-card';
import {Slider} from 'presentation/components/slider';
import {ConsultationTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {useNavigate} from 'react-router-dom';
import {CardEmpty} from 'presentation/components/card-empty/card-empty';
import {translations} from 'presentation/translations';
import {
	AgendamentoConsulta,
	ExamBooked,
	PatchExamsConfirm,
	PatchMedicalConfirm,
	PatchOdontoConfirm,
} from 'domain/usecases';
import {appointmentDetailsState} from 'presentation/pages/my-appointments-flow/atoms';
import {examDetailsState} from 'presentation/pages/my-exams-flow/atoms';
import {homeState} from '../../atoms';

const localTranslations = translations['pt-br'].homePage;

interface AppointimentsListProps {
	medicalRebookConfirm: PatchMedicalConfirm;
	odontoRebookConfirm: PatchOdontoConfirm;
	examRebookConfirm: PatchExamsConfirm;
}

export function AppointmentsList({
	medicalRebookConfirm,
	odontoRebookConfirm,
	examRebookConfirm,
}: AppointimentsListProps) {
	const {agendamentosExames, agendamentosOdonto, agendamentosSaude, agendamentosTeleconsulta} =
		useRecoilValue(homeState);
	const setAppointmentDetails = useSetRecoilState(appointmentDetailsState);
	const setExamDetails = useSetRecoilState(examDetailsState);

	const hasNoAppointments =
		agendamentosSaude.concat(agendamentosOdonto, agendamentosTeleconsulta).length === 0 &&
		agendamentosExames.length === 0;

	const navigate = useNavigate();

	function goToMyConsults(details: AgendamentoConsulta) {
		setAppointmentDetails(details);
		navigate('/minhas-consultas/detalhes-da-consulta');
	}

	function goToMyExams(details: ExamBooked) {
		setExamDetails(details);
		navigate('/meus-exames/detalhes-do-exame');
	}

	return (
		<>
			{hasNoAppointments ? (
				<CardEmpty title={localTranslations.consultsEmptyTitle}>
					{localTranslations.consultsEmpty}
				</CardEmpty>
			) : (
				<Slider step={376} spaceBetween={30}>
					{agendamentosTeleconsulta.map(data => (
						<ConfirmPreset
							key={data.nuProtocolo}
							cardData={data}
							confirmPatch={medicalRebookConfirm}
							appointmentType={ConsultationTypeEnum.TELECONSULTATION}
							linkAction={() => goToMyConsults(data)}
						/>
					))}
					{agendamentosSaude.map(data => (
						<ConfirmPreset
							key={data.nuProtocolo}
							cardData={data}
							confirmPatch={medicalRebookConfirm}
							appointmentType={ConsultationTypeEnum.HEALTH}
							linkAction={() => goToMyConsults(data)}
						/>
					))}
					{agendamentosOdonto.map(data => (
						<ConfirmPreset
							key={data.nuProtocolo}
							cardData={data}
							confirmPatch={odontoRebookConfirm}
							appointmentType={ConsultationTypeEnum.ODONTO}
							linkAction={() => goToMyConsults(data)}
						/>
					))}
					{agendamentosExames.map(data => (
						<ConfirmPreset
							key={data.nuProtocolo}
							cardData={data}
							confirmPatch={examRebookConfirm}
							appointmentType={ConsultationTypeEnum.EXAM}
							linkAction={() => goToMyExams(data)}
						/>
					))}
				</Slider>
			)}
		</>
	);
}

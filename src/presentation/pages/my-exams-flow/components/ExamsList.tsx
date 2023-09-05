import React from 'react';
import {useRecoilValue} from 'recoil';
import moment from 'moment';

import {CardEmpty} from 'presentation/components/card-empty/card-empty';
import {MyAppointmentsCard} from 'presentation/components/card-my-appointments';
import {Slider} from 'presentation/components/slider';
import {translations} from 'presentation/translations';
import {ExamBooked} from 'domain/usecases';
import {accountDataState} from 'presentation/pages/entry-flow/atoms';
import {filteredExamsState} from '../atoms';

export type Options = 'Próximos exames' | 'Resultados de exames';

interface ExamsListProps {
	handleGoToDetails: (data: ExamBooked) => void;
	handleReschedule: (data: ExamBooked) => void;
	handleCancelExam: (examCode: string) => Promise<void>;
	handleConfirmExam: (examCode: string) => Promise<void>;
}

function checkConfirm(value: string) {
	const referenceDate = moment();

	return moment(referenceDate, 'DD/MM/YYYY HH:mm:ss').isAfter(
		moment(value, 'DD/MM/YYYY HH:mm:ss').subtract(48, 'hours'),
	);
}

export function ExamsList({
	handleCancelExam,
	handleConfirmExam,
	handleGoToDetails,
	handleReschedule,
}: ExamsListProps) {
	const exams = useRecoilValue(filteredExamsState);
	const {beneficiary} = useRecoilValue(accountDataState);
	const isEmpty = exams.length === 0;

	return (
		<div>
			{isEmpty ? (
				<CardEmpty>{translations['pt-br'].appointmentsFlow.emptyHealthCard}</CardEmpty>
			) : (
				<Slider step={380} spaceBetween={32}>
					{exams.map(exam => (
						<MyAppointmentsCard
							key={exam.nuExame}
							confirmed={exam.flConfirmado === 'S'}
							type={exam.tipoConsulta}
							confirmationAppointmentDate={checkConfirm(exam.dtExameMarcado)}
							protocol={exam.nuProtocolo}
							dateAppointment={exam.dtExameMarcado}
							patient={beneficiary.nmUsuarioC}
							doctor={exam.nmPrestadorFisico}
							clinic={exam.nmPrestadorJuridico}
							address={exam.dsEnderecoPrestadorJuridico}
							specialty={exam.nmTipoExame}
							examNumber={exam.cdTipoExame}
							cancelAppointmentExam={handleCancelExam}
							appointmentNumber={String(exam.nuExame)}
							onClickDetail={() => handleGoToDetails(exam)}
							onClickMarkdown={() => handleReschedule(exam)}
							onClickIgo={() => handleConfirmExam(String(exam.nuExame))}
						/>
					))}
				</Slider>
			)}
		</div>
	);
}

import React from 'react';

import {makePostExamsCancelBooked, makePatchExamsConfirmBooked} from 'main/factories/usecases';
import {MyExams} from 'presentation/pages/my-exams-flow';

export const MakeMyExams: React.FC = () => (
	<MyExams
		cancelAppointmentExam={makePostExamsCancelBooked()}
		confirmAppointmentExams={makePatchExamsConfirmBooked()}
	/>
);

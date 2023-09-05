import React, {Suspense} from 'react';
import {makePostExamsCancelBooked} from 'main/factories/usecases';
import {MyExamsDetail} from 'presentation/pages/my-exams-flow/my-exams-detail';
import {Loading} from 'presentation/components/loading';

export const MakeMyExamsDetail: React.FC = () => (
	<Suspense fallback={<Loading customMsg="Carregando..." />}>
		<MyExamsDetail cancelAppointmentExam={makePostExamsCancelBooked()} />
	</Suspense>
);

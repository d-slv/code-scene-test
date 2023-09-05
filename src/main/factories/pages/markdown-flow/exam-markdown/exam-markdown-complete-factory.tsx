import React, {Suspense} from 'react';

import {ExamMarkdownCompleted} from 'presentation/pages/rebooking-flow/exam/components';
import {Loading} from 'presentation/components/loading';

export const MakeExamMarkdownCompleted: React.FC = () => (
	<Suspense fallback={<Loading customMsg="Carregando..." />}>
		<ExamMarkdownCompleted />
	</Suspense>
);

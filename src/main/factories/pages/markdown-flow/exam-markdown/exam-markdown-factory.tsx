import React from 'react';

import {makePostExamsRebook} from 'main/factories/usecases';
import {ExamMarkdown} from 'presentation/pages/rebooking-flow/exam/exam-markdown';

export const MakeExamMarkdown: React.FC = () => <ExamMarkdown rebooking={makePostExamsRebook()} />;

import React from 'react';

import {ExamBooking} from 'presentation/pages/booking-flow/index';
import {
	makePostExamBooking,
	makePostExamsRebook,
	makeGetExamsAuthorizedPassword,
	makeGetExamsAuthorizedPrePassword,
} from 'main/factories/usecases';

export const MakeExamBooking: React.FC = () => (
	<ExamBooking
		booking={makePostExamBooking()}
		rebooking={makePostExamsRebook()}
		authorizedPassword={makeGetExamsAuthorizedPassword()}
		authorizedPrePassword={makeGetExamsAuthorizedPrePassword()}
	/>
);

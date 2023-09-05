import React from 'react';
import {HomePage} from 'presentation/pages/entry-flow/home-page';
import {
	makePatchMedicalConfirmBooked,
	makePatchOdontoConfirmBooked,
	makeGetFiveStars,
	makePostFiveStars,
	makeGetObligationPdf,
	makePostOperationalCostPassword,
	makePatchExamsConfirmBooked,
	makeGetMedicalCard,
} from 'main/factories/usecases';

export const MakeHomePage: React.FC = () => (
	<HomePage
		medicalRebookConfirm={makePatchMedicalConfirmBooked()}
		odontoRebookConfirm={makePatchOdontoConfirmBooked()}
		examRebookConfirm={makePatchExamsConfirmBooked()}
		obligationPdf={makeGetObligationPdf()}
		questions={makeGetFiveStars()}
		answers={makePostFiveStars()}
		operationalCostPassword={makePostOperationalCostPassword()}
		medicalCard={makeGetMedicalCard()}
	/>
);

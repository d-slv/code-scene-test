import React from 'react';
import {
	makeGetServices,
	makeGetCategories,
	makeGetSubCategories,
} from 'main/factories/usecases/help-flow';
import {HelpCenter} from 'presentation/pages/help-flow/help-center';

export const MakeHelpCenter: React.FC = () => (
	<HelpCenter
		services={makeGetServices()}
		categories={makeGetCategories()}
		subCategories={makeGetSubCategories()}
	/>
);

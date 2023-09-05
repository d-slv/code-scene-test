import React, {memo} from 'react';

import {translations} from '../../../translations';
import {ArrowDownIcon, Container, Title, Text, BoldText} from './styles';

const InfoCard: React.FC = () => (
	<Container>
		<Title>{translations['pt-br'].selectContractPage.titleWelcome}</Title>
		<Text>
			<BoldText>{translations['pt-br'].selectContractPage.contentWelcome}</BoldText>{' '}
			{translations['pt-br'].selectContractPage.contentWelcomeContinue}
		</Text>
		<ArrowDownIcon />
	</Container>
);

export default memo(InfoCard);

import React from 'react';
import {useRecoilValue, useResetRecoilState} from 'recoil';
import {MdDownload} from 'react-icons/md';

import {WarningBar} from 'presentation/components/warning-bar';
import {translations} from 'presentation/translations';
import {tabState, warningBarState} from 'presentation/pages/my-payments-flow/atoms';
import {WarningBarContainer} from './styles';

const localTranslations = translations['pt-br'].myPaymentsPage;

export function PaymentsWarningBar() {
	const currentTab = useRecoilValue(tabState);
	const handleDismiss = useResetRecoilState(warningBarState(currentTab.slang));

	return (
		<WarningBarContainer>
			<WarningBar
				leftIcon={<MdDownload size={16} />}
				content={
					<>
						{localTranslations[currentTab.slang].warningText}&nbsp;
						<b>&ldquo;{localTranslations[currentTab.slang].downloadText}&ldquo;</b>
					</>
				}
				showCloseButton
				closeCallback={handleDismiss}
			/>
		</WarningBarContainer>
	);
}

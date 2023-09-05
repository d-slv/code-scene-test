import {Button} from 'presentation/components/button/button';
import {translations} from 'presentation/translations';
import {formatMasks} from 'presentation/utils';
import React, {useState} from 'react';

interface PhoneButtonProps {
	phoneNumber?: string;
}

export default function PhoneButton({phoneNumber}: PhoneButtonProps) {
	const localTranslations = translations['pt-br'].guideFlow;
	const [showTooltip, setShowTooltip] = useState(false);

	const buttonText = (() => {
		if (phoneNumber) {
			const formattedPhone = formatMasks('phone', phoneNumber).replace(/\//g, '');
			return showTooltip ? localTranslations.copiedContact : formattedPhone;
		}
		return localTranslations.uninformedContact;
	})();

	const copyToClipboard = () => {
		if (phoneNumber) {
			const formattedPhone = formatMasks('phone', phoneNumber).replace(/\//g, '');
			setShowTooltip(true);
			navigator.clipboard.writeText(formattedPhone);
			setTimeout(() => {
				setShowTooltip(false);
			}, 2500);
		}
	};

	return (
		<Button fontWeight={'regular'} spacingInsetX={'nano'} onClick={copyToClipboard}>
			{buttonText}
		</Button>
	);
}

import {ShiftType} from 'presentation/pages/booking-flow/exam-booking/atoms';
import React, {useState} from 'react';

import theme from '../../styles/theme.styles';
import {translations} from '../../translations';
import {ContainerPeriod, PeriodCard, IconMorning, IconAfternoon, IconNight} from './styles';

interface ShiftButtonProps {
	onChange: (value: ShiftType) => void;
}
export const ShiftButton: React.FC<ShiftButtonProps> = ({onChange}) => {
	const [selected, setSelected] = useState('');

	function handleClick(value: ShiftType) {
		setSelected(value);
		onChange(value);
	}

	return (
		<ContainerPeriod>
			<PeriodCard val="M" onClick={() => handleClick('M')} isSelected={selected === 'M'}>
				<IconMorning
					fill={selected === 'M' ? theme.colors.white : theme.colors['primaryBlue.500']}
				/>
				{translations['pt-br'].shiftButton.morning}
			</PeriodCard>
			<PeriodCard val="T" onClick={() => handleClick('T')} isSelected={selected === 'T'}>
				<IconAfternoon
					fill={selected === 'T' ? theme.colors.white : theme.colors['primaryBlue.500']}
				/>
				{translations['pt-br'].shiftButton.afternoon}
			</PeriodCard>
			<PeriodCard val="N" onClick={() => handleClick('N')} isSelected={selected === 'N'}>
				<IconNight
					fill={selected === 'N' ? theme.colors.white : theme.colors['primaryBlue.500']}
				/>
				{translations['pt-br'].shiftButton.night}
			</PeriodCard>
		</ContainerPeriod>
	);
};

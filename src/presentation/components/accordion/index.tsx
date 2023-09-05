import React, {useState} from 'react';
import {IoIosArrowUp} from 'react-icons/io';
import theme from 'presentation/styles/theme.styles';
import {RadioCheckButtonContainer} from '../radio-check-button';
import * as S from './styles';

type RadioCheckButtonValues = number | string | object;

interface AccordionProps {
	cleanBooking: () => void;
	setBooking: (value: RadioCheckButtonValues) => void;
	data: {provider: string; cdProviders: string; horarios: Array<string>}[];
	onClick?: (value: RadioCheckButtonValues) => void;
}

export const Accordion: React.FC<AccordionProps> = ({data, setBooking, cleanBooking, onClick}) => {
	const [state, setState] = useState(false);
	const [selected, setSelected] = useState(null);

	const toogle = i => {
		if (selected === i) {
			setSelected(null);
			setState(false);
			cleanBooking();
		}
		setSelected(i);
		setState(false);
		cleanBooking();
	};

	return (
		<S.Wrapper>
			{data.map((item, i) => (
				<S.ContainerAccordion
					className={state === false && 'hide'}
					key={i}
					onClick={() => onClick(item)}>
					<S.AccordionTitle onClick={() => toogle(i)}>
						<h2>{item.provider.toLowerCase()}</h2>
						{selected === i ? (
							<IoIosArrowUp />
						) : (
							<IoIosArrowUp style={{transform: 'rotate(180deg)'}} />
						)}
					</S.AccordionTitle>
					<S.AccordionResult className={selected === i ? 'show' : 'content'}>
						<RadioCheckButtonContainer
							unselectedColor={theme.colors['SecondaryBlue.500']}
							display={'flex'}
							setState={setState}
							onChange={value => setBooking(value)}
							list={item.horarios.sort().map(hour => ({
								key: hour,
								value: {
									nmPrestadorFisico: item.provider,
									cdPrestadorFisico: item.cdProviders,
									horarioAgendamento: hour,
								},
							}))}
						/>
					</S.AccordionResult>
				</S.ContainerAccordion>
			))}
		</S.Wrapper>
	);
};

import React, {ReactNode, useState} from 'react';
import theme from 'presentation/styles/theme.styles';
import * as S from './styles';

type HealthTypeCheckBoxValues = number | string | object;

interface HealthTypeCheckBoxContainerProps {
	onChange?: (value: HealthTypeCheckBoxValues) => void;
	list?: {
		icon: React.FC<{color: string}>;
		value: HealthTypeCheckBoxValues;
		title: HealthTypeCheckBoxValues;
		label: ReactNode;
	}[];
}

export const HealthTypeCheckBoxContainer: React.FC<HealthTypeCheckBoxContainerProps> = ({
	onChange,
	list,
}) => {
	const [value, setValue] = useState<string>('');

	function handleClick(valueProp: typeof value) {
		setValue(valueProp);
		onChange(JSON.parse(valueProp));
	}

	return (
		<S.CardContainerList>
			{list.map((item, key) => (
				<S.CardTypeOfConsultation
					selected={JSON.stringify(item.value) === value}
					onClick={() => handleClick(JSON.stringify(item.value))}
					key={key}>
					<S.ContentType>
						<i>
							<item.icon
								color={
									JSON.stringify(item.value) === value
										? theme.colors.white
										: theme.colors['primaryBlue.500']
								}
							/>
						</i>
						<S.RightContentType selected={JSON.stringify(item.value) === value}>
							<h3>{item.title}</h3>
							<p>{item.label}</p>
						</S.RightContentType>
					</S.ContentType>
					{JSON.stringify(item.value) === value && <S.CheckIcon />}
				</S.CardTypeOfConsultation>
			))}
		</S.CardContainerList>
	);
};

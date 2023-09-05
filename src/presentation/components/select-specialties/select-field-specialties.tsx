import React, {Dispatch, SetStateAction} from 'react';
import useOutsideClosing from 'presentation/hooks/useOutsideClosing';
import * as S from './select-field-specialties.styles';

interface SelectSpecialtiesProps {
	selectedOption: string;
	setSelectedOption: Dispatch<SetStateAction<string>>;
}

export const SelectDropdownSpecialties: React.FC<SelectSpecialtiesProps> = ({
	selectedOption,
	setSelectedOption,
}) => {
	const optionsType = [
		{icon: <S.CalendarClock />, title: 'Todos', inversedColor: false},
		{icon: <S.Health />, title: 'Saúde', inversedColor: false},
		{icon: <S.Tooth />, title: 'Odontológicas', inversedColor: true},
		{icon: <S.Teleconsultion />, title: 'Teleconsulta', inversedColor: false},
	];

	const {ref, isComponentVisible, handleClickOpen, handleClickClosing} = useOutsideClosing(false);

	const onOptionClicked = value => () => {
		setSelectedOption(value);
		handleClickClosing();
	};

	function iconSelected() {
		if (selectedOption === 'Saúde') {
			return <S.HealthInverted />;
		}
		if (selectedOption === 'Odontológicas') {
			return <S.ToothInverted />;
		}
		if (selectedOption === 'Teleconsulta') {
			return <S.TeleconsultionInverted />;
		}
		return <S.CalendarClockInverted />;
	}

	return (
		<S.DropDownContainer>
			<S.DropDownHeader onClick={handleClickOpen}>
				<>
					<S.DropDownHeaderContent>
						{
							<>
								{iconSelected()}
								{selectedOption}
							</>
						}
					</S.DropDownHeaderContent>

					<S.Flag />
				</>
			</S.DropDownHeader>
			{isComponentVisible && (
				<div ref={ref}>
					<S.DropDownListContainer>
						<S.DropDownList>
							{optionsType.map(option => (
								<S.ListItem
									onClick={onOptionClicked(option.title)}
									key={option.title}
									isInverted={option.inversedColor}>
									<>
										{option.icon}
										{option.title}
									</>
								</S.ListItem>
							))}
						</S.DropDownList>
					</S.DropDownListContainer>
				</div>
			)}
		</S.DropDownContainer>
	);
};

import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {MdArrowForward, MdArrowBack} from 'react-icons/md';
import * as S from './calendar.styles';

export interface CalendarProps {
	onChange: (value: string) => void;
	availableDays?: string[];
}
export const Calendar: React.FC<CalendarProps> = ({availableDays = [], onChange}) => {
	const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	const DAYS_OF_THE_WEEK = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
	const MONTHS = [
		'Janeiro',
		'Fevereiro',
		'Março',
		'Abril',
		'Maio',
		'Junho',
		'Julho',
		'Agosto',
		'Setembro',
		'Outubro',
		'Novembro',
		'Dezembro',
	];

	const today = new Date(moment(availableDays[0], 'DD/M/YYYY').toISOString());
	const [date, setDate] = useState(today);
	const [day, setDay] = useState(date.getDate());
	const [month, setMonth] = useState(date.getMonth());
	const [year, setYear] = useState(date.getFullYear());

	const [selectedDate, setSelectedDate] = useState('');

	function getStartDayOfMonth(dateY: Date) {
		const startDate = new Date(dateY.getFullYear(), dateY.getMonth(), 1).getDay();
		return startDate === 0 ? 7 : startDate;
	}

	const [startDay, setStartDay] = useState(getStartDayOfMonth(date));

	useEffect(() => {
		setDay(date.getDate());
		setMonth(date.getMonth());
		setYear(date.getFullYear());
		setStartDay(getStartDayOfMonth(date));
	}, [date]);

	function isLeapYear(yearY: number) {
		return (yearY % 4 === 0 && yearY % 100 !== 0) || yearY % 400 === 0;
	}

	const days = isLeapYear(year) ? DAYS_LEAP : DAYS;

	function formatDate(_day: number, _month: number, _year: number) {
		return moment(`${_day}/${_month + 1}/${_year}`, 'DD/MM/YYYY').format('DD/MM/YYYY');
	}

	function handleClick(value: string) {
		if (availableDays.includes(value)) {
			setSelectedDate(value);
			onChange(value);
		}
	}

	return (
		<S.Frame>
			<S.Header>
				<S.Button onClick={() => setDate(new Date(year, month - 1, day))}>
					<MdArrowBack />
				</S.Button>
				<div>
					{MONTHS[month]} {year}
				</div>
				<S.Button onClick={() => setDate(new Date(year, month + 1, day))}>
					<MdArrowForward />
				</S.Button>
			</S.Header>
			<S.SubHeader>
				{DAYS_OF_THE_WEEK.map((d, index) => (
					<S.WeekDay key={`${d}-${index}`}>
						<strong>{d}</strong>
					</S.WeekDay>
				))}
			</S.SubHeader>
			<S.Body>
				{Array(days[month] + (startDay - 1))
					.fill(null)
					.map((_, index) => {
						const d = index - (startDay - 2);
						return (
							<S.Day
								key={index}
								// isToday={d === today.getDate()}
								// isSelected={d === day}
								isAvailable={true}>
								{d > 0 ? (
									<S.dayValue
										onClick={() => handleClick(formatDate(d, month, year))}
										isSelected={selectedDate === formatDate(d, month, year)}
										isAvailable={availableDays.includes(
											formatDate(d, month, year),
										)}>
										{d}
									</S.dayValue>
								) : (
									<></>
								)}
							</S.Day>
						);
					})}
			</S.Body>
		</S.Frame>
	);
};

/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-shadow */
import React, {useRef, useState} from 'react';
import {BiCalendarCheck} from 'react-icons/bi';
import {translations} from 'presentation/translations';
import {SiApple, SiGooglecalendar, SiMicrosoftoutlook} from 'react-icons/si';
import {Button} from '../button/button';
import {ButtonEventProps} from './add-to-calendar-button.types';
import * as S from './styles';

type CalendarEventProps = {
	detail?: boolean;
	calendarEvent: ButtonEventProps;
};

export default function AddToCalendarButton({detail, calendarEvent}: CalendarEventProps) {
	const ref = useRef();
	useOnClickOutside(ref, () => setShowOptions(false));
	const [showOptions, setShowOptions] = useState(false);

	const MINUTE_IN_MS = 60 * 1000;

	function addMinutesToDate(date: Date, minutes: number) {
		return new Date(date.getTime() + minutes * MINUTE_IN_MS);
	}

	function formatDateForCalendarUrl(date: Date) {
		return date.toISOString().replace(/-|:|\.\d+/g, '');
	}

	function getEndTime() {
		return (
			calendarEvent.endDate ??
			addMinutesToDate(calendarEvent.startDate, calendarEvent.durationInMinutes)
		);
	}

	function generateGoogleCalendarUrl() {
		const startDate = formatDateForCalendarUrl(calendarEvent.startDate);
		const endDate = formatDateForCalendarUrl(getEndTime());

		return encodeURI(
			[
				'https://www.google.com/calendar/render',
				'?action=TEMPLATE',
				`&text=${calendarEvent.title || ''}`,
				`&dates=${startDate || ''}`,
				`/${endDate || ''}`,
				`&details=${calendarEvent.description || ''}`,
				`&location=${calendarEvent.address || ''}`,
				'&sprop=&sprop=name:',
			].join(''),
		);
	}

	function generateIcsCalendarFile() {
		const startDate = formatDateForCalendarUrl(calendarEvent.startDate);
		const endDate = formatDateForCalendarUrl(getEndTime());

		return encodeURI(
			`data:text/calendar;charset=utf8,${[
				'BEGIN:VCALENDAR',
				'VERSION:2.0',
				'BEGIN:VEVENT',
				`URL:${document.URL}`,
				`DTSTART:${startDate || ''}`,
				`DTEND:${endDate || ''}`,
				`SUMMARY:${calendarEvent.title || ''}`,
				`DESCRIPTION:${calendarEvent.description || ''}`,
				`LOCATION:${calendarEvent.address || ''}`,
				'END:VEVENT',
				'END:VCALENDAR',
			].join('\n')}`,
		);
	}

	function useOnClickOutside(reference, handler) {
		const listener = event => {
			if (!reference.current || reference.current.contains(event.target)) {
				return;
			}
			handler(event);
		};
		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);
		return () => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
		};
	}

	return (
		<S.ContainerTooltip>
			{showOptions && (
				<>
					<S.ContainerCalendar ref={ref}>
						<S.CalendarOptions onClick={() => setShowOptions(false)}>
							<S.IconContainer>
								<SiGooglecalendar />
							</S.IconContainer>
							<a
								href={generateGoogleCalendarUrl()}
								target="_blank"
								rel="noopener noreferrer">
								<p>Google</p>
							</a>
						</S.CalendarOptions>
						<S.CalendarOptions onClick={() => setShowOptions(false)}>
							<S.IconContainer>
								<SiMicrosoftoutlook />
							</S.IconContainer>
							<a
								href={generateIcsCalendarFile()}
								target="_blank"
								rel="noopener noreferrer">
								<p>Outlook</p>
							</a>
						</S.CalendarOptions>

						<S.CalendarOptions onClick={() => setShowOptions(false)}>
							<S.IconContainer>
								<SiApple />
							</S.IconContainer>
							<a
								href={generateIcsCalendarFile()}
								target="_blank"
								rel="noopener noreferrer">
								<p>Apple</p>
							</a>
						</S.CalendarOptions>
					</S.ContainerCalendar>
					<div
						id={!showOptions ? 'overlay' : 'none'}
						onClick={() => setShowOptions(false)}></div>
				</>
			)}
			{!detail ? (
				<Button
					spacingInsetY={'xs'}
					spacingInsetX={'sm'}
					color="SecondaryBlue.500"
					leftIcon={<BiCalendarCheck />}
					onClick={() => setShowOptions(true)}>
					{translations['pt-br'].bookingFlow.buttonSaveToCalendar}
				</Button>
			) : (
				<Button
					spacingInsetX={'sm'}
					spacingInsetY={'xs'}
					style={{width: '100%'}}
					color="SecondaryBlue.500"
					leftIcon={<BiCalendarCheck />}
					onClick={() => setShowOptions(true)}>
					{translations['pt-br'].bookingFlow.buttonSaveToCalendar}
				</Button>
			)}
		</S.ContainerTooltip>
	);
}

import React, {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {GetMedicalDates} from 'domain/usecases';
import {MdOutlineArrowBack} from 'react-icons/md';
import {translations} from 'presentation/translations';
import {Calendar} from 'presentation/components/calendar';
import {healthMarkdownStates} from 'presentation/pages/states/atoms';
import {ButtonsFailure, FailureToLoad} from 'presentation/components/failure-to-load';
import {CardUnavailable} from 'presentation/components/card-unavailable/card-unavailable';
import {RoomTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {Loading} from 'presentation/components/loading';
import * as S from './styles';

interface Step2Props {
	date: GetMedicalDates;
	onNextClick: () => void;
	onBackClick: () => void;
}

export const Step2: React.FC<Step2Props> = ({date, onNextClick, onBackClick}) => {
	const [datas, setDatas] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [showError, setShowError] = useState(false);
	const [healthMarkdown, setHealthMarkdown] = useRecoilState(healthMarkdownStates);

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepDateReschedule;
		date.get({
			specialty_code: healthMarkdown.cdEspecialidade,
			clinic_code: healthMarkdown.cdPrestadorJuridico,
		})
			.then(data => {
				setDatas(data.content);
			})
			.catch(error => {
				if (error.message.statusCode === 204) {
					setIsLoading(false);
				} else {
					setIsLoading(false);
					setShowError(true);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	const footerButtons = () => (
		<>
			<S.FooterCardButtons>
				<S.ButtonScheduleHealth
					fontSize={'xxs'}
					variant="outlined"
					onClick={() => {
						onBackClick();
						setHealthMarkdown({
							...healthMarkdown,
							cdPrestadorJuridico: '',
						});
					}}
					leftIcon={<MdOutlineArrowBack />}>
					{translations['pt-br'].bookingFlow.buttonPrev}
				</S.ButtonScheduleHealth>
				{!showError ? (
					<S.ButtonScheduleHealth
						color="primary"
						fontSize={'xxs'}
						variant="contained"
						onClick={() => onNextClick()}
						disabled={!healthMarkdown.dtConsulta}>
						{translations['pt-br'].bookingFlow.buttonNext}
					</S.ButtonScheduleHealth>
				) : (
					<ButtonsFailure />
				)}
			</S.FooterCardButtons>
		</>
	);

	return (
		<>
			{isLoading ? (
				<Loading style={{minHeight: 300}} />
			) : (
				<>
					{(() => {
						switch (true) {
							case datas.length === 0 && !showError: {
								return (
									<>
										<CardUnavailable
											type={'date'}
											roomType={RoomTypeEnum.HEALTH}
											onBackClick={onBackClick}
											user={healthMarkdown.nmUsuarioAux}
										/>
									</>
								);
							}
							case showError: {
								return (
									<>
										<FailureToLoad /> {footerButtons()}
									</>
								);
							}
							default: {
								return (
									<>
										<Calendar
											onChange={value =>
												setHealthMarkdown({
													...healthMarkdown,
													dtConsulta: value,
												})
											}
											availableDays={datas}
										/>
										{footerButtons()}
									</>
								);
							}
						}
					})()}
				</>
			)}
		</>
	);
};

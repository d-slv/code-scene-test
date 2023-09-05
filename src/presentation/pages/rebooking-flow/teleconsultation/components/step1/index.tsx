import React, {useEffect, useState} from 'react';
import amplitude from 'amplitude-js';
import {useRecoilState} from 'recoil';
import TagManager from 'react-gtm-module';
import {GetTelehealthDates} from 'domain/usecases';
import {translations} from 'presentation/translations';
import {Calendar} from 'presentation/components/calendar';
import {telehealthMarkdownStates} from 'presentation/pages/states/atoms';
import {ButtonsFailure, FailureToLoad} from 'presentation/components/failure-to-load';
import {CardUnavailable} from 'presentation/components/card-unavailable/card-unavailable';
import {RoomTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {Loading} from 'presentation/components/loading';
import * as S from './styles';

interface Step1Props {
	onNextClick: () => void;
	date: GetTelehealthDates;
}

export const Step1: React.FC<Step1Props> = ({date, onNextClick}) => {
	const [datas, setDatas] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [showError, setShowError] = useState(false);
	const [telehealthMarkdown, setTelehealthMarkdown] = useRecoilState(telehealthMarkdownStates);

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepDateReschedule;
		date.get({
			especialidade: telehealthMarkdown.cdEspecialidade,
			prestadorJuridico: telehealthMarkdown.cdPrestadorJuridico,
			subEspecialidade: telehealthMarkdown.cdSubEspecialidadeAux,
		})
			.then(data => {
				setDatas(data);
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
				{!showError ? (
					<S.ButtonScheduleHealth
						color="primary"
						fontSize={'xxs'}
						variant="contained"
						onClick={() => {
							const tagManagerArgs = {
								gtmId: 'GTM-KQKN552',
								events: {
									sendUserInfo: 'Iniciou remarcação teleconsulta',
								},
							};

							TagManager.initialize(tagManagerArgs);
							amplitude.getInstance().logEvent('Iniciou remarcação teleconsulta');
							onNextClick();
						}}
						disabled={!telehealthMarkdown.dtConsulta}>
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
					{datas.length !== 0 && !showError ? (
						<>
							<Calendar
								onChange={value =>
									setTelehealthMarkdown({
										...telehealthMarkdown,
										dtConsulta: value,
									})
								}
								availableDays={datas}
							/>
							{footerButtons()}
						</>
					) : (
						<CardUnavailable
							type={'date'}
							roomType={RoomTypeEnum.HEALTH}
							isTelemedicine={true}
							user={telehealthMarkdown.nmUsuarioAux}
						/>
					)}

					{showError && (
						<>
							<FailureToLoad />
							{footerButtons()}
						</>
					)}
				</>
			)}
		</>
	);
};

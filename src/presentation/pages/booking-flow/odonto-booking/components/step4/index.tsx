import React, {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {GetOdontoDates} from 'domain/usecases';
import {MdOutlineArrowBack} from 'react-icons/md';
import {translations} from 'presentation/translations';
import {Calendar} from 'presentation/components/calendar';
import {odontoBookingStates} from 'presentation/pages/states/atoms';
import {ButtonsFailure, FailureToLoad} from 'presentation/components/failure-to-load';
import {CardUnavailable} from 'presentation/components/card-unavailable/card-unavailable';
import {RoomTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {Loading} from 'presentation/components/loading';
import * as S from './styles';

interface Step4Props {
	date: GetOdontoDates;
	onNextClick: () => void;
	onBackClick: () => void;
}

export const Step4: React.FC<Step4Props> = ({date, onBackClick, onNextClick}) => {
	const [datas, setDatas] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [showError, setShowError] = useState(false);
	const [odontoBooking, setOdontoBooking] = useRecoilState(odontoBookingStates);

	useEffect(() => {
		date.get({
			tipoPesquisa: 'C',
			cdUf: odontoBooking.cdUfAux,
			nmCidade: odontoBooking.nmCidadeAux,
			cdEspecialidade: odontoBooking.cdEspecialidade,
			cdPrestadorJuridico: odontoBooking.cdPrestadorJuridico,
			cdSubEspecialidade: odontoBooking.cdSubEspecialidadeAux,
			cdAtendimentoAcessoEspecial: odontoBooking.cdAtendimentoAcessoEspecialAux,
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
				<S.ButtonScheduleHealth
					onClick={() => {
						onBackClick();
						setOdontoBooking({
							...odontoBooking,
							cdPrestadorJuridico: '',
						});
					}}
					fontSize={'xxs'}
					variant="outlined"
					leftIcon={<MdOutlineArrowBack />}>
					{translations['pt-br'].bookingFlow.buttonPrev}
				</S.ButtonScheduleHealth>
				{!showError ? (
					<S.ButtonScheduleHealth
						color="primary"
						fontSize={'xxs'}
						variant="contained"
						onClick={() => onNextClick()}
						disabled={!odontoBooking.dtConsulta}>
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
									setOdontoBooking({
										...odontoBooking,
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
							roomType={RoomTypeEnum.ODONTO}
							onBackClick={onBackClick}
							user={odontoBooking.nmUsuarioAux}
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

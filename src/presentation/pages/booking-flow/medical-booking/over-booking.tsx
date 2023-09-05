import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {MdOutlineArrowForward} from 'react-icons/md';
import {translations} from 'presentation/translations';
import {Button} from 'presentation/components/button/button';
import * as S from './styles';

export const OverBooking = () => {
	const navigate = useNavigate();

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepBeneficiary;
	}, []);

	return (
		<S.OverBookingCard>
			<S.ImageCard />

			<S.ContentCard>
				<S.RoundedIcon>
					<S.ConsultationOnline />
				</S.RoundedIcon>

				<h1>{translations['pt-br'].overBooking.title}</h1>

				<p>{translations['pt-br'].overBooking.content}</p>

				<S.FooterButtons>
					<Button
						fontSize={'xxs'}
						fontWeight={'bold'}
						onClick={() => navigate('/minhas-consultas/marcar-teleconsulta')}
						rightIcon={<MdOutlineArrowForward />}>
						{translations['pt-br'].overBooking.telemedicineButton}
					</Button>
					<Button
						fontSize={'xxs'}
						color="white"
						variant="outlined"
						onClick={() => navigate('/minhas-consultas/marcar-consulta-saude')}>
						{translations['pt-br'].overBooking.healthButton}
					</Button>
				</S.FooterButtons>
			</S.ContentCard>
		</S.OverBookingCard>
	);
};

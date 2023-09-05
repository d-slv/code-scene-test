import React, {Dispatch, SetStateAction} from 'react';
import {useNavigate} from 'react-router-dom';
import {RiErrorWarningLine} from 'react-icons/ri';
import {MdRefresh, MdOutlineHome} from 'react-icons/md';
import {Modal} from '../modal';
import {translations} from '../../translations';
import {Container, InfoContainer, ContainerButtons, ButtonFailure, ModalContainer} from './styles';

export const FailureToLoad = () => (
	<Container>
		<RiErrorWarningLine />
		<InfoContainer>{translations['pt-br'].failureToLoad.content}</InfoContainer>
	</Container>
);

export const ButtonsFailure = () => {
	const navigate = useNavigate();

	return (
		<ContainerButtons>
			<ButtonFailure
				fontSize={'xxs'}
				variant="outlined"
				style={{marginRight: '1rem'}}
				onClick={() => window.location.reload()}
				rightIcon={<MdRefresh />}>
				{translations['pt-br'].bookingFlow.buttonTryAgain}
			</ButtonFailure>
			<ButtonFailure
				color="primary"
				fontSize={'xxs'}
				variant="contained"
				onClick={() => navigate('/home')}
				rightIcon={<MdOutlineHome />}>
				{translations['pt-br'].bookingFlow.buttonReturnHome}
			</ButtonFailure>
		</ContainerButtons>
	);
};

interface FailureToLoadModalProps {
	isModalOpen: boolean;
	setIsModalOpen?: Dispatch<SetStateAction<boolean>>;
}

export const FailureToLoadModal: React.FC<FailureToLoadModalProps> = ({
	isModalOpen,
	setIsModalOpen,
}) => (
	<Modal
		isOpen={isModalOpen}
		title={''}
		variant="guide"
		style={{width: '25%'}}
		onClose={() => {
			setIsModalOpen(!isModalOpen);
		}}>
		<ModalContainer>
			<FailureToLoad />
			<ButtonFailure
				fontSize={'xxs'}
				variant="outlined"
				onClick={() => window.location.reload()}
				rightIcon={<MdRefresh />}>
				{translations['pt-br'].bookingFlow.buttonTryAgain}
			</ButtonFailure>
		</ModalContainer>
	</Modal>
);

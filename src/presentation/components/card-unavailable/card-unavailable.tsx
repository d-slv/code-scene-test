import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {MdOutlineForum} from 'react-icons/md';

import {makeGetChatRoom} from 'main/factories/usecases';
import {ChatRooms} from 'presentation/utils/chat-room-types';
import {FailureToLoadModal} from 'presentation/components/failure-to-load';
import {RoomTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {Button} from '../button/button';
import {translations} from '../../translations';
import {
	Container,
	LeftContent,
	RigthContent,
	SadFace,
	CardContent,
	ButtonsContainer,
} from './card-unavailable.styles';

interface CardUnavailableProps {
	user: string;
	isTelemedicine?: boolean;
	onBackClick?: () => void;
	roomType: RoomTypeEnum;
	type: 'date' | 'place' | 'hour' | 'odontoSpecialties' | 'odontoHour' | 'odontoProviders';
}

export const CardUnavailable: React.FC<CardUnavailableProps> = ({
	user,
	type,
	roomType,
	onBackClick,
	isTelemedicine,
}) => {
	const navigate = useNavigate();
	const [showError, setShowError] = useState(false);

	function callChatRoom(typeRoom, nome) {
		makeGetChatRoom()
			.get({roomType: typeRoom, nmUsuario: nome})
			.then(response => {
				window.open(response.url);
			})
			.catch(() => {
				setShowError(true);
			});
	}

	function usernameWithoutSpaces() {
		return user.replace(/\s/g, '');
	}

	function chatRoomType(newRoom: typeof roomType) {
		if (newRoom === RoomTypeEnum.HEALTH) {
			callChatRoom(ChatRooms.beta, usernameWithoutSpaces());
		} else if (newRoom === RoomTypeEnum.EXAM) {
			callChatRoom(ChatRooms.exams, usernameWithoutSpaces());
		} else {
			callChatRoom(ChatRooms.odonto, usernameWithoutSpaces());
		}
	}

	const openOdontoGuide = () => {
		window.open(
			'https://www.hapvida.com.br/pls/podontow/webNewDentalCliente.pr_login_cliente_opmenu?pOrgAmb=2&pOpMenu=1',
		);
	};

	return (
		<>
			<Container>
				<LeftContent>
					<SadFace />
				</LeftContent>
				{(() => {
					switch (type) {
						case 'place': {
							return (
								<RigthContent>
									<CardContent>
										<h3>
											{translations['pt-br']['card-unavailable'].titlePlace}
										</h3>

										<p>
											{
												translations['pt-br']['card-unavailable']
													.contentInfoPlace
											}{' '}
											<b>
												{
													translations['pt-br']['card-unavailable']
														.contentInfoPlaceStrong
												}
											</b>
										</p>
									</CardContent>
									<ButtonsContainer>
										<Button
											color="primary"
											variant="contained"
											onClick={() => navigate('/home')}>
											PÁGINA INICIAL
										</Button>
										<Button
											variant="outlined"
											onClick={() => {
												chatRoomType(roomType);
											}}>
											CHAT ONLINE
										</Button>
									</ButtonsContainer>
								</RigthContent>
							);
						}
						case 'date': {
							return (
								<RigthContent>
									<CardContent>
										<h3>
											{translations['pt-br']['card-unavailable'].titleDate}
										</h3>

										<p>
											{
												translations['pt-br']['card-unavailable']
													.contentInfoDate
											}{' '}
											<b>
												{
													translations['pt-br']['card-unavailable']
														.contentInfoDateStrong
												}
											</b>
										</p>
									</CardContent>
									<ButtonsContainer>
										<Button
											color="primary"
											variant="contained"
											leftIcon={<MdOutlineForum />}
											onClick={() => chatRoomType(roomType)}>
											CONVERSAR COM ATENDENTE
										</Button>
										{isTelemedicine ? (
											<Button
												variant="outlined"
												onClick={() => navigate('/home')}>
												PÁGINA INICIAL
											</Button>
										) : (
											<Button variant="outlined" onClick={onBackClick}>
												ESCOLHER OUTRO ESTABELECIMENTO
											</Button>
										)}
									</ButtonsContainer>
								</RigthContent>
							);
						}
						case 'hour': {
							return (
								<RigthContent>
									<CardContent>
										<h3>
											{translations['pt-br']['card-unavailable'].titleHour}
										</h3>

										<p>
											{
												translations['pt-br']['card-unavailable']
													.contentInfoHour
											}{' '}
											<b>
												{
													translations['pt-br']['card-unavailable']
														.contentInfoHourStrong
												}
											</b>
										</p>
									</CardContent>
									<ButtonsContainer>
										<Button
											color="primary"
											variant="contained"
											leftIcon={<MdOutlineForum />}
											onClick={() => chatRoomType(roomType)}>
											CONVERSAR COM ATENDENTE
										</Button>
										<Button variant="outlined" onClick={onBackClick}>
											ESCOLHER OUTRA DATA
										</Button>
									</ButtonsContainer>
								</RigthContent>
							);
						}
						case 'odontoSpecialties': {
							return (
								<RigthContent>
									<CardContent>
										<h3>
											{
												translations['pt-br']['card-unavailable']
													.titleSpecialty
											}
										</h3>

										<p>
											{
												translations['pt-br']['card-unavailable']
													.contentInfoSpecialty
											}{' '}
											<b>
												{
													translations['pt-br']['card-unavailable']
														.contentInfoSpecialtyStrong
												}
											</b>
										</p>
									</CardContent>
									<ButtonsContainer>
										<Button
											variant="outlined"
											leftIcon={<MdOutlineForum />}
											onClick={() => chatRoomType(roomType)}>
											CONVERSAR COM ATENDENTE
										</Button>
										<Button
											color="primary"
											variant="outlined"
											onClick={() => openOdontoGuide()}>
											ACESSAR GUIA ODONTO
										</Button>
										<Button variant="outlined" onClick={onBackClick}>
											ESCOLHER OUTRA ESPECIALIDADE
										</Button>
									</ButtonsContainer>
								</RigthContent>
							);
						}
						case 'odontoHour': {
							return (
								<RigthContent>
									<CardContent>
										<h3>
											{
												translations['pt-br']['card-unavailable']
													.titleHourOdonto
											}
										</h3>

										<p>
											{
												translations['pt-br']['card-unavailable']
													.contentInfoHourOdonto
											}{' '}
											<b>
												{
													translations['pt-br']['card-unavailable']
														.contentInfoHourStrongOdonto
												}
											</b>
										</p>
									</CardContent>
									<ButtonsContainer>
										<Button
											variant="outlined"
											leftIcon={<MdOutlineForum />}
											onClick={() => chatRoomType(roomType)}>
											CONVERSAR COM ATENDENTE
										</Button>
										<Button
											color="primary"
											variant="outlined"
											onClick={() => openOdontoGuide()}>
											ACESSAR GUIA ODONTO
										</Button>
										<Button variant="outlined" onClick={onBackClick}>
											ESCOLHER OUTRA ESPECIALIDADE
										</Button>
									</ButtonsContainer>
								</RigthContent>
							);
						}
						case 'odontoProviders': {
							return (
								<RigthContent>
									<CardContent>
										<h3>
											{
												translations['pt-br']['card-unavailable']
													.titleProvidersOdonto
											}
										</h3>

										<p>
											{
												translations['pt-br']['card-unavailable']
													.contentInfoProvidersOdonto
											}{' '}
											<b>
												{
													translations['pt-br']['card-unavailable']
														.contentInfoProvidersStrongOdonto
												}
											</b>
										</p>
									</CardContent>
									<ButtonsContainer>
										<Button
											variant="outlined"
											leftIcon={<MdOutlineForum />}
											onClick={() => chatRoomType(roomType)}>
											CONVERSAR COM ATENDENTE
										</Button>
										<Button
											color="primary"
											variant="outlined"
											onClick={() => openOdontoGuide()}>
											ACESSAR GUIA ODONTO
										</Button>
										<Button variant="outlined" onClick={onBackClick}>
											ESCOLHER OUTRA ESPECIALIDADE
										</Button>
									</ButtonsContainer>
								</RigthContent>
							);
						}
						default:
							return 'place';
					}
				})()}
			</Container>

			<FailureToLoadModal isModalOpen={showError} setIsModalOpen={setShowError} />
		</>
	);
};

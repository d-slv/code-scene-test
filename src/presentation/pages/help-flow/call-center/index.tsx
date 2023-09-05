import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Modal} from 'presentation/components/modal';
import {MdOutlineArrowBack, MdSend} from 'react-icons/md';
import {SelectLocationField} from 'presentation/components/select-location-field';
import {Button} from 'presentation/components/button/button';
import {MessageSent} from 'presentation/components/icons/message-sent';
import * as S from './styles';

export const CallCenter: React.FC = () => {
	const navigate = useNavigate();
	const [commentText, setCommentText] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);

	const motive = ['Selecione', 'Alteração Cadastral', 'Coronavírus'];

	const phoneNumbers = ['Selecione', '(85)99654-7486', '(63)98132-3304'];

	function renderList(item: string[]) {
		return item.map((obj, index) => (
			<option key={index} value={obj}>
				{obj}
			</option>
		));
	}

	return (
		<>
			<S.MainContainer>
				<S.HeaderContainer>
					<S.TitlePage>Central de Atendimento</S.TitlePage>
					<S.SubtitlePage>
						Não encontrou a ajuda que precisava?{' '}
						<b>Mande uma mensagem com a sua dúvida que nós vamos te ajudar!</b>
					</S.SubtitlePage>
				</S.HeaderContainer>

				<S.ContentContainer>
					<S.ContentSelect>
						<S.LabelSelect>Qual o motivo da sua mensagem?</S.LabelSelect>
						<SelectLocationField>{renderList(motive)}</SelectLocationField>
					</S.ContentSelect>

					<S.ContentSelect>
						<S.LabelSelect>Qual dos seus contatos é WhatsApp?</S.LabelSelect>
						<SelectLocationField>{renderList(phoneNumbers)}</SelectLocationField>
					</S.ContentSelect>

					<S.ContentSelect>
						<S.LabelSelect>Escreva a sua dúvida em detalhes:</S.LabelSelect>
						<S.InputArea
							value={commentText}
							onChange={e => setCommentText(e.target.value)}
						/>
					</S.ContentSelect>
				</S.ContentContainer>

				<S.FooterCard>
					<S.OptionsButton
						fontSize={'xxs'}
						onClick={() => navigate('/central-de-ajuda')}
						leftIcon={<MdOutlineArrowBack />}
						variant="outlined">
						Retornar às perguntas
					</S.OptionsButton>
					<S.OptionsButton
						color="primary"
						fontSize={'xxs'}
						variant="contained"
						rightIcon={<MdSend />}
						onClick={() => setIsModalOpen(true)}>
						Enviar
					</S.OptionsButton>
				</S.FooterCard>
			</S.MainContainer>

			<Modal
				isOpen={isModalOpen}
				style={{width: '50%'}}
				title={'Mensagem para atendimento'}
				variant="guide"
				onClose={() => {
					setIsModalOpen(!isModalOpen);
				}}>
				<S.ModalContent>
					<MessageSent />
					<S.ModalTitleContent>
						Recebemos a <b>sua mensagem!</b>
					</S.ModalTitleContent>
					<S.ModalSubtitleContent>
						Após o recebimento da sua mensagem, nossa equipe entrará em contato com você
						por telefone, e-mail e WhatsApp em até 5 dias úteis. Nossas ligações têm
						origem do DDD 85. Fique atento!
					</S.ModalSubtitleContent>
					<S.ProtocolNumber>
						<b>Protocolo: </b> 0190423957369
					</S.ProtocolNumber>
					<S.ModalButton>
						<Button
							onClick={() => {
								setIsModalOpen(!isModalOpen);
							}}
							color="primary"
							variant="contained">
							Pronto
						</Button>
					</S.ModalButton>
				</S.ModalContent>
			</Modal>
		</>
	);
};

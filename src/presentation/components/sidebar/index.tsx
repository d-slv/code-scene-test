/* eslint-disable no-alert */
import React, {useState} from 'react';
import {IoIosPulse} from 'react-icons/io';
import {GrCircleAlert} from 'react-icons/gr';
import {useRecoilValue} from 'recoil';
import {useNavigate} from 'react-router-dom';
import {
	MdHome,
	MdCalendarToday,
	MdAttachMoney,
	MdLocationPin,
	MdOutlineMessage,
} from 'react-icons/md';
import {makeGetChatRoom, makePostOperationalCostPassword} from 'main/factories/usecases';
import {accountDataState} from 'presentation/pages/entry-flow/atoms';
import {SidebarTitlesEnum} from 'presentation/constants/pageTitlesEnum';
import {checkMasks, ChatRooms} from 'presentation/utils';
import {Modal} from '../modal';
import {SadFaceIcon, ToothIcon} from '../icons';
import {Button} from '../button/button';
import {
	Container,
	Divider,
	InputCode,
	NavItemIcon,
	NavItemText,
	Logo,
	LogoContainer,
	LogoIcon,
	ModalContainer,
	ModalContainerOperacionalPass,
	ModalContent,
	ModalContentOperacionalPass,
	ModalHeaderPendency,
	ModalOperationalContent,
	ModalOperationalHeader,
	NavContainer,
	NavItem,
	RecallItem,
	SideDrop,
	NavExternalItem,
} from './styles';
import {PerksClubIcon} from '../icons/perks-club-icon';
import {getPerksClubLink} from '../../utils/getPerksClubLink';
import {FailureToLoadModal} from '../failure-to-load';

interface MenuItem {
	title: string;
	icon: JSX.Element;
	url: string;
	hidden?: boolean;
	isOperationalCostInactive?: boolean;
	needPass?: boolean;
	isExternalUrl?: boolean;
}

interface MenuListProps {
	verifyPermissions: (event: React.MouseEvent, url: string, shouldBlockRouting?: boolean) => void;
	isExpanded?: boolean;
}

function MenuList({verifyPermissions, isExpanded}: MenuListProps) {
	const {
		sidebar: {ctOperacional, flPlanoSomenteHospitalar},
		beneficiary: {nmUsuarioC, nuCpfC, tipoContratacao, tipoPlanoC},
	} = useRecoilValue(accountDataState);

	const opInativo = tipoContratacao === 'EMPRESARIAL' && !ctOperacional?.ativo;

	const exigeSenha = tipoContratacao === 'EMPRESARIAL' && ctOperacional?.exigeSenha;

	const items: MenuItem[] = [
		{
			title: SidebarTitlesEnum.HOME,
			icon: <MdHome />,
			url: `/home`,
			hidden: false,
		},
		{
			title: SidebarTitlesEnum.MY_APPOINTMENTS,
			icon: <MdCalendarToday />,
			url: '/minhas-consultas',
			hidden: flPlanoSomenteHospitalar,
			isOperationalCostInactive: opInativo,
			needPass: exigeSenha,
		},
		{
			title: SidebarTitlesEnum.MY_EXAMS,
			icon: <IoIosPulse />,

			url: '/meus-exames/',

			hidden: tipoPlanoC === 'ODONTO' || flPlanoSomenteHospitalar,
			isOperationalCostInactive: opInativo,
			needPass: exigeSenha,
		},
		{
			title: SidebarTitlesEnum.MY_FINANCIALS,
			icon: <MdAttachMoney />,
			url: `/meu-financeiro`,
		},
		{
			title: SidebarTitlesEnum.GUIDE_HEALTH,
			icon: <MdLocationPin />,
			url: `/guia-medico`,
			hidden: tipoPlanoC === 'ODONTO',
		},
		{
			title: SidebarTitlesEnum.GUIDE_ODONTO,
			icon: <ToothIcon width={20} height={25} color="white" />,
			url: '/guia-odonto',
			hidden: tipoPlanoC === 'SAUDE' || flPlanoSomenteHospitalar,
			isOperationalCostInactive: opInativo,
			needPass: exigeSenha,
		},
		{
			title: SidebarTitlesEnum.PERKS_CLUB,
			icon: <PerksClubIcon width={24} height={24} color="white" />,
			url: getPerksClubLink({nu_cpf: nuCpfC, nm_usuario: nmUsuarioC}),
			isExternalUrl: true,
		},
	];

	return (
		<>
			{items.map(
				item =>
					!item.hidden &&
					(item.isExternalUrl ? (
						<NavExternalItem href={item.url} target="_blank" key={item.title}>
							<NavItemIcon>{item.icon}</NavItemIcon>
							{isExpanded && <NavItemText>{item.title}</NavItemText>}
						</NavExternalItem>
					) : (
						<NavItem
							to={item.url}
							key={item.title}
							onClick={event => verifyPermissions(event, item.url, item.needPass)}>
							<NavItemIcon>{item.icon}</NavItemIcon>
							{isExpanded && <NavItemText>{item.title}</NavItemText>}
						</NavItem>
					)),
			)}
		</>
	);
}

export function Sidebar() {
	const [showError, setShowError] = useState(false);
	const [isExpanded, setIsExpanded] = useState(true);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [passwordOp, setPasswordOp] = useState('');
	const [passCode, setPassCode] = useState(false);
	const [urlToNavigate, setUrlToNavigate] = useState('');
	const [operationalModalOpen, setOperationalModalOpen] = useState(false);
	const [passOperationalModalOpen, setPassOperationalModalOpen] = useState(false);
	const navigate = useNavigate();

	const {sidebar, beneficiary} = useRecoilValue(accountDataState);

	function verifyPermissions(event: React.MouseEvent, url: string, shouldBlockRouting?: boolean) {
		if (shouldBlockRouting) {
			event.preventDefault();
			setPassOperationalModalOpen(true);
			setUrlToNavigate(url);
		}
	}

	async function verifyPassOperational() {
		try {
			await makePostOperationalCostPassword().post({
				cdEmpresa: sidebar.ctOperacional.cdEmpresa,
				nuSenha: passwordOp,
			});
			navigate(urlToNavigate);
			setPassOperationalModalOpen(false);
			setPasswordOp('');
		} catch (error) {
			setShowError(error);
		}
	}

	function checkCode() {
		setPassCode(!checkMasks('passCode', passwordOp));
	}

	async function callChatRoom(type: ChatRooms, name: string) {
		try {
			const response = await makeGetChatRoom().get({roomType: type, nmUsuario: name});
			window.open(response.url);
		} catch (error) {
			setShowError(error);
		}
	}

	return (
		<>
			<Container $isExpanded={isExpanded}>
				<LogoContainer>
					<LogoIcon width={60} height={60} />
					{isExpanded && <Logo width={130} height={37} />}
					<SideDrop onClick={() => setIsExpanded(!isExpanded)}>
						<RecallItem $isExpanded={isExpanded} />
					</SideDrop>
				</LogoContainer>
				<NavContainer $isExpanded={isExpanded}>
					<MenuList verifyPermissions={verifyPermissions} isExpanded={isExpanded} />
					<Divider />
				</NavContainer>
			</Container>

			<Modal
				style={{width: '35%'}}
				isOpen={isOpenModal}
				onClose={() => setIsOpenModal(false)}
				title="Marcação indisponível">
				<ModalContainer>
					<ModalHeaderPendency>
						<SadFaceIcon />
					</ModalHeaderPendency>

					<ModalContent>
						Identificamos uma pendência no seu contrato, que está impedindo a marcação.
						Orientamos que entre em contato com{' '}
						{sidebar.flAdministradora === true
							? 'a administradora do seu plano'
							: 'o RH da sua empresa'}{' '}
						ou com a equipe de atendimento.
					</ModalContent>

					<Button
						fontSize={'xxs'}
						onClick={() => callChatRoom(ChatRooms.beta, beneficiary.nmUsuario)}
						rightIcon={<MdOutlineMessage />}>
						Conversar com atendente
					</Button>
				</ModalContainer>
			</Modal>

			<Modal
				style={{width: '30%'}}
				isOpen={operationalModalOpen}
				onClose={() => setOperationalModalOpen(false)}>
				<ModalContainer>
					<ModalOperationalHeader>
						<GrCircleAlert />
					</ModalOperationalHeader>

					<ModalOperationalContent>
						{`${
							sidebar.ctOperacional?.mensagem
						} ${'ou entre em contato com a equipe de atendimento.'}`}
					</ModalOperationalContent>

					<Button fontSize={'xxs'} leftIcon={<MdOutlineMessage />}>
						Conversar com atendente
					</Button>
				</ModalContainer>
			</Modal>

			<Modal
				title="Senha custo operacional"
				isOpen={passOperationalModalOpen}
				onClose={() => setPassOperationalModalOpen(false)}>
				<ModalContainerOperacionalPass>
					<ModalContentOperacionalPass>
						Esta ação necessita de autorização prévia, digite a senha ou pré-senha:
					</ModalContentOperacionalPass>

					<InputCode
						required
						borderRadius={'nano'}
						value={passwordOp}
						onChange={event => setPasswordOp(event.target.value)}
						maxLength={6}
						onBlur={checkCode}
						isInvalid={passCode}
						centralizedMessage={true}
						invalidMessage={'Senha incorreta ou inválida'}
					/>
					<Button fontSize={'xxs'} onClick={verifyPassOperational}>
						Validar senha
					</Button>
				</ModalContainerOperacionalPass>
			</Modal>

			<FailureToLoadModal isModalOpen={showError} setIsModalOpen={setShowError} />
		</>
	);
}

import styled from 'styled-components';
import {RiDownloadLine} from 'react-icons/ri';
import {Link} from 'react-router-dom';
import theme from 'presentation/styles/theme.styles';
import {logoSidebar, logoIcon} from '../icons/logo-sidebar';
import {TextField} from '../text-field';

interface SidebarProps {
	$isExpanded?: boolean;
}

export const Logo = styled(logoSidebar)``;
export const LogoIcon = styled(logoIcon)``;

export const Container = styled.div<SidebarProps>`
	display: flex;
	flex-direction: column;
	align-items: center;
	transition: all 0.4s;
	width: ${({$isExpanded}) => ($isExpanded ? '17.6rem' : '6.375rem')};
	height: 100vh;
	background-color: ${theme.colors['primaryBlue.500']};
	border-radius: 0 24px 24px 0;
	position: relative;
`;

export const Divider = styled.div`
	border-top: 1px solid #0464d7;
	width: 100%;
	margin-bottom: 20px;
`;

export const MobileSideBarOverlay = styled.div<SidebarProps>`
	position: fixed;
	width: 100vw;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 999999;
	transition: all ease-in-out 0.4s;
	display: ${({$isExpanded}) => ($isExpanded ? 'flex' : 'none')};
`;

export const LogoContainer = styled.div<SidebarProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 24px;
	padding-right: 24px;
	padding-bottom: 24px;
	padding-left: ${({$isExpanded}) => ($isExpanded ? '32px' : '24px')};
	margin-bottom: 24px;
`;

export const NavContainer = styled.nav<SidebarProps>`
	padding-left: ${({$isExpanded}) => ($isExpanded ? '32px' : '24px')};
	padding-right: 24px;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export const SideDrop = styled.button`
	position: absolute;
	background: ${theme.colors.sidedrop};
	color: ${theme.colors.white};
	border: none;
	width: 25px;
	height: 25px;
	border-radius: 4px;
	right: -12px;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 2;
`;

export const RecallItem = styled(RiDownloadLine)<SidebarProps>`
	transform: ${({$isExpanded}) => ($isExpanded ? 'rotate(90deg)' : 'rotate(-90deg)')};
`;

export const NavItem = styled(Link)`
	padding: 8px 16px;
	border-radius: 32px;
	display: flex;
	align-items: center;
	gap: 24px;
	text-decoration: none;
	color: ${theme.colors.white};

	:hover {
		background-color: ${theme.colors.white};
		color: ${theme.colors['primaryBlue.500']};

		span svg path {
			stroke: ${theme.colors['primaryBlue.500']};
		}
	}
`;

export const NavExternalItem = styled.a`
	padding: 8px 16px;
	border-radius: 32px;
	display: flex;
	align-items: center;
	gap: 24px;
	text-decoration: none;
	color: ${theme.colors.white};

	:hover {
		background-color: ${theme.colors.white};
		color: ${theme.colors['primaryBlue.500']};

		span svg path {
			stroke: ${theme.colors['primaryBlue.500']};
		}
	}
`;

export const NavItemIcon = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.5rem;
`;

export const NavItemText = styled.span`
	white-space: nowrap;
	overflow: hidden;
	line-height: 1.2;
`;

export const PasswordInput = styled(TextField)`
	input {
		max-width: 280px !important;
		border-color: ${theme.colors.primary} !important;
		color: ${theme.colors.primary} !important;
		background-color: ${theme.colors.white} !important;
	}
`;

export const ModalContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;

	button {
		margin: 0 auto;
	}
`;

export const ModalHeaderPendency = styled.div`
	display: flex;
	justify-content: center;

	svg {
		path {
			fill: #f05a22;
		}

		align-self: center;
		width: 95px;
		height: 95px;
	}
`;

export const ModalContent = styled.p`
	font-weight: 500;
	font-size: 1rem;
	line-height: 22px;
	text-align: center;
	padding: 23px 0 15px 0;
`;

export const ModalOperationalHeader = styled.div`
	display: flex;
	justify-content: center;

	svg {
		path {
			stroke: #c93600;
		}

		width: 62px;
		height: 62px;
		align-self: center;
	}
`;

export const ModalOperationalContent = styled(ModalContent)`
	font-weight: 600;
`;

export const InputCode = styled(TextField)`
	width: 50%;
	margin: 0 auto;
	text-align: center;
	color: ${theme.colors.primary};
	border: 1px solid ${theme.colors['SecondaryBlue.200']};

	::placeholder {
		color: ${theme.colors['SecondaryBlue.200']};
	}
`;

export const ModalContentOperacionalPass = styled(ModalContent)`
	padding: 0 0 15px;
`;

export const ModalContainerOperacionalPass = styled(ModalContainer)`
	display: flex;
	justify-content: center;
	flex-direction: column;

	button {
		margin: 0 auto;
	}

	a {
		font-weight: 600;
		font-size: 14px;
		line-height: 23px;
		align-self: center;
		padding-top: 1rem;
		color: ${theme.colors.primary};
	}
`;

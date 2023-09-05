import styled from 'styled-components';
import {logoIcon} from '../icons/logo-sidebar';
import {logoHapvida} from '../icons/logo-hapvida';

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	height: 64px;
	background-color: ${props => props.theme.colors['primaryBlue.500']};
	padding: 16px;
`;

export const Logo = styled(logoHapvida).attrs({
	width: 110,
	height: 29,
	fillLogoName: '#ffffff',
})``;

export const LogoIcon = styled(logoIcon)``;

export const MenuButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 32px;
	width: 32px;
	font-size: 2rem;
	color: ${props => props.theme.colors.white};
	background-color: ${props => props.theme.colors['primaryBlue.500']};
	border: none;
`;

export const ProfileContainer = styled.div<{open: boolean}>`
	position: relative;
	> button {
		display: flex;
		align-items: center;
		border-radius: 1.16rem;
		background-color: #f2f1f1;
		border: none;
		height: 2.3rem;

		> div {
			height: 2.3rem;
			width: 2.3rem;
			background-color: ${props => props.theme.colors.white};
			border-radius: 50%;
			color: ${props => props.theme.colors.primary};
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 1.7rem;
		}

		> span {
			padding: 0 0.875rem;
			font-family: 'Roboto';
			font-style: normal;
			font-weight: 700;
			font-size: 1rem;
			color: #000;

			display: flex;
			flex: 1;
			justify-content: space-between;
			align-items: center;
			text-transform: capitalize;

			svg {
				font-size: 1.2rem;
			}
		}

		transition: all 0.4s ease-in-out;

		:hover {
			filter: brightness(0.9);
		}
	}

	.menu-profile {
		position: absolute;
		background: white;
		box-shadow: 0px 8px 35px rgba(138, 138, 138, 0.25);
		border-radius: 0.875rem;
		right: 0;
		margin-top: 0.5rem;
		overflow: hidden;

		opacity: ${props => (props.open ? 1 : 0)};
		pointer-events: ${props => (props.open ? 'all' : 'none')};

		transition: all 0.4s ease-in-out;
		z-index: 9999999999999999999999999999;
		> div {
			width: 20.25rem;
			padding: 1.25rem;
			display: flex;

			.profile-info {
				display: flex;
				flex-direction: column;
				flex: 1;
				h6 {
					font-family: 'Source Sans Pro';
					font-style: normal;
					font-weight: 600;
					font-size: 0.875rem;
					color: ${props => props.theme.colors.black};
				}
				> span {
					font-family: 'Source Sans Pro';
					font-style: normal;
					font-weight: 400;
					font-size: 0.75rem;
					color: #4f4e4e;
				}
				> div {
					background-color: ${props => props.theme.colors.primary};
					color: ${props => props.theme.colors.white};
					border-radius: 0 0.94rem 0.94rem 0.94rem;
					display: flex;
					align-items: center;
					flex: 1;
					padding: 0.35rem 5px 0.5rem 0.75rem;
					margin-top: 0.5rem;
					font-size: 0.75rem;
				}
			}
			.profile-photo {
				height: 3.375rem;
				width: 3.375rem;
				background-color: ${props => props.theme.colors.white};
				border-radius: 50%;
				color: white;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 1.7rem;
				margin-right: 0.8rem;
			}
		}
		> div + div {
			border-top: 1px solid #eaeaea;
		}
	}

	.button-menu {
		color: ${props => props.theme.colors.black};
		padding: 0 !important;
		a,
		button {
			color: ${props => props.theme.colors.black};
			text-decoration: none;
			padding: 1rem 1.25rem;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			width: 100%;
			background: #fff;
			border: none;
			font-family: 'Source Sans Pro';
			font-style: normal;
			font-weight: 600;
			font-size: 0.875rem;

			:hover {
				filter: brightness(0.9);
			}

			svg {
				margin-right: 0.7rem;
			}
		}
	}
`;

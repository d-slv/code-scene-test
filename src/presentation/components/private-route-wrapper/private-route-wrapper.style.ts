import styled from 'styled-components';

import theme from '../../styles/theme.styles';

interface ProfileContainerProps {
	open: boolean;
}

export const Container = styled.div`
	display: flex;
`;
export const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	overflow-y: auto;
	height: 100vh;
`;
export const Header = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	min-height: 80px;
	background-color: ${theme.colors.white};
`;

export const Content = styled.div`
	flex: 1;
	padding: 32px 28px;
	display: flex;
	flex-direction: column;

	@media (max-width: 768px) {
		padding: 28px 24px;
	}
`;

export const AccessibilityButtons = styled.div`
	display: flex;
	align-items: center;
	padding: 0 2rem;
	button {
		border: 1px solid ${theme.colors.primary};
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 2.43rem;
		height: 2.43rem;
		background-color: white;
		color: ${theme.colors.primary};
		transition: all 0.4s ease-in-out;

		:hover {
			filter: brightness(0.9);
		}
	}
	button + button {
		margin-left: 0.7rem;
	}
`;
export const RightItems = styled.div`
	display: flex;
	align-items: center;
	padding: 0 2rem;
`;

export const NotificationButton = styled.button`
	margin-right: 1rem;
	border: 1px solid rgba(0, 0, 0, 0.12);
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 2.3rem;
	height: 2.3rem;
	background-color: white;
	color: rgba(0, 0, 0, 0.54);
	position: relative;

	transition: all 0.4s ease-in-out;

	:hover {
		filter: brightness(0.9);
	}

	span {
		border-radius: 50%;
		background-color: ${theme.colors['red.500']};
		color: ${theme.colors.white};
		font-size: 0.8rem;
		width: 1rem;
		height: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		right: -0.3rem;
		top: -0.2rem;
	}
`;

export const ProfileContainer = styled.div<ProfileContainerProps>`
	position: relative;
	> button {
		display: flex;
		align-items: center;
		border-radius: 24px;
		background-color: #f2f1f1;
		border: none;
		height: 38px;

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
				background-color: ${props => props.theme.colors.primary};
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

export const ProfileIconContainer = styled.div`
	height: 38px;
	width: 38px;
	background-color: ${theme.colors.primary};
	border-radius: 50%;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const ProfileUserName = styled.span`
	padding: 10px 10px 10px 0px;
	margin-left: 14px;
	font-weight: 600;
	font-size: 1rem;
	color: ${theme.colors.black};

	display: flex;
	flex: 1;
	justify-content: space-between;
	align-items: center;
	text-transform: capitalize;
`;

export const Scroll = styled.div`
	overflow-y: auto;

	::-webkit-scrollbar {
		width: 0;
	}
`;

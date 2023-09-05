import React, {useState} from 'react';
import {HiMenuAlt2} from 'react-icons/hi';
import {MdPerson} from 'react-icons/md';
import {Link} from 'react-router-dom';
import {ChangePlanIcon} from '../icons/change-plan-icon';
import {LogoutIcon} from '../icons/logout-icon';
import {Container, MenuButton, Logo, ProfileContainer} from './mobile-header.styles';

interface MobileHeaderProps {
	onClickMenu: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({onClickMenu}) => {
	const [isOpenMenu, setIsOpenMenu] = useState(false);
	return (
		<Container>
			<MenuButton onClick={() => onClickMenu()}>
				<HiMenuAlt2 />
			</MenuButton>
			<div>
				<Logo />
			</div>
			<ProfileContainer open={isOpenMenu}>
				<button onClick={() => setIsOpenMenu(!isOpenMenu)}>
					<div>
						<MdPerson />
					</div>
				</button>
				<div className="menu-profile">
					<div className="button-menu">
						<Link to="/plano">
							<ChangePlanIcon />
							Trocar Plano/Beneficiários
						</Link>
					</div>

					<div className="button-menu">
						<button
							onClick={() => {
								localStorage.clear();
								window.location.href = '/login';
							}}>
							{' '}
							<LogoutIcon />
							Sair
						</button>
					</div>
				</div>
			</ProfileContainer>
		</Container>
	);
};

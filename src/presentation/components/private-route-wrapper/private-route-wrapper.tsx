import React, {Suspense, useState} from 'react';
import {MdOutlineKeyboardArrowDown, MdPerson} from 'react-icons/md';
import {useRecoilValue, useResetRecoilState} from 'recoil';
import {Link, Outlet} from 'react-router-dom';
import {ErrorBoundary} from 'react-error-boundary';

import useWindowDimensions from 'presentation/hooks/useWindowDimensions';
import {accountDataState} from 'presentation/pages/entry-flow/atoms';
import {appointmentDetailsState} from 'presentation/pages/my-appointments-flow/atoms';
import {examDetailsState} from 'presentation/pages/my-exams-flow/atoms';
import {MobileHeader} from '../mobile-header/mobile-header';
import useOutsideClosing from '../../hooks/useOutsideClosing';
import {LogoutIcon} from '../icons/logout-icon';
import {ChangePlanIcon} from '../icons/change-plan-icon';
import {Sidebar} from '../sidebar';
import {
	Container,
	Content,
	ContentContainer,
	Header,
	ProfileContainer,
	ProfileIconContainer,
	ProfileUserName,
	RightItems,
} from './private-route-wrapper.style';
import {Footer} from '../select-contract';
import {ErrorFallback} from '../error-fallback';
import {MobileSidebar} from '../mobile-sidebar';
import {Loading} from '../loading';

export const PrivateRouteWrapper: React.FC = () => {
	const {width} = useWindowDimensions();
	const [isOpenSidebar, setIsOpenSidebar] = useState(false);
	const {beneficiary} = useRecoilValue(accountDataState);
	const resetExam = useResetRecoilState(examDetailsState);
	const resetAppointment = useResetRecoilState(appointmentDetailsState);
	const resetAccount = useResetRecoilState(accountDataState);

	const {ref, isComponentVisible, handleClickOpen} = useOutsideClosing(false);

	function resetStorage() {
		resetAppointment();
		resetExam();
	}

	function handleLogout() {
		resetAccount();
		resetStorage();
	}

	return (
		<ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
			<Suspense fallback={<Loading fullscreen variant="logo" />}>
				<Container>
					{width > 1055 ? (
						<Sidebar />
					) : (
						<MobileSidebar
							onClickToClose={() => setIsOpenSidebar(false)}
							isVisible={isOpenSidebar}
						/>
					)}
					<ContentContainer id="content-container">
						{width > 1055 ? (
							<Header>
								<RightItems>
									<ProfileContainer open={isComponentVisible}>
										<button onClick={handleClickOpen}>
											<ProfileIconContainer>
												<MdPerson size={24} />
											</ProfileIconContainer>
											<ProfileUserName>
												{beneficiary.nmUsuarioC.split(' ')[0]}{' '}
												{beneficiary.nmUsuarioC.split(' ')[1]}{' '}
												<MdOutlineKeyboardArrowDown size={24} />
											</ProfileUserName>
										</button>
										<div ref={ref} className="menu-profile">
											<div className="button-menu">
												<Link to="/plano" onClick={resetStorage}>
													<ChangePlanIcon />
													Trocar Plano/Beneficiários
												</Link>
											</div>

											<div className="button-menu">
												<button onClick={handleLogout}>
													<LogoutIcon />
													Sair
												</button>
											</div>
										</div>
									</ProfileContainer>
								</RightItems>
							</Header>
						) : (
							<MobileHeader onClickMenu={() => setIsOpenSidebar(true)} />
						)}

						<Content>
							<Outlet />
						</Content>
						<Footer />
					</ContentContainer>
				</Container>
			</Suspense>
		</ErrorBoundary>
	);
};

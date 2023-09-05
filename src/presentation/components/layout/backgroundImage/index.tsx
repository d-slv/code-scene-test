import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import amplitude from 'amplitude-js';
import TagManager from 'react-gtm-module';
import ReactGA from 'react-ga';
import * as S from './styles';

const BackgroundImage: React.FC = () => (
	<>
		<S.LoginBackgroundImage
			src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
			alt="Family Together Hapvida"
		/>
		<S.FooterContainer>
			<S.ContainerAns>
				<S.AnsLogo subtitle={false} />
			</S.ContainerAns>
			<S.ContainerApps>
				<span>Baixe o super app e aproveite todas as facilidades</span>
				<S.ImageApps>
					<Link
						onClick={() => {
							ReactGA.event({
								category: 'Aplicativo',
								action: 'Baixar aplicativo IOS',
							});
							const tagManagerArgs = {
								gtmId: 'GTM-KQKN552',
								events: {
									sendUserInfo: 'Baixar aplicativo IOS',
								},
							};

							TagManager.initialize(tagManagerArgs);
							amplitude.getInstance().logEvent('Baixar aplicativo IOS');
						}}
						to="">
						<S.AppStore />
					</Link>
					<Link
						onClick={() => {
							ReactGA.event({
								category: 'Aplicativo',
								action: 'Baixar aplicativo Android',
							});
							const tagManagerArgs = {
								gtmId: 'GTM-KQKN552',
								events: {
									sendUserInfo: 'Baixar aplicativo Android',
								},
							};

							TagManager.initialize(tagManagerArgs);
							amplitude.getInstance().logEvent('Baixar aplicativo Android');
						}}
						to="">
						<S.GooglePlay />
					</Link>
				</S.ImageApps>
			</S.ContainerApps>
		</S.FooterContainer>
	</>
);

export default memo(BackgroundImage);

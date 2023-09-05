import React from 'react';
import {Meta, Story} from '@storybook/react';
import {CardServiceChannel} from '.';

export default {
	title: 'Components/CardServiceChannel',
	component: CardServiceChannel,
} as Meta;

export const Default: Story = () => (
	<CardServiceChannel
		icon={
			<svg
				width="26"
				height="26"
				viewBox="0 0 26 26"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<g clipPath="url(#clip0_3350_26771)">
					<path
						d="M24.3747 3.2508H4.87466C4.65792 3.23781 4.4409 3.27093 4.23791 3.34798C4.03492 3.42503 3.85057 3.54425 3.69704 3.69778C3.54352 3.8513 3.42429 4.03565 3.34724 4.23864C3.2702 4.44163 3.23707 4.65866 3.25007 4.87539V26.0008L9.75007 19.5008H24.3747C24.5914 19.5138 24.8084 19.4807 25.0114 19.4036C25.2144 19.3266 25.3987 19.2073 25.5523 19.0538C25.7058 18.9003 25.825 18.7159 25.9021 18.513C25.9791 18.31 26.0122 18.0929 25.9993 17.8762V4.87539C26.0122 4.65866 25.9791 4.44163 25.9021 4.23864C25.825 4.03565 25.7058 3.8513 25.5523 3.69778C25.3987 3.54425 25.2144 3.42503 25.0114 3.34798C24.8084 3.27093 24.5914 3.23781 24.3747 3.2508ZM24.3747 17.8754H8.93736L4.87466 21.9381V4.87539H24.3747V17.8754Z"
						fill="#0054B8"
					/>
					<path
						d="M22.7501 1.62544C22.7631 1.40863 22.7299 1.19153 22.6528 0.988483C22.5757 0.785431 22.4564 0.601045 22.3028 0.447503C22.1492 0.293961 21.9648 0.174757 21.7617 0.0977625C21.5586 0.0207682 21.3415 -0.0122641 21.1247 0.00084727H1.62466C1.40792 -0.0121436 1.1909 0.0209781 0.987908 0.0980263C0.784916 0.175074 0.600572 0.294297 0.447044 0.447826C0.293515 0.601354 0.174293 0.785698 0.0972444 0.988689C0.0201962 1.19168 -0.0129254 1.40871 6.54412e-05 1.62544V22.7508L1.62466 21.1263V1.62544H22.7501Z"
						fill="#0054B8"
					/>
				</g>
				<defs>
					<clipPath id="clip0_3350_26771">
						<rect width="26" height="26" fill="white" />
					</clipPath>
				</defs>
			</svg>
		}
		title={'Atendimento Online'}
		text={
			'Fale diretamente com nossos analistas. Acesse nosso chat online e receba as orientações técnicas ou suporte financeiro que precisa.'
		}
		textButton={'Falar com atendente'}></CardServiceChannel>
);

import React from 'react';
import * as S from './styles';

export const UsefulPhones: React.FC = () => {
	const items = [
		{
			title: 'Call Center 24h (Capitais):',
			text: ['4002.3633 | 4020.3633', '4002 2722 (Odonto)'],
		},
		{
			title: 'Call Center 24h (Capitais):',
			text: ['0800 280 9130', '0800 275 9092 (Odonto)'],
		},
		{
			title: 'Call Center 24h (Capitais):',
			text: ['0300 313 3633'],
		},
		{
			title: 'Call Center 24h (Capitais):',
			text: ['4020.9091'],
		},
	];

	const PhonesListRender = () => (
		<S.CardContentPhones>
			{items.map((i, key) => (
				<div key={key}>
					<S.TitlePhoneCard>{i.title}</S.TitlePhoneCard>
					{i.text.map((obj, index) => (
						<S.ContentPhoneCard key={index}>{obj}</S.ContentPhoneCard>
					))}
				</div>
			))}
		</S.CardContentPhones>
	);

	return (
		<>
			<S.MainContainer>
				<S.TitlePage>Atendimento por telefone</S.TitlePage>

				<S.ContentContainer>
					<PhonesListRender />

					<PhonesListRender />
				</S.ContentContainer>
			</S.MainContainer>
		</>
	);
};

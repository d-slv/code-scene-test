import {GetMedicalCard, GetMedicalCardModel} from 'domain/usecases';
import React, {useEffect, useState} from 'react';
import {MedicalCardContent} from './medical-card-content';
import {MedicalCardSlider} from './medical-card-slider';

type MedicalCardModalProps = {
	medicalCard: GetMedicalCard;
	closeCallback: () => void;
};

export function MedicalCardModal(props: MedicalCardModalProps) {
	const {medicalCard, closeCallback} = props;
	const [medicalCardData, setMedicalCardData] = useState<GetMedicalCardModel>([]);

	useEffect(() => {
		const getMedicalCardData = async () => {
			const promise = await medicalCard
				.get({cdPessoa: '1'})
				.then(response => response)
				.then(data => data)
				.catch(error => {
					console.log('MedicalCardModal Error:', error);
					return [] as GetMedicalCardModel;
				});

			setMedicalCardData(promise);
		};

		getMedicalCardData();
	}, []);

	const modalData = medicalCardData.map(data => ({
		title: data.nmUsuarioC,
		subtitle: data.nmPlano,
		content: (
			<MedicalCardContent
				title={data.nmUsuarioC}
				birthDate={data.dtNascimentoUsuarioC}
				cnsNumber={data.nuCNS}
				membershipDate={data.dtAdesaoC}
				partialCoverage={data.dtCpt}
				companyName={data.nomeEmpresa}
				registration={data.nuMatriculaEmpresa}
				planRegisterAns={data.cdUsuarioC}
				operatorName={data.nmOpeContratada}
				planName={data.nomePlano}
				type={data.flPlanoIntegrado}
			/>
		),
	}));

	if (medicalCardData.length === 0) return null;

	return <MedicalCardSlider closeCallback={closeCallback} modalData={modalData} />;
}

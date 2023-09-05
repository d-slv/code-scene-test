import {printAppointment} from 'presentation/utils/utilFunctions';
import React, {useRef, useState} from 'react';
import {Button} from '../button/button';
import {AnsIntegrada} from '../icons/ans-integrada';
import {AnsUnica} from '../icons/ans-unica';
import {GroupLogos} from '../icons/group-logos';
import {HapvidaLogo} from '../icons/hapvida-logo';
import {LogoIntegrada} from '../icons/logo-integrada';
import {LogoUnica} from '../icons/logo-unica';
import {SharedIcon} from '../icons/shared-icon';
import * as S from './medical-card.style';

type MedicalCardContentProps = {
	title?: string;
	birthDate: string;
	cnsNumber: string;
	membershipDate: string;
	partialCoverage: string;
	companyName: string;
	registration: string;
	planRegisterAns: string;
	planName: string;
	type: boolean;
	operatorName: string;
};

export function MedicalCardContent(props: MedicalCardContentProps) {
	const {
		title,
		birthDate,
		cnsNumber,
		membershipDate,
		partialCoverage,
		companyName,
		registration,
		planRegisterAns,
		planName,
		type,
		operatorName,
	} = props;
	const printRef = useRef();
	const [isShared, setIsShared] = useState(false);

	const sharedContent = () => {
		setIsShared(true);
		printAppointment(printRef);
		setTimeout(() => {
			setIsShared(false);
		}, 0.05);
	};
	return (
		<>
			{!isShared ? (
				<>
					<S.TitleItem>Número do plano</S.TitleItem>
					<S.NrPlan>{planRegisterAns}</S.NrPlan>
					<S.Divider />
					<S.ContainerColumn>
						<div>
							<S.TitleItem>Nascimento</S.TitleItem>
							<S.DataBeneficiary>{birthDate}</S.DataBeneficiary>
						</div>
						<div>
							<S.TitleItem>CNS</S.TitleItem>
							<S.DataBeneficiary>{cnsNumber}</S.DataBeneficiary>
						</div>
					</S.ContainerColumn>
					<S.Divider />
					<S.ContainerColumn>
						<div>
							<S.TitleItem>Adesão</S.TitleItem>
							<S.DataBeneficiary>{membershipDate}</S.DataBeneficiary>
						</div>
						<div>
							<S.TitleItem>Cobertura Parcial</S.TitleItem>
							<S.DataBeneficiary>{partialCoverage}</S.DataBeneficiary>
						</div>
					</S.ContainerColumn>
					<S.Divider />
					{registration && (
						<>
							<S.TitleItem>Matrícula</S.TitleItem>
							<S.DataBeneficiary>{registration}</S.DataBeneficiary>
							<S.Divider />
						</>
					)}
					<S.TitleItem>Empresa</S.TitleItem>
					<S.DataCompany>{companyName}</S.DataCompany>
					<S.Divider />
					<S.TitleItem>Plano</S.TitleItem>
					<S.NmPlan>
						<strong>{planName}</strong>
					</S.NmPlan>
					<S.Divider />
					<S.TitleItem>Operadora contratada</S.TitleItem>
					<S.DataBeneficiary>{operatorName}</S.DataBeneficiary>
					<S.ContainerButton>
						<Button
							variant="outlined"
							rightIcon={<SharedIcon />}
							onClick={() => {
								sharedContent();
							}}>
							Compartilhar carteirinha
						</Button>
					</S.ContainerButton>
					<S.ContainerLogos>
						{type ? (
							<S.MultiLogo>
								<GroupLogos />
							</S.MultiLogo>
						) : (
							<S.HapvidaLogoContent>
								<HapvidaLogo />
							</S.HapvidaLogoContent>
						)}
					</S.ContainerLogos>
				</>
			) : (
				<>
					<S.ContentShared ref={printRef}>
						<S.HeaderContentShared>
							{type ? <LogoIntegrada /> : <LogoUnica />}
						</S.HeaderContentShared>
						<S.TitleShared>{planName}</S.TitleShared>
						<S.SubtitleShare>{title}</S.SubtitleShare>
						<S.Divider />
						<S.TitleItem>Número do plano</S.TitleItem>
						<S.NrPlan>{planRegisterAns}</S.NrPlan>
						<S.Divider />
						<S.ContainerColumn>
							<div>
								<S.TitleItem>Nascimento</S.TitleItem>
								<S.DataBeneficiary>{birthDate}</S.DataBeneficiary>
							</div>
							<div>
								<S.TitleItem>CNS</S.TitleItem>
								<S.DataBeneficiary>{cnsNumber}</S.DataBeneficiary>
							</div>
						</S.ContainerColumn>
						<S.Divider />
						<S.ContainerColumn>
							<div>
								<S.TitleItem>Adesão</S.TitleItem>
								<S.DataBeneficiary>{membershipDate}</S.DataBeneficiary>
							</div>
							<div>
								<S.TitleItem>Cobertura Parcial</S.TitleItem>
								<S.DataBeneficiary>{partialCoverage}</S.DataBeneficiary>
							</div>
						</S.ContainerColumn>
						<S.Divider />
						{registration && (
							<>
								<S.TitleItem>Matrícula</S.TitleItem>
								<S.DataBeneficiary>{registration}</S.DataBeneficiary>
								<S.Divider />
							</>
						)}
						<S.TitleItem>Empresa</S.TitleItem>
						<S.DataCompany>{companyName}</S.DataCompany>
						<S.Divider />
						<S.TitleItem>Plano</S.TitleItem>
						<S.NmPlan>
							<strong>{planName}</strong>
						</S.NmPlan>
						<S.Divider />
						<S.TitleItem>Operadora contratada</S.TitleItem>
						<S.DataBeneficiary>{operatorName}</S.DataBeneficiary>
						<S.FooterContentShared>
							{type ? <AnsIntegrada /> : <AnsUnica />}
						</S.FooterContentShared>
					</S.ContentShared>
				</>
			)}
		</>
	);
}

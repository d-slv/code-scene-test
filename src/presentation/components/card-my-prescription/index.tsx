import React from 'react';

// Util
import {formatText} from 'presentation/utils';

import * as S from './style';

interface CardPrescriptionProps {
	specialty: string;
	date_prescription?: string;
	source: string;
	doctor: string;
	raw_prescription: string;
	background: string;
	borderColor: string;
	filePath: string;
	download?: () => void;
}

export function CardMyPrescription(prescriptionProps: CardPrescriptionProps) {
	const {
		specialty,
		date_prescription,
		source,
		doctor,
		raw_prescription,
		background,
		borderColor,
		filePath,
		download,
	} = prescriptionProps;

	return (
		<>
			<S.ContainerCardPrescription>
				<S.CardPrescription borderColor={borderColor}>
					<S.CardHeader background={background}>
						<S.InfoAppointment>
							<S.TextInfo>
								{specialty === null || specialty === ''
									? specialty
									: formatText(specialty)}
							</S.TextInfo>
							<S.DateInfo>{date_prescription}</S.DateInfo>
						</S.InfoAppointment>
						<S.Icon>
							<S.CircleIcon>
								<S.Stethoscope />
							</S.CircleIcon>
						</S.Icon>
					</S.CardHeader>
					<S.CardBody>
						<S.Info>
							<S.ContentInfo>
								{source === null ? <span>source</span> : <span>{source}</span>}
							</S.ContentInfo>
							<S.ContentInfo>
								<span>Profissional:</span>&nbsp;
								{doctor === null || doctor === '' ? (
									<span className="doctor">doctor</span>
								) : (
									<span className="doctor">{formatText(doctor)}</span>
								)}
							</S.ContentInfo>
							<div className="divider"></div>
						</S.Info>

						<S.MedicalPrescription>
							<header>Prescrição:</header>
							<div className="prescription-info">
								{raw_prescription.split('\n\n\n\n').map((str, i) => (
									<p key={i}>{str}</p>
								))}
							</div>
						</S.MedicalPrescription>
					</S.CardBody>
					<>
						{filePath !== null &&
							(filePath.split('.pdf').length === 1 ? (
								<S.CardFooter>
									<div className="download-prescription" onClick={download}>
										<S.ButtonCard variant="outlined" size="small">
											<span>Baixar prescrição</span>
											<S.Download />
										</S.ButtonCard>
									</div>
								</S.CardFooter>
							) : (
								filePath.split('.pdf').length === 2 && (
									<S.CardFooter>
										<div className="download-prescription">
											<S.ButtonCardLink href={filePath}>
												<S.ButtonCardPdf variant="outlined" size="small">
													Baixar prescrição
													<S.Download />
												</S.ButtonCardPdf>
											</S.ButtonCardLink>
										</div>
									</S.CardFooter>
								)
							))}
					</>
				</S.CardPrescription>
			</S.ContainerCardPrescription>
		</>
	);
}

import React, {ReactNode} from 'react';
import {MdOutlineArrowBack, MdOutlineArrowForward} from 'react-icons/md';

import {translations} from 'presentation/translations';
import {
	ButtonExamBooking,
	ContainerInfo,
	ContentInfo,
	ContentInfoTitle,
	FooterCard,
	StyledLink,
} from './styles';

interface FooterNavigationProps {
	handleNextClick: () => void;
	handleBackClick?: () => void;
	disabled?: boolean;
	isStep1?: boolean;
	backButtonText?: string;
	nextButtonText?: string;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	isLastStep?: boolean;
}

export function FooterNavigation({
	handleBackClick,
	handleNextClick,
	disabled,
	isStep1,
	backButtonText,
	nextButtonText,
	leftIcon,
	isLastStep,
}: FooterNavigationProps) {
	return (
		<>
			<FooterCard isStep1={isStep1}>
				{isStep1 ? (
					<ContainerInfo>
						<ContentInfoTitle>
							{translations['pt-br'].bookingFlow.infoTitle}
						</ContentInfoTitle>
						<ContentInfo>
							{translations['pt-br'].bookingFlow.contentInfo}{' '}
							<StyledLink to="/plano"> clique aqui.</StyledLink>
						</ContentInfo>
					</ContainerInfo>
				) : (
					<ButtonExamBooking
						fontSize={'xxs'}
						variant="outlined"
						onClick={handleBackClick}
						leftIcon={<MdOutlineArrowBack />}>
						{backButtonText || translations['pt-br'].bookingFlow.buttonPrev}
					</ButtonExamBooking>
				)}

				<ButtonExamBooking
					color="primary"
					fontSize={'xxs'}
					variant="contained"
					onClick={handleNextClick}
					disabled={disabled}
					leftIcon={leftIcon}
					rightIcon={isLastStep ? null : <MdOutlineArrowForward />}>
					{nextButtonText || translations['pt-br'].bookingFlow.buttonNext}
				</ButtonExamBooking>
			</FooterCard>
		</>
	);
}

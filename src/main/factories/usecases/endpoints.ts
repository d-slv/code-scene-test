export enum entryFlowEndPoints {
	// * signin
	signin = '/v1/entry-flow/auth/signin',
	refreshToken = '/v1/entry-flow/auth/refresh-token',

	// * signup
	signUpCheckExistence = '/v1/entry-flow/sign-up/cadastros',
	signUpSendToken = '/v1/entry-flow/sign-up/cadastro/novo',
	signUpResendToken = '/v1/entry-flow/sign-up/cadastros/reenvio',
	signUpValidateToken = '/v1/entry-flow/sign-up/cadastro/token/validar',
	signUpConfirm = '/v1/entry-flow/sign-up/cadastros',

	// * forgot-password
	forgotRecoverUserInfo = '/v1/entry-flow/forgot-password/esqueci/usuario',
	forgotResendToken = '/v1/entry-flow/forgot-password/resgates/reenvio',
	forgotConfirm = '/v1/entry-flow/forgot-password/esqueci/confirmar',

	// * plan
	planList = '/v1/entry-flow/beneficiary/plans',

	// * beneficiary
	beneficiaryList = '/v1/entry-flow/beneficiary/beneficiaries',
	beneficiarySelection = '/v1/entry-flow/beneficiary',
	beneficiaryContacts = '/v1/entry-flow/beneficiary/contacts',

	// * home
	home = '/v1/entry-flow/beneficiary/home',
	homeOperationalCostPassword = '/v1/entry-flow/beneficiary/operational-costs/password',
	medicalCard = '/v1/wallet-flow/wallet',

	// * sidebar
	sidebar = '/v1/entry-flow/beneficiary/sidebar',
}

export enum externalLinkPoint {
	chatRoom = '/v1/chat-flow/chat',
	teleconsultation = '/v1/teleconsultation-flow/teleconsultation',
}

export enum bookingFlowEndPoints {
	// // * health
	// medicalStates = '/v1/booking-flow/health/states',
	// medicalCities = '/v1/booking-flow/health/cities',
	// medicalSpecialties = '/v1/booking-flow/health/specialties',
	// medicalProviders = '/v1/booking-flow/health/providers',
	// medicalAccreditedNetwork = '/v1/guide-flow/medical-guide/get-providers',
	// medicalSupportNetwork = '/v1/guide-flow/medical-guide/supportive-network',
	// medicalDates = '/v1/booking-flow/health/dates',
	// medicalTimes = '/v1/booking-flow/health/available-times',
	// medicalBookingConfirm = '/v1/booking-flow/health/book',
	medicalStates = '/v2/booking-flow/health/states',
	medicalCities = '/v2/booking-flow/health/cities',
	medicalSpecialties = '/v2/booking-flow/health/specialties',
	medicalProviders = '/v2/booking-flow/health/clinics',
	medicalDates = '/v2/booking-flow/health/dates',
	medicalSpecialists = '/v2/booking-flow/health/providers',
	medicalBookingConfirm = '/v2/booking-flow/health/scheduled-appointments',
	medicalSpecialistList = '/v2/booked-flow/health/scheduled-appointments/last',

	// * odonto
	odontoStates = '/v1/booking-flow/odonto/states',
	odontoCities = '/v1/booking-flow/odonto/cities',
	odontoSpecialties = '/v1/booking-flow/odonto/specialties',
	odontoDistricts = '/v1/booking-flow/odonto/districts',
	odontoProviders = '/v1/booking-flow/odonto/providers',
	odontoDates = '/v1/booking-flow/odonto/dates',
	odontoTimes = '/v1/booking-flow/odonto/available-times',
	odontoBookingConfirm = '/v1/booking-flow/odonto/book',

	// * exams
	examStates = '/v1/booking-flow/exams/states',
	examCities = '/v1/booking-flow/exams/cities',
	examPreparation = '/v1/booked-flow/exams/preparo-exams',
	examAuthorizedPrePassword = '/v1/booking-flow/exams/prepassword',
	examAuthorizedPassword = '/v1/booking-flow/exams/password',
	examsTypes = '/v1/booking-flow/exams/types',
	examProviders = '/v1/booking-flow/exams/providers',
	examDates = '/v1/booking-flow/exams/dates',
	examTimes = '/v1/booking-flow/exams/available-times',
	examBookingConfirm = '/v1/booking-flow/exams/book',

	// * tele - mesmos endpoints de marcação médica
	teleStates = '/v1/booking-flow/health/states',
	teleCities = '/v1/booking-flow/health/cities',
	teleSpecialties = '/v1/booking-flow/health/specialties',
	teleProviders = '/v1/booking-flow/health/providers',
	teleDates = '/v1/booking-flow/health/dates',
	teleTimes = '/v1/booking-flow/health/available-times',
	teleBookingConfirm = '/v1/booking-flow/health/book',
}

export enum bookedFlowEndPoints {
	// * odonto
	odontoBooked = '/v1/booked-flow/odonto/schedules',
	odontoBookedConfirm = '/v1/booked-flow/odonto/confirm',
	odontoRebooking = '/v1/booked-flow/odonto/reschedule',
	odontoCancel = '/v1/booked-flow/odonto/cancel',

	// * health
	// medicalBooked = '/v1/booked-flow/health/schedules',
	// medicalBookedConfirm = '/v1/booked-flow/health/confirm',
	// medicalRebooking = '/v1/booked-flow/health/reschedule',
	// medicalCancel = '/v1/booked-flow/health/cancel',
	medicalBooked = '/v2/booked-flow/health/scheduled-appointments/last',
	medicalExternalUrl = '/v1/teleconsultation-flow/teleconsultation',
	medicalBookedConfirm = '/v2/booking-flow/health/scheduled-appointments',
	medicalRebooking = '/v2/booking-flow/health/scheduled-appointments',
	medicalCancel = '/v2/booking-flow/health/scheduled-appointments',

	// * exams
	examsBooked = '/v1/booked-flow/exams/schedules',
	examsBookedConfirm = '/v1/booked-flow/exams/confirm',
	examsRebooking = '/v1/booked-flow/exams/reschedule',
	examsCancel = '/v1/booked-flow/exams/cancel',
}

export enum guideFlowEndpoints {
	// * odonto
	odontoGuideCities = '/v1/guide-flow/dental-guide/get-cities',
	odontoGuideStates = '/v1/guide-flow/dental-guide/get-states',
	odontoGuideServices = '/v1/guide-flow/dental-guide/get-services',
	odontoGuideProviders = '/v1/guide-flow/dental-guide/get-providers',
	odontoGuideSpecialties = '/v1/guide-flow/dental-guide/get-specialties',
	odontoGuideNeighborhoods = '/v1/guide-flow/dental-guide/get-neighborhoods',
	odontoGuideProvidersDetails = '/v1/guide-flow/dental-guide/get-providers-details',

	// * medical
	medicalGuideCities = '/v1/guide-flow/medical-guide/get-cities',
	medicalGuideStates = '/v1/guide-flow/medical-guide/get-states',
	medicalGuideServices = '/v1/guide-flow/medical-guide/get-services',
	medicalGuideProviders = '/v1/guide-flow/medical-guide/get-providers',
	medicalGuideSpecialties = '/v1/guide-flow/medical-guide/get-specialties',
	medicalGuideProvidersDetails = '/v1/guide-flow/medical-guide/get-providers-details',
}

export enum myPaymentsFlowEndPoints {
	payments = '/v1/my-payments-flow/payments',
	paymentsPdf = '/v1/my-payments-flow/payments/pdf',
	paymentsHistory = '/v1/my-payments-flow/payments/history',
	paymentsHistoryYears = '/v1/my-payments-flow/payments/history/years',
	incomeTax = '/v1/my-payments-flow/income',
	incomeTaxPDF = '/v1/my-payments-flow/income/pdf',
	coparticipationExtract = '/v1/co-participation-flow/co-participation',
	coparticipationExtractPdf = '/v1/co-participation-flow/co-participation/pdf',
}

export enum fiveStarsFlowEndPoints {
	fiveStarsQuestions = '/v1/five-stars-flow/five-stars',
	fiveStarsAnswers = '/v1/five-stars-flow/five-stars',
}

export enum prescriptionFlowEndPoints {
	prescription = '/v1/prescription/prescriptions',
	specialties = '/v1/prescription/specialties',
	create = '/v1/prescription/binding/create',
}

export enum certificateFlowEndPoints {
	certificate = '/v1/certificates',
	specialties = '/v1/specialties',
}

export enum statementFlowEndPoints {
	statement = '/v1/statement/statement',
	specialties = '/v1/statement/statement/specialties',
}

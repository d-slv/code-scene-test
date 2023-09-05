import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';

import * as factories from 'main/factories/pages';
import PublicRoutes from 'main/proxies/public-routes';
import {BeneficiariesRoute, PlanRoute} from 'main/proxies/inter-routes';
import PrivateRoutes from '../proxies/private-routes';

export const Router = () => (
	<BrowserRouter>
		<Routes>
			<Route path="*" element={<>Page not found</>} />

			{/* Rotas públicas */}
			<Route element={<PublicRoutes />}>
				<Route path="/" element={<factories.MakeLogin />} />
				<Route path="/login" element={<factories.MakeLogin />} />
				<Route path="/cadastro" element={<factories.MakeSignUpPage />} />
				<Route path="/sendtoken" element={<factories.MakeSignUpTokenPage />} />
				<Route path="/confirm" element={<factories.MakeSignUpConfirmPage />} />
				<Route path="/forgot-password" element={<factories.MakeForgotPasswordPage />} />
				<Route
					path="/forgot-password-token"
					element={<factories.MakeForgotPasswordTokenPage />}
				/>
				<Route
					path="/forgot-password-confirm"
					element={<factories.MakeForgotPasswordConfirmPage />}
				/>
			</Route>

			{/* Rotas intermediarias */}
			<Route element={<PlanRoute />}>
				<Route path="/plano" element={<factories.MakeSelectPlanPage />} />
			</Route>
			<Route element={<BeneficiariesRoute />}>
				<Route path="/plano/beneficiarios" element={<factories.MakeSelectBeneficiary />} />
			</Route>

			{/* Rotas privadas */}
			<Route element={<PrivateRoutes />}>
				<Route path="/home" element={<factories.MakeHomePage />} />
				<Route path="/minhas-consultas" element={<factories.MakeMyAppointments />} />
				<Route
					path="/minhas-consultas/detalhes-da-consulta"
					element={<factories.MakeMyAppointmentsDetail />}
				/>

				<Route path="/meus-exames" element={<factories.MakeMyExams />} />
				<Route
					path="/meus-exames/detalhes-do-exame"
					element={<factories.MakeMyExamsDetail />}
				/>

				<Route
					path="/central-de-atendimento"
					element={<factories.MakeTelephoneService />}
				/>

				<Route path="/central-de-ajuda" element={<factories.MakeHelpCenter />} />

				<Route path="/telefones-uteis" element={<factories.MakeUsefulPhones />} />

				<Route path="/meu-financeiro" element={<factories.MakeMyPayments />} />

				<Route path="/meus-exames/marcar-exame" element={<factories.MakeExamBooking />} />

				<Route
					path="/meus-exames/marcar-exame/confirmacao"
					element={<factories.MakeExamBookingCompleted />}
				/>

				<Route
					path="/minhas-consultas/marcar-dentista"
					element={<factories.MakeOdontoBooking />}
				/>

				<Route
					path="/minhas-consultas/marcar-dentista/confirmacao"
					element={<factories.MakeOdontoBookingCompleted />}
				/>

				<Route
					path="/minhas-consultas/marcar-consulta"
					element={<factories.MakeOverBooking />}
				/>

				<Route
					path="/minhas-consultas/marcar-consulta-saude"
					element={<factories.MakeMedicalBooking />}
				/>

				<Route
					path="/minhas-consultas/marcar-consulta/confirmacao"
					element={<factories.MakeHealthBookingCompleted />}
				/>

				<Route
					path="/minhas-consultas/marcar-teleconsulta"
					element={<factories.MakeTeleconsultationBooking />}
				/>

				<Route
					path="/minhas-consultas/marcar-teleconsulta/confirmacao"
					element={<factories.MakeTeleconsultationBookingCompleted />}
				/>

				<Route
					path="/minhas-consultas/remarcar-consulta"
					element={<factories.MakeMedicalMarkdown />}
				/>

				<Route
					path="/minhas-consultas/remarcar-consulta/confirmacao"
					element={<factories.MakeHealthMarkdownCompleted />}
				/>

				<Route
					path="/minhas-consultas/remarcar-dentista"
					element={<factories.MakeOdontoMarkdown />}
				/>

				<Route
					path="/minhas-consultas/remarcar-dentista/confirmacao"
					element={<factories.MakeOdontoMarkdownCompleted />}
				/>

				<Route
					path="/minhas-consultas/remarcar-teleconsulta"
					element={<factories.MakeTeleconsultationMarkdown />}
				/>

				<Route
					path="/minhas-consultas/remarcar-teleconsulta/confirmacao"
					element={<factories.MakeTeleconsultationMarkdownCompleted />}
				/>

				<Route
					path="/meus-exames/remarcar-exame"
					element={<factories.MakeExamMarkdown />}
				/>
				<Route
					path="/meus-exames/remarcar-exame/confirmacao"
					element={<factories.MakeExamMarkdownCompleted />}
				/>
				<Route path="/guia-odonto" element={<factories.MakeDentalGuide />} />
				<Route path="/guia-medico" element={<factories.MakeMedicalGuide />} />
			</Route>
		</Routes>
	</BrowserRouter>
);

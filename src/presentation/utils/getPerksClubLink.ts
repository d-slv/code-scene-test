import {Buffer} from 'buffer';

interface GetPerksClubLinkParams {
	nu_cpf: string;
	nm_usuario: string;
}

export function getPerksClubLink({nm_usuario, nu_cpf}: GetPerksClubLinkParams) {
	const date = new Date();
	const hash = `${String(date.valueOf())}|${nm_usuario}:${nu_cpf}`;
	const b64 = Buffer.from(hash).toString('base64');
	const linkURL = `https://clube.hapvida.com.br/callback/auth?oauth_session_token=${String(
		b64,
	).replace(/"/g, '')}`;
	return linkURL;
}

export class InvalidCredentialsError extends Error {
	constructor(message) {
		super('Error');
		this.name = 'InvalidCredentialsError';
		this.message = message;
	}
}

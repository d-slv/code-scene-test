export class InvalidTokenError extends Error {
	constructor(message) {
		super('Error');
		this.name = 'InvalidToken';
		this.message = message;
	}
}

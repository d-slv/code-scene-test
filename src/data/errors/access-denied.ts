export class AccessDeniedError extends Error {
	constructor(message) {
		super('Error');
		this.name = 'AccessDeniedError';
		this.message = message;
	}
}

export class BadRequestError extends Error {
	constructor(message) {
		super('Error');
		this.name = 'BadRequestError';
		this.message = message;
	}
}

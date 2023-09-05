export class UnprocessableError extends Error {
	constructor(message) {
		super('Error');
		this.name = 'UnprocesssableError';
		this.message = message;
	}
}

export class UnknowError extends Error {
	constructor(message) {
		super('Error');
		this.name = 'UnknowError';
		this.message = message;
	}
}

export class ConflictError extends Error {
	constructor(message) {
		super('Error');
		this.name = 'ConflictError';
		this.message = message;
	}
}

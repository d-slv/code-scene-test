export class NotFoundError extends Error {
	constructor(message) {
		super('Error');
		this.name = 'Not Found';
		this.message = message;
	}
}

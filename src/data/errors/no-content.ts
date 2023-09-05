export class NoContentError extends Error {
	constructor(message) {
		super('Error');
		this.name = 'No content';
		this.message = message;
	}
}

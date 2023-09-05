export class ServerError extends Error {
	constructor(message) {
		super('Error');
		this.name = 'ServerError';
		this.message = message;
	}
}

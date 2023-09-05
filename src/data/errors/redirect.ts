export class RedirectError extends Error {
	constructor(message) {
		super('Error');
		this.name = 'Redirect';
		this.message = message;
	}
}

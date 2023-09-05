export class UserNoExistenceError extends Error {
	constructor(message) {
		super('Error');
		this.name = 'UserExistenceError';
		this.message = message;
	}
}

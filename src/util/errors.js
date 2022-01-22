const errors = {
	INTERACTION_ALREADY_REPLIED: 'The reply to this interaction has already been sent or deferred',
	INTERACTION_NOT_REPLIED: 'The reply to this interaction has not been sent or deferred',
	INTERACTION_EPHEMERAL_REPLIED: 'Cannot delete ephemeral reply',
	INVALID_ARGUMENT: (name, expected) => `Supplied ${name} is not ${'aeiou'.split('').includes(expected.split('').shift().toLowerCase()) ? 'an' : 'a'} ${expected}`,
	INVALID_ELEMENT: (type, name, elm) => `Supplied ${type} ${name} includes an invalid element: ${elm}`,
	NO_GUILD_BUT_ROLE: 'Cannot resolve roles from, provide ID of role'
};

exports.makeError = function(BaseError) {
	class SlashError extends BaseError {
		constructor(fn, ...args) {
			fn = fn.toUpperCase().split(' ').join('_');
			super(errors[fn](...args));
		};
	};
	SlashError.name = BaseError.name;
	return SlashError;
};

exports.Error = exports.makeError(Error);

exports.TypeError = exports.makeError(TypeError);
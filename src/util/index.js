const errors = require('./errors');

exports.makeError = function(BaseError) {
	class SlashError extends BaseError {
		constructor(fn, ...args) {
			super(errors[fn](...args));
		};
	};
	SlashError.name = BaseError.name;
	return SlashError;
};

exports.TypeError = exports.makeError(TypeError);
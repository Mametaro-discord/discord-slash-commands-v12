'use strict';

class Base {
	/**
	 * @param  {Client} discord Client
	 */
	constructor(client) {
		/**
		 * @type {Client}
		 */
		Object.defineProperty(this, 'client', {
			value: client
		});
	};
};

module.exports = Base;
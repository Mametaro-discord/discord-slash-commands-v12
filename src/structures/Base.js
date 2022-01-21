'use strict';

module.exports = class Base {
	/**
	 * @param {Client}
	 */
	constructor(client) {
		/**
		 * @type {Client}
		 * @readonly
		 */
		Object.defineProperty(this, 'client', {
			value: client
		});
	};
};
'use strict';

class Base {
	/**
	* @param (Client) client from discord.js
	 */
	constructor(client) {
		Object.defineProperty(this, 'client', {
			value: client
		});
	};
};

module.exports = Base;
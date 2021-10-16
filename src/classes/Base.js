'use strict';

const { Client } = require('discord.js');

class Base {
	/**
	 * @param (Client) from discord.js
	 */
	constructor(client) {
		Object.defineProperty(this, 'client', {
			value: client
		});
	};
};

module.exports = Base;
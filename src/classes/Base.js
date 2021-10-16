'use strict';

const { Client } = require('discord.js');

class Base {
	/**
	 * @param (Client) from discord.js
	 */
	constructor(client) {
		if (client instanceof Client) return;

		Object.defineProperty(this, 'client', {
			value: client
		});
	};
};

module.exports = Base;
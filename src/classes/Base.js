'use strict';

const { Client } = require('discord.js');
const ExtendedClient = require('./ExtendedClient.js');

class Base {
	/**
	 * @param (Client) from discord.js
	 */
	constructor(client) {
		if (client instanceof Client) return;

		Object.defineProperty(this, 'client', {
			value: new ExtendedClient(client.options)
		});
	};
};

module.exports = Base;
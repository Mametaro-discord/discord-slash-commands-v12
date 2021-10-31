'use strict';

const { Client } = require('discord.js');
const ApplicationCommandManager = require('../classes/ApplicationCommandManager.js');

/**
 * @extends (Client)
 */
class ExtendedClient extends Client {
	/**
	 * @param (object) options
	 */
	constructor(options) {
		super(options);
	};
	/**
	 * @return (CommandManager)
	 */
	get commands() {
		return new ApplicationCommandManager(this);
	};
};

module.exports = ExtendedClient;
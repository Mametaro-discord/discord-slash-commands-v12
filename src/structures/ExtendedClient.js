'use strict';

const { Client } = require('discord.js');
const CommandManager = require('../classes/CommandManager.js');

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
		return new CommandManager(this);
	};
};

module.exports = ExtendedClient;
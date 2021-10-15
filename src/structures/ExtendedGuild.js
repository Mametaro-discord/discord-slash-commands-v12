'use strict';

const { Structures } = require('discord.js');
const Guild = Structures.get('Guild');

/**
 * @extends (Guild)
 */
class ExtendedGuild extends Guild {
	/**
	 * @param (Client) from discord.js
	 * @param (object) data
	 */
	constructor(client, data) {
		super(client, data);
	};
	/**
	 * @return (Command)
	 */
	get commands() {
		return new CommandManager(client);
	};
};

module.exports = ExtendedGuild;
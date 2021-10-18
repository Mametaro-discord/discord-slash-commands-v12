'use strict';

const { Structures } = require('discord.js');
const Guild = Structures.get('Guild');

/**
 * @extends (Guild)
 */
class ExtendedGuild extends Guild {
	/**
	 * @return (Command)
	 */
	get commands() {
		return new CommandManager(this.client);
	};
};

module.exports = ExtendedGuild;
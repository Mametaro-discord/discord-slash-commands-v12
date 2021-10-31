'use strict';

const Guild = require('discord.js').Structures.get('Guild');
const GuildApplicationCommandManager = require('../classes/GuildApplicationCommandManager.js');

/**
 * @extends (Guild)
 */
class ExtendedGuild extends Guild {
	/**
	 * @return (Command)
	 */
	get commands() {
		return new GuildApplicationCommandManager(this);
	};
};

module.exports = ExtendedGuild;
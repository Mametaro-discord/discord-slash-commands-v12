'use strict';

const Guild = require('discord.js').Structures.get('Guild');
const GuildCommandManager = require('../classes/GuildApplicationCommandManager.js');

/**
 * @extends (Guild)
 */
class ExtendedGuild extends Guild {
	/**
	 * @return (Command)
	 */
	get commands() {
		return new GuildCommandManager(this);
	};
};

module.exports = ExtendedGuild;

'use strict';

const CommandManager = require('./CommandManager.js');
const CommandPermissionsManager = require('./CommandPermissionsManager.js');

/**
 * @description () This is CommandManager for guild.
 * @extends (CommandManager)
 */
class GuildCommandManager extends CommandManager {
	/**
	 * @param (Guild)
	 */
	constructor(guild) {
		super(guild.client);

		this.guild = guild;

		this.guildId = guild.id;
	};
	/**
	 * @return (CommandPermissionsManager)
	 */
	get permissions() {
		return new CommandPermissionsManager(this);
	};
};

module.exports = GuildCommandManager;
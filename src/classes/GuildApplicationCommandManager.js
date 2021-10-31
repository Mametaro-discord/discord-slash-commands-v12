'use strict';

const ApplicationCommandManager = require('./ApplicationCommandManager');
const ApplicationCommandPermissionsManager = require('./ApplicationCommandPermissionsManager');

class GuildApplicationCommandManager extends ApplicationCommandManager {
	/**
	 * @param {Guild}
	 */
	constructor(guild) {
		super(guild.client);
		/**
		 * @type {Guild}
		 */
		this.guild = guild;
		/**
		 * @type {Snowflake}
		 */
		this.guildId = guild.id;
	};
	/**
	 * @type {ApplicationCommandPermissionsManager}
	 */
	get permissions() {
		return new ApplicationCommandPermissionsManager(this);
	};
};

module.exports = GuildApplicationCommandManager;
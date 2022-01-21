'use strict';

const ApplicationCommandManager = require('./ApplicationCommandManager');
const ApplicationCommandPermissionsManager = require('./ApplicationCommandPermissionsManager');

module.exports = class GuildApplicationCommandManager extends ApplicationCommandManager {
	/**
	 * @param {Guild}
	 * @param {ApplicationCommand[]}
	 */
	constructor(guild, iterable) {
		super(guild.client, iterable);
		/**
		 * @type {Guild}
		 */
		this.guild = guild;
		/**
		 * @type {ApplicationCommandPermissionsManager}
		 */
		this.permissions = new ApplicationCommandPermissionsManager(this);
	};
};
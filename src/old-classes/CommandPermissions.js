'use strict';

const Base = require('./Base.js');
const { ApplicationCommandPermissionsTypes } = require('../interface/Types.js');
const Util = require('../util/Util.js');

/**
 * @extends (Base)
 */
class CommandPermissions extends Base {
	/**
	 * @param (Client) client
	 * @param (object) data of command
	 */
	constructor(client, data = {}) {
		super(client);

		this.commandId = data.id;

		this.command = await this.client.commands.get(this.commandId);

		this.application_id = data.application_id;

		this.guildId = data.guildId;

		this.guild = client.guilds.cache.get(this.guildId);

		this.permissions = data.permissions;
	};
	/**
	 * @param (Snowflake)
	 * @return (boolean)
	 */
	async hasPermission(userId) {
		const permission = this.permissions.find(elm => elm.id === userId).permission;
		return permission ? permission : this.command.default_permission;
	};
};

module.exports = CommandPermissions;
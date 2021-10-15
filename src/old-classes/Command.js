'use strict';

const BaseCommand = require('./BaseCommand.js');
const { Collection, SnowflakeUtil } = require('discord.js');

/**
* @extends (BaseCommand)
 */
class Command extends BaseCommand {
	/**
	* @param (Client) client from discord.js
	* @param (object) data of interaction
	 */
	constructor(client, data = {}) {
		super(client, data);
	};
	/**
	 * @return (CommandManager)
	 */
	get manager() {
		const parent = this.guild ? this.guild : this.client;
		return parent.commands;
	};
	/**
	* @return (number) timestamp this was created
	 */
	get createdTimestamp() {
		return SnowflakeUtil.deconstructor(this.id).timestamp;
	};
	/**
	* @return (Date) time this was created
	 */
	get createdDate() {
		return new Date(this.createdTimestamp);
	};
	/**
	 * @optional* (Snowflake) its optional param if This command is guildCommand
	 * @return (object)
	 */
	async permission(guildId) {
		const useId = guildId ? guildId : this.guildId;
		if (!useId) return;
		const data = await this.client.applications(this.client.id).guilds(useId)
		.commands(this.id).permissions.get();
		return new CommandPermissions(this.client.id, data);
	};
	/**
	 * @return ()
	 */
	async delete() {
		return await this.manager.delete(this.id, this.guildId);
	};
	/**
	 * @param (bodySource)
	 * @return ()
	 */
	async edit(bodySource) {
		return await this.manager.edit(this.id, this.guildId);
	};
};

module.exports = Command;
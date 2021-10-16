'use strict';

const BaseCommand = require('./BaseCommand.js');
const CommandPermissionsManager = require('./CommandPermissionsManager.js');
const { SnowflakeUtil } = require('discord.js');

/**
 * @param (BaseCommand)
 */
class Command extends BaseCommand {
	/**
	 * @param (Client) from discord.js
	 * @param (object) data of command
	 */
	constructor(client, data = {}) {
		super(client, data);
	};
	/**
	 * @return (CommandPermissionsManager)
	 */
	get permissions() {
		return new CommandPermissionsManager(this);
	};
	/**
	 * @return (number)
	 */
	get createdTimestamp() {
		return SnowflakeUtil.deconstructor(this.id).timestamp;
	};
	/**
	 * @return (Date)
	 */
	get createdDate() {
		return new Date(this.createdTimestamp);
	};
	/**
	 * @return (CommandManager||GuildCommandManager)
	 */
	get manager() {
		return (this.guild ? this.guild : this.client).commands;
	};
	/**
	 * @param (CommandData)
	 * @return (Promise<Command>)
	 */
	async edit(data) {
		return await this.manager.edit(this.id, data, this.guildId);
	};
	/**
	 * @return (Promise<Command>)
	 */
	async delete() {
		return await this.manager.delete(this.id, this.guildId);
	};
};

module.exports = Command;
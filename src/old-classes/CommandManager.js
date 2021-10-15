'use strict';

const Base = require('./Base.js');
const Command = require('./Command.js');

/**
* @extends (Base)
 */
class CommandManager extends Base {
	/**
	 * @param (Client) from discord.js
	 */
	constructor(client, guildId) {
		super(client);
	};
	/**
	 * @return (CommandPermissionsManager)
	 */
	get permissions() {
		return new CommandPermissionsManager(this.client, this.guildId);
	};
	/**
	 * @param (Snowflake) id of command
	 * @optional (Snowflake)
	 * @return (Promise<Command>)
	 */
	async get(commandId, guildId) {
		const data = guildId 
		? (await this.client.api.applications(client.id).guilds(guildId).commands(commandId).get())
		: (await this.client.api.applications(client.id).commands(commandId).get());
		return new Command(this.client, data);
	};
	/**
	 * @optional (Snowflake) guildId
	 * @return (Array<Command>)
	 */
	async getAll(guildId) {
		const data = guildId 
		? (await this.client.api.applications(client.id).guilds(guildId).commands.get())
		: (await this.client.api.applications(client.id).commands.get());
		return new Command(this.client, data);
	}
	/**
	 * @param (CommandData)
	 * @optional (guildId)
	 * @return (Promise<Command>)
	 */
	async create(commandData, guildId) {
		const data = guildId 
		? (await this.client.api.applications(client.id).guilds(guildId).commands.post(commandData))
		: (await this.client.api.applications(client.id).commands.post(commandData));
		return new Command(this.client, data);
	};
	/**
	 * @param (Snowflake) commandId
	 * @param (CommandData)
	 * @optional (guildId)
	 * @return (Promise<Command>)
	 */
	async edit(commandId, commandData, guildId) {
		const data = guildId 
		? (await this.client.api.applications(client.id).guilds(guildId).commands(commandId).patch(commandData))
		: (await this.client.api.applications(client.id).commands(commandId).patch(commandData));
		return new Command(this.client, data);
	};
	/**
	 * @param (Snowflake) commandId
	 * @optional (Snowflake) guildId
	 * @return (Promise<Command>)
	 */
	async delete(commandId, guildId) {
		const data = guildId 
		? (await this.client.api.applications(client.id).guilds(guildId).commands(commandId).delete())
		: (await this.client.api.applications(client.id).commands(commandId).delete());
		return new Command(this.client, data);
	};
	/**
	 * @param (Array<CommandData>)
	 * @param (Snowflake) guildId
	 * @return (Promise<Command>)
	 */
	async set(commands, guildId) {
		const data = guildId 
		? (await this.client.api.applications(client.id).guilds(guildId).commands.put(commandData))
		: (await this.client.api.applications(client.id).commands.put(commandData));
	};
};

module.exports = CommandManager;
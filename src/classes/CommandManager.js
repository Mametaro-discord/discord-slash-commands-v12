'use strict';

const Command = require('./Command.js');
const CommandPermissionsManager = require('./CommandPermissionsManager.js');
const { makeCol } = require('../util/functions.js');

/**
 * @description () This is CommandManager for client.
 * @extends (Base)
 */
class CommandManager {
	/**
	 * @param (Client)
	 */
	constructor(client) {
		Object.defineProperty(this, 'client', {
			value: client
		});
	};
	/**
	 * @return (Collection<Snowflake, Command>)
	 */
	get col() {
		return await this.fetch();
	};
	/**
	 * @return (CommandPermissionsManager)
	 */
	get permissions() {
		return new CommandPermissionsManager(this);
	};
	/**
	 * @param (CommandData)
	 * @optional (Snowflake)
	 * @optional (Promise<Command>)
	 */
	async create(commandData, guildId) {
		const data = guildId
		? (await this.client.api.applications(this.client.id).guilds(guildId).commands.post(commandData))
		: (await this.client.api.applications(this.client.id).commands.post(commandData));
		return new Command(this.client, data);
	};
	/**
	 * @param (Snowflake) id of command
	 * @optional (Snowflake) id of guild
	 * @return (Promise<Command>)
	 */
	async delete(commandId, guildId) {
		const data = guildId
		? (await this.client.api.applications(this.client.id).guilds(guildId).commands(commandId).delete())
		: (await this.client.api.applications(this.client.id).commands(commandId).delete());
		return new Command(this.client, data);
	};
	/**
	 * @param (Snowflake) id of command
	 * @param (CommandData)
	 * @optional (Snowflake) id of guild
	 * @return (Promise<Command>)
 	 */
 	async edit(commandId, commandData, guildId) {
 		const data = guildId 
 		? (await this.client.api.applications(this.client.id).guilds(guildId).commands(commandId).patch(commandData))
 		: (await this.client.api.applications(this.client.id).commands(commandId).patch(commandData));
 		return new Command(this.client, data);
 	};
	/**
	 * @param (Snowflake) id of command
	 * @optional (Snowflake) id of guild
	 * @return (Promise<(Command|Collection<Snowflake, Command>)>)
	 */
	async fetch(commandId, guildId) {
		let data = commandId 
		? guildId
		? (await this.client.api.applications(this.client.id).guilds(guildId).commands(commandId).get())
		: (await this.client.api.applications(this.client.id).commands(commandId).get())
		: (await this.client.api.applications(this.client.id).commands.get());

		if (data instanceof Array) {
			data = data.map(elm => new Command(this.client, elm));
			data = await makeCol(data);
		} else {
			data = new Command(this.client, data);
		};
		return data;
	};
	/**
	 * @param (Array<CommandData>)
	 * @optional (guildId)
	 * @return (Promise<Collection<Snowflake, Command>>)
	 */
	async set(arr, guildId) {
		const data = guildId 
		? (await this.client.api.applications(this.client.id).guilds(guildId).commands.put(arr))
		: (await this.client.api.applications(this.client.id).commands.put(arr));
		return new Command(this.client, data);
	};
};

module.exports = CommandManager;
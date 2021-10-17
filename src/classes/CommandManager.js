'use strict';

const Base = require('./Base.js');
const Command = require('./Command.js');
const CommandPermissionsManager = require('./CommandPermissionsManager.js');
const { makeCol } = require('../util/functions.js');

/**
 * @description () This is CommandManager for client.
 * @extends (Base)
 */
class CommandManager extends Base {
	/**
	 * @param (Client)
	 */
	constructor(client) {
		super(client);
	};
	/**
	 * @return (Collection<Snowflake, Command>)
	 */
	get col() {
		return this.fetch();
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
		while (!client.user) setTimeout(() => undefined, 1);
		const data = (guildId
		? (await this.client.api.applications(this.client.user.id).guilds(guildId))
		: (await this.client.api.applications(this.client.user.id)))
		.commands
		.post({
			data: commandData
		});
		return new Command(this.client, data);
	};
	/**
	 * @param (Snowflake) id of command
	 * @optional (Snowflake) id of guild
	 * @return (Promise<Command>)
	 */
	async delete(commandId, guildId) {
		const data = (guildId
		? (await this.client.api.applications(this.client.user.id).guilds(guildId))
		: (await this.client.api.applications(this.client.user.id)))
		.commands(commandId)
		.delete()
		return new Command(this.client, data);
	};
	/**
	 * @param (Snowflake) id of command
	 * @param (CommandData)
	 * @optional (Snowflake) id of guild
	 * @return (Promise<Command>)
 	 */
 	async edit(commandId, commandData, guildId) {
 		const data = (guildId 
 		? (await this.client.api.applications(this.client.user.id).guilds(guildId))
 		: (await this.client.api.applications(this.client.user.id)))
 		.commands(commandId)
 		.patch({
 			data: commandData
 		});
 		return new Command(this.client, data);
 	};
	/**
	 * @param (Snowflake) id of command
	 * @optional (Snowflake) id of guild
	 * @return (Promise<(Command|Collection<Snowflake, Command>)>)
	 */
	async fetch({ commandId, guildId } = options) {
		const guild = this.guildId ? this.guildId : guildId;
		let data;
		if (commandId) {
			data = (guild
			? (await this.client.api.applications(this.client.user.id).guilds(guild).commands(commandId))
			: (await this.client.api.applications(this.client.user.id).commands(commandId))
			).get();
		} else {
			data = (guild
			? (await this.client.api.applications(this.client.user.id).guilds(guild).commands)
			: (await this.client.api.applications(this.client.user.id).commands)
			).get();
		};

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
		const guild = this.guildId ? this.guildId : guildId;
		const data = (guildId 
		? (await this.client.api.applications(this.client.user.id).guilds(guildId))
		: (await this.client.api.applications(this.client.user.id)))
		.commands
		.put(arr);
		return new Command(this.client, data);
	};
};

module.exports = CommandManager;
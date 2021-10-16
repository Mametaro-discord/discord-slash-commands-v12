'use strict';

const { Collection, BaseManager } = require('discord.js');
const Command = require('./Command.js');
const CommandPermissionsManager = require('./CommandPermissionsManager.js');
const { makeCol } = require('../util/functions.js');

/**
 * @description (This is CommandManager for client.)
 * @extends (BaseManager)
 */
class CommandManager extends BaseManager {
	constructor(client, iterable) {
		super(client, iterable, Command);
		this.permissions = new CommandPermissionsManager(this);
	}

	/**
	 * @param (CommandData)
	 * @optional (Snowflake)
	 * @optional (Promise<Command>)
	 */
	async create(commandData, guildId) {
		let route = this.client.api.applications(this.client.user.id);
		if (guildId) route = route.guilds(guildId);
		const data = await route.commands.post({
			data: commandData
		});
		if (guildId) return this.add(data, true, guildId);
		return this.add(data, true);
	}

	/**
	 * @param (Snowflake) id of command
	 * @optional (Snowflake) id of guild
	 * @return (Promise<Command>)
	 */
	async delete(commandId, guildId) {
		let route = this.client.api.applications(this.client.user.id);
		if (guildId) route = route.guilds(guildId);
		await route.commands(commandId).delete();
		const cached = this.cache.get(commandId);
		if (!guildId) this.cache.delete(commandId);
		return cached;
	}

	/**
	 * @param (Snowflake) id of command
	 * @param (CommandData)
	 * @optional (Snowflake) id of guild
	 * @return (Promise<Command>)
	 */
	async edit(commandId, commandData, guildId) {
		let route = this.client.api.applications(this.client.user.id);
		if (guildId) route = route.guilds(guildId);
		const data = await route.commands(commandId).patch({
			data: commandData
		});
		if (guildId) return this.add(data, true, guildId);
		return this.add(data, true);
	}

	/**
	 * @param (Snowflake) id of command
	 * @optional (Snowflake) id of guild
	 * @return (Promise<(Command|Collection<Snowflake, Command>)>)
	 */
	async fetch(options = {}) {
		const {
			commandId,
			guildId
		} = options;
		const guild = this.guildId ? this.guildId : guildId;
		let data;
		if (commandId) {
			data = (guild ?
				(await this.client.api.applications(this.client.user.id).guilds(guild).commands(commandId)) :
				(await this.client.api.applications(this.client.user.id).commands(commandId))
			).get();
		} else {
			data = (guild ?
				(await this.client.api.applications(this.client.user.id).guilds(guild).commands) :
				(await this.client.api.applications(this.client.user.id).commands)
			).get();
		};
		console.log('ee', data)

		if (data instanceof Array) {
			data = data.map(elm => new Command(this.client, elm));
			data = await makeCol(data);
		} else {
			data = new Command(this.client, data);
		};
		return data;
	}

	/**
	 * @param (Array<CommandData>)
	 * @optional (guildId)
	 * @return (Promise<Collection<Snowflake, Command>>)
	 */
	async set(arr, guildId) {
		const guild = this.guildId ? this.guildId : guildId;
		const data = (guildId ?
				(await this.client.api.applications(this.client.user.id).guilds(guildId)) :
				(await this.client.api.applications(this.client.user.id)))
			.commands
			.put(arr);
		return new Command(this.client, data);
	}

	add(data, cache, guildId) {
		return super.add(data, cache, {
			extras: [this.guild, guildId]
		});
	}
};

module.exports = CommandManager;
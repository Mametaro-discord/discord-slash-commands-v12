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
	 * @return (?)
	 */
	get path() {
		return this.client.api.applications(this.client.user.id);
	};
	/**
	 * @return (Collection<Snowflake, Command>)
	 */
	get col() {
		if (!this.client.user) throw new Error('NOT_LOGINED: You can access commands after login.\nYou should do that in the ready event block.');
		let data;
		const get = async () => await this.fetch();
		get();
		return data;
	};
	/**
	 * @return (CommandPermissionsManager)
	 */
	get permissions() {
		if (!this.client.user) throw new Error('NOT_LOGINED: You can access commands after login.\nYou should do that in the ready event block.');
		return new CommandPermissionsManager(this);
	};
	/**
	 * @param (CommandData)
	 * @optional (Snowflake)
	 * @optional (Promise<Command>)
	 */
	async create(commandData, guildId) {
		if (!this.client.user) throw new Error('NOT_LOGINED: You can access commands after login.\nYou should do that in the ready event block.');
		const path = (guildId
				? (this.path.guilds(guildId))
				: this.path
			).commands;
		const data = await path.post({
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
		if (!this.client.user) throw new Error('NOT_LOGINED: You can access commands after login.\nYou should do that in the ready event block.');
		const path = (guildId
				? this.path.guilds(guildId)
				: this.path
			).commands(commandId);
		const data = await path.delete();
		return new Command(this.client, data);
	};
	/**
	 * @param (Snowflake) id of command
	 * @param (CommandData)
	 * @optional (Snowflake) id of guild
	 * @return (Promise<Command>)
 	 */
 	async edit(commandId, commandData, guildId) {
 		if (!this.client.user) throw new Error('NOT_LOGINED: You can access commands after login.\nYou should do that in the ready event block.');
 		const path = (guildId
 				? this.path.guilds(guildId)
 				: this.path
 			).commands(commandId);
 		const data = await path.patch({
 			data: commandData
 		});
 		return new Command(this.client, data);
 	};
	/**
	 * @param (Snowflake) id of command
	 * @optional (Snowflake) id of guild
	 * @return (Promise<(Command|Collection<Snowflake, Command>)>)
	 */
	async fetch(options = {}) {
		if (!this.client.user) throw new Error('NOT_LOGINED: You can access commands after login.\nYou should do that in the ready event block.');
		const { commandId, guildId } = options;
		const guild = this.guildId ? this.guildId : guildId;
		let path;
		if (commandId) {
			path = (guildId
					? this.path.guilds(guildId)
					: this.path
				).commands(commandId);
		} else {
			path = (guildId
					? this.path.guilds(guildId)
					: this.path
				).commands;
		};
		let data = await path.get();

		if (Array.isArray(data)) {
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
	async set(arr = [], guildId) {
		if (!this.client.user) throw new Error('NOT_LOGINED: You can access commands after login.\nYou should do that in the ready event block.');
		const guild = this.guildId ? this.guildId : guildId;
		const path = (guildId
				? this.path.guilds(guildId)
				: this.path
			).commands;
		const data = await path.put(arr);
		return new Command(this.client, data);
	};
};

module.exports = CommandManager;
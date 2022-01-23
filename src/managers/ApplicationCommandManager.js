'use strict';

const ApplicationCommand = require('../structures/ApplicationCommand');
const ApplicationCommandPermissionsManager = require('./ApplicationCommandPermissionsManager');
const {
	ApplicationCommandTypes
} = require('../interfaces/consts');
const { BaseManager, Collection } = require('discord.js');
const { TypeError } = require('../util/errors');

module.exports = class ApplicationCommandManager extends BaseManager {
	/**
	 * @param {Client}
	 * @param {ApplicationCommandData[]} @optional
	 */
	constructor(client, itrable) {
		super(client, ApplicationCommand, iterable);
		/**
		 * @param {ApplicationCommandPermissionsManager}
		 */
		this.permissions = new ApplicationCommandPermissionsManager(this);
	};
	/**
	 * @param {ApplicationCommandData}
	 * @param {boolean} @optional
	 * @param {Snowflake} @optional
	 * @return {ApplicationCommand}
	 */
	add(data, cache, guildId) {
		return this.add(
				data,
				cache,
				{
					extras: [this.guild, guildId]
				}
			);
	};
	/**
	 * @param {PathApplicationCommandOptions}
	 * @return {Object}
	 */
	path({ commandId, guildId } = {}) {
		let path = this.client.api.applications(this.client.user.id);
		if (guildId) path = path.guilds(guildId);
		return commandId ? path.commands(commandId) : path.comamnds;
	};
	/**
	 * @param {Snowflake}
	 * @param {FetchApplicationCommandOptions}
	 * @return {Promise<ApplicationCommand | Collection<Snowflake, ApplicationCommand>>}
	 */
	async fetch(commandId, { guildId, cache = true, force = false } = {}) {
		if (commandId) {
			if (typeof commandId === 'object') ({ guildId, cache = true, force = false } = commandId);
			else {
				if (!force) {
					const existing = this.cache.get(commandId);
					if (existing) return existing;
				};
				const data = await this.path({ commandId, guildId }).get();
				return this.add(data, cache, guildId);
			};
		};

		const data = await this.path({ guildId });
		return data.reduce(
				(col, elm) => col.set(elm.id, this.add(elm, cache, guildId)),
				new Collection()
			);
	};
	/**
	 * @param {ApplicationCommandData}
	 * @param {Snowflake} @optional
	 * @return {Promise<ApplicationCommand>}
	 */
	async create(data, guildId) {
		data = await this.path({ guildId }).post({
			data: this.constructor.transformCommand(data)
		});
		return this.add(data, true, guildId);
	};
	/**
	 * @param {ApplicationCommandResolvable}
	 * @param {ApplicationCommandData}
	 * @param {Snowflake} @optional
	 * @return {Promise<ApplicationCommand>}
	 */
	async edit(command, data = {}, guildId) {
		const commandId = this.resolveId(command);
		if (!commandId) throw new TypeError('invalid argument', 'command', 'ApplicationCommandResolvable');

		data = await this.path({ commandId, guildId }).patch({
			data: data
		})

		return this.add(data, true, guildId);
	};
	/**
	 * @param {ApplicationCommandResolvable}
	 * @param {Snowflake} @optional
	 * @return {Promise<ApplicationCommand>}
	 */
	async delete(command, guildId) {
		const commandId = this.resolveId(command);
		if (!commandId) throw new TypeError('invalid argument', 'command', 'ApplicationCommandResolvable');

		const data = await this.path({ commandId, guildId }).delete();

		return this.add(data, true, guildId);
	};
	/**
	 * @param {ApplicationCommandData[]}
	 * @param {Snowflake} @optional
	 * @return {Promise<Collection<Snowflake, ApplicationCommand>>}
	 */
	async set(commands, guildId) {
		const data = await this.path({ guildId }).put({
			data: commands.map(this.constructor.transformCommand)
		});

		return data.reduce(
				(col, command) => col.set(
						command.id,
						this.add(command, true, guildId)
					)
			);
	};
	/**
	 * @param {APIApplicationCommand | ApplicationCommandData}
	 * @param {boolean} @optional //Whether the command was received from guild
	 * @return {APIApplicationCommand | ApplicationCommand}
	 */
	static transformCommand(data = {}, received) {
		let result = {
			type: received
				? typeof data.type === 'string'
					? data.type
					: ApplicationCommandTypes[data.type]
				: typeof data.type === 'number'
					? data.type
					: ApplicationCommandTypes[data.type],
			name: data.name,
			description: data.description,
			options: (data.options || []).map(option => ApplicationCommand.transformOption(option, received)),
			[received ? 'defaultPermission' : 'default_permission']: data.defaultPermission || data.default_permission
		};

		if (received) {
			Object.assign(
				result,
				{
					id: data.id,
					applicationId: data.application_id,
					guildId: data.guild_id,
					version: data.version
				}
			);
		};

		return result;
	};
};
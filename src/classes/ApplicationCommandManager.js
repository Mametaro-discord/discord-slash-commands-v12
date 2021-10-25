'use strict';

const ApplicationCommand = require('./ApplicationCommand');
const ApplicationCommandPermissionsManager = require('./ApplicationCommandPermissionsManager');
const Util = require('../util/Util');
const { BaseManager } = require('discord.js');
const { makeCol } = require('../util/functions');

class ApplicationCommandManager extends BaseManager {
	/**
	 * @param {Client}
	 * @param {Array<"Structure">}
	 * @param {"Structure".constructor}
	 */
	constructor(client, iterable, holds) {
		super(client, iterable, ApplicationCommand);
	};
	/**
	 * @type {ApplicationCommandPermissionsManager}
	 */
	get permissions() {
		return new ApplicationCommandPermissionsManager(this);
	};
	/**
	 * @param {ApplicationCommandData}
	 * @param {boolean}
	 * @param {Snowflake}
	 * @return {"Structure"}
	 */
	add(data, cache, guildId) {
		return super.add(data, cache, {
			extras: [this.guild, guildId]
		});
	};
	/**
	 * @param {Snowflake} options.commandId
	 * @param {Snowflake} options.guildId
	 * @return {object}
	 */
	commandPath({ commandId, guildId } = {}) {
		const guild = this.guildId || guildId;
		let path = this.client.api.applications(this.client.application.commandId);
    	if (guild) path = path.guilds(guild);
    	return commandId ? path.commands(commandId) : path.commands;
	};
	/**
	 * @param {ApplicationCommandData}
	 * @param {Snowflake}
	 * @return {Promise<ApplicationCommand>}
	 */
	async create(data, guildId) {
		const guild = this.guildId || guildId;
		const data = await this.commandPath({
			guildId: guild
		})
		.post({
			data: Util.transformApplicationCommand(data)
		});

		this.add(data, true, guild);
	};
	/**
	 * @param {array<ApplicationCommandData>}
	 * @param {Snowflake}
	 * @return {Promise<Collection<Snowflake, ApplicationCommand>>}
	 */
	async set(commands, guildId) {
		const guild = this.guildId || guildId;
		let data = await this.commandPath({
			guildId: guild
		})
		.put({
			data: Util.transformApplicationCommand(commands)
		});
		data = data.map(elm => {
			this.add(elm, true, guild);
			return new ApplicationCommand(this.client, elm);
		});
		return makeCol(data);
	};
	/**
	 * @param {Snowflake}
	 * @param {CommandData}
	 * @param {Snowflake}
	 * @return {Promise<ApplicationCommand>}
	 */
	async edit(commandId, data, guildId) {
		const guild = this.guildId || guildId;
		const patched = await this.commandPath({
			id: commandId,
			guildId: guild
		})
		.patch({
			data: data
		});
		return this.add(patched, true, guild);
	};
	/**
	 * @param {Snowflake}
	 * @param {Snowflake}
	 * @return {Promise<ApplicationCommand>}
	 */
	async delete(commandId, guildId) {
		const guild = this.guildId || guildId;
		await this.commandPath({
			id: commandId,
			guildId: guild
		})
		.delete();
		this.cache.delete();

		if (!guild) {
			this.cache.delete(commandId);
		};
		return this.cache.get(commandId) || null;
	};
	/**
	 * @param {Snowflake} options.id
	 * @param {Snowflake} options.guildId
	 * @param {boolean} options.cache
	 * @param {boolean} options.force
	 * @return {Promise<(ApplicationCommand||Collection<Snowflake, ApplicationCommand>||Collection<Snowflake, Collection<ApplicationCommand>>)>}
	 */
	async fetch({ commandId, guildId, cache = true, force = false } = {}) {
		const guild = this.guildId || guildId;

		if (commandId && !force) {
			const existing = this.cache.get(commandId);
			if (existing) return existing;
		};

		let data;
		if (!commandId && !guild) {
			data = await this.commandPath().get();
		} else {
			data = await this.commandPath({
				commandId: commandId,
				guildId: guild
			}).get();
		};

		if (Array.isArray(data)) {
			data = data.map(elm => this.add(elm, cache, guild));
			return makeCol(data);
		} else {
			return this.add(data, cache, guild);
		};
	};
};

module.exports = ApplicationCommandManager;
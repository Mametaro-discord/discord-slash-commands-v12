'use strict';

const { ApplicationCommandPermissionsTypes } = require('../interfaces/Types.js');
const Base = require('./Base.js');
const { Collection } = require('discord.js');  
const { makeCol } = require('../util/functions.js');
const Util = require('../util/Util.js');

/**
 * @extends (Base)
 */
class CommandPermissionsManager extends Base {
	/**
	 * @param (Command|CommandManager|GuildCommandManager)
	 */
	constructor(manager) {
		super(manager.client);

		this.manager = manager;

		this.guild = manager.guild 
		? manager.guild 
		: (this.guildId ? this.client.guilds.cache.get(this.guildId) : undefined);

		this.guildId = manager.guildId ? manager.guildId : undefined;

		this.commandId = manager.commandId ? manager.commandId : undefined;
	};
	/**
	 * @return (?)
	 */
	get path() {
		return this.client.api.applications(this.client.user.id);
	};
	/**
	 * @return (Collection<(Snowflake, Collection<Snowflake, Array<CommandPermissions>>)>)
	 */
	get col() {
		if (!this.client.user) throw new Error('NOT_LOGINED: You can access commands after login.\nYou should do that in the ready event block.');
		let colSrc;
		const guilds = this.client.guilds.cache;
		guilds.forEach(async guild => {
			const path = this.path
			guilds(guild.id)
			.commands;
			const data = await path.get();
			const col = await makeCol(data);
			colSrc.push([
					guild.id,
					col
				])
		});
		return new Collection(colSrc);
	};
	/**
	 * @param (AddCommandPermissionsOptions)
	 * @return (Promise<Array<CommandPermissions>>)
	 */
	async add({ guildId, commandId, permissions = [] } = options) {
		if (!this.client.user) throw new Error('NOT_LOGINED: You can access commands after login.\nYou should do that in the ready event block.');
		const path = this.path
		.guilds(this.guildId ? this.guildid : guildId)
		.commands(this.commandId ? this.commandId : commandId);

		const data = await path.put({
			data: permissions
		});
		return Util.transformApplicationCommandPermissions(data.permissions);
	};
	/**
	 * @param (CommandPermissionsOptions)
	 * @return (Promise<(Array<CommandPermissions>|Collection<Snowflake, Array<CommandPermissions>>)>)
	 */
	async fetch({ guildId, commandId } = options) {
		if (!this.client.user) throw new Error('NOT_LOGINED: You can access commands after login.\nYou should do that in the ready event block.');
		if (!this.guildId&&!guildId) {
			let colSrc = [];
			this.client.guilds.cache.forEach(async guild => {
				const path = this.path
				.guilds(guild.id)
				.commands;
				const data = await path.get();
				const col = await makeCol(data);
				colSrc.push([
						guild.id,
						col
					]);
			});
			return new Collection(colSrc);
		};
		const path = (!this.commandId&&!commandId
				? (this.path
					.guilds(this.guildId ? this.guildId : guildId)
					.commands)
				: (this.path
					.guilds(this.guildId ? this.guildId : guildId)
					.commands(this.commandId ? this.commandId : commandId))
			).permissions;
		let data = await path.get();

		if (data instanceof Array) {
			data = data.map(elm => Util.transformApplicationCommandPermissions(elm.permissions));
			data = await makeCol(data);
		} else {
			data = Util.transformApplicationCommandPermissions(data.permissions);
		};
		return data;
	};
	/**
	 * @param (RemoveCommandPermissionsOptions)
	 * @return (Promise<Array<CommandPermissions>>)
	 */
	async remove({ guildId, commandId, users, roles } = options) {
		if (!this.client.user) throw new Error('NOT_LOGINED: You can access commands after login.\nYou should do that in the ready event block.');
		const guild = this.guildId ? this.guildId : guildId;
		const command = this.commandId ? this.commandId : commandId;
		const path = this.path
		.guilds(guild)
		.commands(command)
		.permissions;

		const src = await path.get();

		const permissions = src.permissions.filter(elm => {
			if (elm.type === ApplicationCommandPermissionsTypes['ROLE']) {
				return String(elm.id) !== roles;
			} else {
				return String(elm.id) !== users;
			};
		});

		const data = await path.put({
			data: permissions
		});

		return Util.transformApplicationCommandPermissions(data.permissions);
	};
	/**
	 * @param (SetCommandPermissionsOptions)
	 * @return (Promise<(Array<CommandPermissions>|Collection<Snowflake, Array<CommandPermissions>>)>)
	 */
	async set({ guildId, commandId, permissions, fullPermissions } = options) {
		if (!this.client.user) throw new Error('NOT_LOGINED: You can access commands after login.\nYou should do that in the ready event block.');
		let data;
		const guild = this.guildId ? this.guildId : guildId;
		if (fullPermissions) {
			const path = this.path
			.guilds(guild)
			.command
			.permissions;
			data = await path.put({
				data: fullPermissions
			});
		} else {
			const command = this.commandId ? this.commandId : commandId;
			const path = this.path
			.guilds(guild)
			.commands(command)
			.permissions;
			data = await path.put({
				data: permissions
			});
		};

		if (data instanceof Array) {
			data = data.map(elm => Util.transformApplicationCommandPermissions(elm.permissions));
			data.makeCol(data);
		} else {
			data = Util.transformApplicationCommandPermissions(data);
		};
		return data;
	};
};

module.exports = CommandPermissionsManager;
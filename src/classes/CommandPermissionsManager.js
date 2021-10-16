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
		this.manager = manager;

		super(manager.client);

		this.guild = manager.guild 
		? manager.guild 
		: (this.guildId ? this.client.guilds.cache.get(this.guildId) : undefined);

		this.guildId = manager.guildId ? manager.guildId : undefined;

		this.commandId = manager.commandId ? manager.commandId : undefined;
	};
	/**
	 * @return (Collection<(Snowflake, Collection<Snowflake, Array<CommandPermissions>>)>)
	 */
	get col() {
		let colSrc;
		const guilds = this.client.guilds.fetch();
		for (guild of guilds) {
			const commands = this.client.api.applications(this.client.user.id)
			.guilds(guild.id)
			.commands
			.get();
			const col = makeCol(commands);
			colSrc.push([
						guild.id,
						col
				]);
		};
		return new Collection(colSrc);
	};
	/**
	 * @param (AddCommandPermissionsOptions)
	 * @return (Promise<Array<CommandPermissions>>)
	 */
	async add({ guildId, commandId, permissions = [] } = options) {
		const data = await this.client.api.applications(this.client.user.id)
		.guilds(this.guildId ? this.guildid : guildId)
		.commands(this.commandId ? this.commandId : commandId)
		.put({
			data: permissions
		});
		return Util.transformApplicationCommandPermissions(data.permissions);
	};
	/**
	 * @param (CommandPermissionsOptions)
	 * @return (Promise<(Array<CommandPermissions>|Collection<Snowflake, Array<CommandPermissions>>)>)
	 */
	async fetch({ guildId, commandId } = options) {
		let data = !this.commandId&&!commandId
		? (await this.client.api.applications(this.client.user.id)
		.guilds(this.guildId ? this.guildId : guildId)
		.commands)
		: (await this.client.api.applications(this.client.user.id)
		.guilds(this.guildId ? this.guildId : guildId)
		.commands(this.commandId ? this.commandId : commandId))
		.permissions
		.get();

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
		const guild = this.guildId ? this.guildId : guildId;
		const command = this.commandId ? this.commandId : commandId;

		const src = await this.api.applications(this.client.user.id)
		.guilds(guild)
		.commands(command)
		.permissions
		.get();

		const permissions = src.permissions.filter(elm => {
			if (elm.type === ApplicationCommandPermissionsTypes['ROLE']) {
				return String(elm.id) !== roles;
			} else {
				return String(elm.id) !== users;
			};
		});

		const data = await this.client.api.applications(this.client.user.id)
		.guilds(guild)
		.commands(command)
		.permissions
		.put({
			data: permissions
		});

		return Util.transformApplicationCommandPermissions(data.permissions);
	};
	/**
	 * @param (SetCommandPermissionsOptions)
	 * @return (Promise<(Array<CommandPermissions>|Collection<Snowflake, Array<CommandPermissions>>)>)
	 */
	async set({ guildId, commandId, permissions, fullPermissions } = options) {
		let data;
		const guild = this.guildId ? this.guildId : guildId;
		if (fullPermissions) {
			data = await this.client.api.applications(this.client.user.id)
			.guilds(guild)
			.commands
			.permissions
			.put({
				data: fullPermissions
			});
		} else {
			const command = this.commandId ? this.commandId : commandId;
			data = await this.client.api.applications(this.client.user.id)
			.guilds(guild)
			.commands(command)
			.permissions
			.put({
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
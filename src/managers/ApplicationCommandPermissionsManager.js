'use strict';

const Base = require('../structures/Base');
const {
	ApplicationCommandPermissionTypes
} = require('../interfaces/consts');
const { makeError } = require('../util/errors');
const TypeError = makeError(TypeError);
const { Collection } = require('discord.js');

module.exports = class ApplicationCommandPermissionsManager extends Base {
	/**
	 * @param {ApplicationCommand | ApplicationCommandManager}
	 */
	constructor(manager) {
		super(manager.client);
		/**
		 * @type {ApplicationCommand | ApplicationCommandManager}
		 */
		this.manager = manager;
		/**
		 * @type {?Guild}
		 */
		this.guild = manager.guild || null;
		/**
		 * @type {?Snowflake}
		 */
		this.guildId = manager.guildId || (this.guild && this.guild.id) || null;
		/**
		 * @type {?Snowflake}
		 */
		this.commandId = manager.id || null;
	};
	/**
	 * @param {Snowflake}
	 * @param {Snowflake} @optional
	 * @return {Object}
	 */
	path(guildId, commandId) {
		return commandId
			? this.client.api
				.applications(this.client.user.id)
				.guilds(guildId)
				.commands(commandId)
				.permissions
			: this.client.api
				.applications(this.client.user.id)
				.guilds(guildId)
				.commands
				.permissions;
	};
	/**
	 * @param {FetchApplicationCommandPermissionsOptions} @optional
	 * @return {Promise<ApplicationCommandPermissions[] | Collection<Snowflake, ApplicationCommandPermissions[]>>}
	 */
	async fetch({ guild, command } = {}) {
		const { guildId, commandId } = this.resolveIds({ guild, command });
		if (commandId) {
			const data = await this.path(guildId, commandId).get();
			return data.permissions.map(perm => this.constructor.transformPermissions(perm, true));
		}
		return (await this.path(guildId).get()).reduce(
				(col, perm) => col.set(
						perm.id,
						perm.permissions.map(p => this.constructor.transformPermissions(p, true))
					),
				new Collection()
			);
	};
	/**
	 * @param {SetApplicationCommandPermissionsOptions}
	 * @return {Promise<ApplicationCommandPermissions[] | Collection<Snowflake, ApplicationCommandPermissions[]>>}
	 */
	async set({ guild, command, permissions, fullPermissions }) {
		const { guildId, commandId } = this.resolveIds({ guild, command });

		if (commandId) {
			if (!Array.isArray(permissions)) 
				throw makeError(TypeError, 'invalid argument', 'permissions', 'array of ApplicationCommandPermissions');
			const data = await this.path(guildId, commandId).put({
				data: {
					permissions: permissions.map()
				}
			})
			return data.permissions.map(perm => this.resolveIds(perm, true));
		};

		if (!Array.isArray(fullPermissions)) 
			throw makeError(TypeError, 'invalid type', 'permissions', 'array of ApplicationCommandPermissions');

		fullPermissions = fullPermissions.map(perm => {
			if (!Array.isArray(perm.permissions)) 
				throw makeError(TypeError, 'invalid argument', 'Array', 'fullPermissions', perm);
			return {
				id: perm,
				permissions: perm.permissions.map(this.constructor.transformPermissions)
			};
		});

		const data = await this.path(guildId).put({
			data: fullPermissions
		});

		return data.reduce(
				(col, perm) => col.set(
						perm.id,
						perm.permissions.map(p => this.constructor.transformPermissions(p, true))
					),
				new Collection()
			);
	};
	/**
	 * @param {AddApplicationCommandPermissionsOptions}
	 * @return {Promise<ApplicationCommandPermissionsOptions>}
	 */
	async add({ guild, command, permissions = []}) {
		const { guildId, commandId } = this.resolveId({ guild, command });
		if (!commandId) 
			throw new TypeError('invalid argument', 'command', 'array of ApplicationCommandResolvable');
		if (!Array.isArray(permissions)) 
			throw new TypeError('invalid argument', 'permissions', 'array of ApplicationCommandPermissionsData');

		let existing;
		try {
			existing = await this.fetch({
				guild: guildId,
				command: commandId
			});
		} catch(e) {};

		existing = existing.filter(perm => permissions.some(p => p.id !== perm.id));

		return await this.set({
			guild: guildId,
			command: commandId,
			permissions: existing
		});
	};
	/**
	 * @param {RemoveApplicationCommandPermissionsOptions}
	 * @return {Promise<ApplicationCommandPermissions[]>}
	 */
	async remove({ guild, command, roles, users }) {
		const { guildId, commandId } = this.resolveIds({ guild, command });
		if (!commandId) throw new TypeError('invalid argument', 'command', 'ApplicationCommandResolvable');
		if (!(guildId || commandId)) throw new TypeError('invalid argument', 'roles or users', 'Resolvable or array of Resolvable');
		
		let ids = [];
		if (roles) {
			if (Array.isArray(roles)) {
				roles.forEach(role => {
					if (typeof role === 'string') return ids.push(role);
					const resolvedGuild = this.guild || this.client.guilds.cache.get(guildId);
					if (!resolvedGuild) throw new Error('no guild but role');
					const id = resolvedGuild.roles.resolveId(role);
					if (!id) throw new TypeError('invalid element', 'Array', 'roles', role);
					ids.push(id);
				});
			} else {
				if (typeof roles === 'string') ids.push(roles);
				else {
					const resolvedGuild = this.guild || this.client.guilds.cache.get(guildId);
					if (!resolvedGuild) throw new Error('no guild but role');
					const id = resolvedGuild.roles.resolveId(roles);
					if (!id) throw new TypeError('invalid argument', 'roles', 'RoleResolvable or array of RoleResolvable');
					ids.push(id);
				};
			};
		};
		if (users) {
			if (Array.isArray(users)) {
				users.forEach(user => {
					const id = client.users.resolveId(user);
					if (!id) throw new TypeError('invalid element', 'Array', 'users', user);
					ids.push(id);
				});
			} else {
				const id = client.users.resolveId(users);
				if (!id) throw new TypeError('invalid argument', 'users', 'UserResolvable or array of UserResolvable');
				ids.push(id);
			};
		};

		let existing;
		try {
			existing = await this.fetch({
				guild: guildId,
				command: commandId
			});
		} catch(e) {};

		existing = existing.filter(perm => !resolvedIds.includes(perm.id));

		return await this.set({
			guild: guildId,
			command: commandId,
			permissions: existing
		});
	};
	/**
	 * @param {HasApplicationCommandPermissionsOptions}
	 * @return {Promise<boolean>}
	 */
	async has({ guild, command, permissionId }) {
		const { guildId, commandId } = this.resolveIds({ guild, command });
		if (!commandId) throw new TypeError('invalid argument', 'command', 'ApplicationCommandResolvable');
		if (!permissionId) throw new TypeError('invalid argument', 'permissionId', 'RoleResolvable or UserResolvable');

		let id = permissionId;
		if (typeof permissionId !== 'string') {
			id = this.client.users.resolveId(permissionId);
			if (!id) {
				const resolvedGuild = this.guild || this.client.guilds.cache.get(guildId);
				if (!resolvedGuild) throw new TypeError('no guild but role');
				id = resolvedGuild.roles.resolveId(permissionId);
			};
			if (!id) throw new TypeError('invalid argument', 'permissionId', 'RoleResolvable or UserResolvable');
		};

		let existing;
		try {
			existing = await this.fetch({
				guild: guildId,
				command: commandId,
			});
		} catch(e) {};

		return existing.some(perm => id === perm.id);
	};
	/**
	 * @param {GuildResolvable}
	 * @param {CommandResolvable}
	 * @return {Object}
	 */
	resolveIds({ guild, command } = {}) {
		return {
			guildId: this.guildId | this.client.guilds.resolveId(guild),
			commandId: this.commandId | (this.manager.resolveId && this.manager.resolveId(command))
		};
	};
	/**
	 * @param {ApplicationCommandPermissionsData}
	 * @param {boolean} @optional //Whether the permissions was received from API
	 * @return {ApplicationCommandPermissions}
	 */
	static transformPermissions(permissions, received) {
		return {
			id: permissions.id,
			permission: permissions.permission,
			type: received
				? typeof permissions.type === 'string'
					? permissions.type
					: ApplicationCommandPermissionTypes[permissions.type]
				: typeof permissions.type === 'number'
					? permissions.type
					: ApplicationCommandPermissionTypes[permissions.type]
		};
	};
};
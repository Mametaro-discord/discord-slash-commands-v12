'use strict';

const Base = require('./Base');
const Util = require('../util/Util');
const { ApplicationCommandPermissionsTypes } = require('../interfaces/Types');
const { makeCol } = require('../util/functions');

class ApplicationCommandPermissionsManager extends Base {
	/**
	 * @param {ApplicationCommand||ApplicationCommandManager||GuildApplicationCommandManager}
	 */
	constructor(manager) {
		super(manager.client);
		/**
		 * @type {ApplicationCommand||ApplicationCommandManager||GuildApplicationCommandManager}
		 */
		this.manager = manager;
		/**
		 * @type {Guild||null}
		 */
		this.guild = manager.guild;
		/**
		 * @type {Snowflake||null}
		 */
		this.guildId = manager.guildId || manager.guild ? manager.guild.id : null;
		/**
		 * @type {Snowflake||null}
		 */
		this.commandId = manager.id || null;
	};
	/**
	 * @param {Snowflake} 
	 * @param {Snowflake}
	 * @return {object}
	 */
	permissionsPath(guildId, commandId) {
		const guild = this.guildId || guildId;
		const command = this.commandId || commandId;
		const path = this.client.applications(this.client.user.id).guilds(guild);
		return (commandId
				? path.commands(command)
				: path.commands
			).permissions;
	};
	/**
	 * @param {Snowflake} options.guildId
	 * @param {Snowflake} options.commandId
	 * @return {Promise<(ApplicationCommandPermissions[]||Collection<Snowflake, ApplicationCommandPermissions[]>)>} 
	 */
	async fetch({ guildId, commandId } = {}) {
		const guild = this.guildId || guildId;
		const command = this.commandId || commandId;

		let data;
		if (command) {
			data = await this.permissionsPath(guild, command).get();
		} else {
			data = await this.permissionsPath(guild).get();
		};

		if (Array.isArray(data)) {
			data = data.reduce((col, elm) => col.set(
					elm.id,
					Util.transformApplicationCommandPermissions(elm.permissions)
				),
				new Collection()
			);
		} else {
			data = Util.transformApplicationCommandPermissions(elm.permissions);
		};

		return data;
	};
	/**
	 * @param {Snowflake} options.guildId
	 * @param {Snowflake} options.commandId
	 * @param {ApplicationCommandPermissions[]} options.permissions
	 * @param {FullApplicationCommandPermissions[]} options.fullPermissions
	 * @return {Promise<ApplicationCommandPermissions[]||Collection<Snowflake, ApplicationCommandPermissions[]>>}
	 */
	async set({ guildId, commandId, permissions, fullPermissions}) {
		const guild = this.guildId || guildId;
		const command = this.commandId || commandId;

		let data;
		if (command) {
			if (!Array.isArray(permissions)) return;
			data = await this.permissionsPath(guild, command).put({
				data: {
					permissions: permissions.map(elm => Util.transformApplicationCommandPermissions(elm))
				}
			});
			return data.permissions.map(elm => Util.transformApplicationCommandPermissions(elm));
		};

		if (!Array.isArray(fullPermissions)) return;

		data = [];
		fullPermissions.forEach(elm => {
			if (Array.isArray(elm.permissions)) return;

			data.push([
					elm.id,
					Util.transformApplicationCommandPermissions(elm.permissions)
				]);
		});

		data = await this.permissionsPath(guild).put({
			data: data
		});

		data = data.map(elm => [elm.id, Util.transformApplicationCommandPermissions(elm.permissions)]);
		return new Collection(data);
		data = data.reduce((col, elm) => col.set(
				elm.id,
				Util.transformApplicationCommandPermissions(elm.permissions)
			),
			new Collection()
		);
		return data;
	};
	/**
	 * @param {Snowflake} options.guildId
	 * @param {Snowflake} options.commandId
	 * @param {ApplicationCommandPermissions[]} options.permissions
	 * @return {Promise<ApplicationCommandPermissions[]>}
	 */
	async add({ guildId, commandId, permissions } = {}) {
		const guild = this.guildId || guildId;
		const command = this.commandId || commandId;
		if (!(guild && command && Array.isArray(permissions))) return;

		const existing = await this.fetch({
			guildId: guild,
			commandId: command
		}) || [];

		let data = permissions;
		existing.forEach(elm => {
			if (!data.some(e => e.id === elm.id)) {
				data.push(elm);
			};
		});

		return await this.set({
			guildId: guild,
			commandId: command,
			permissions: data
		});
	};
	/**
	 * @param {Snowflake} options.guildId
	 * @param {Snowflake} options.commandId
	 * @param {Snowflake[]} options.users
	 * @param {Snowflake[]} options.roles
	 * @return {Promise<ApplicationCommandPermissions[]>}
	 */
	async remove({ guildId, commandId, users, roles } = {}) {
		const guild = this.guildId || guildId;
		const command = this.commandId || commandId;
		if (!(guild && command && (users || roles))) return;

		let data = [];
		if (Array.isArray(users)) {
			users.forEach(elm => data.push(elm));
		} else if (users) {
			data.push(users);
		};

		if (Array.isArray(roles)) {
			roles.forEach(elm => data.push(elm));
		} else if (roles) {
			data.push(roles);
		};

		const existing = await this.fetch({
			guildId: guild,
			commandId: command
		}) || [];

		data = existing.filter(elm => !data.includes(elm.id));

		return await this.set({
			guildId: guild,
			commandId: command,
			permissions: data
		});
	};
	/**
	 * @param {Snowflake} options.guildId
	 * @param {Snowflake} options.commandId
	 * @param {Snowflake} options.id (id of user or role)
	 * @return {Promise<boolean>}
	 */
	async has({ guildId, commandId, id } = {}) {
		const guild = this.guildId || guildId;
		const command = this.commandId || commandId;

		const existing = await this.fetch({
			guildId: guild,
			commandId: command
		}) || [];

		return existing.some(elm => elm.id === id);
	};
};

module.exports = ApplicationCommandPermissionsManager;
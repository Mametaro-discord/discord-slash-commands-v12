'use strict';

const ApplicationCommandPermissionsManager = require('./ApplicationCommandPermissionsManager');
const Base = require('./Base');
const { transformApplicationCommandOptions } = require('../util/Util');
const { SnowflakeUtil } = require('discord.js');
const { ApplicationCommandTypes } = require('../interfaces/Types'); 

class ApplicationCommand extends Base {
	/**
	 * @param  {Client} client
	 * @param  {object} data
	 * @param  {Guild} guild 
	 */
	constructor(client, data, guild, guildId) {
		super(client);
		/**
		 * @type {Snowflake}
		 */
		this.id = data.id;
		/**
		 * @type {Snowflake}
		 */
		this.applicationId = data.application_id || data.applicationId;
		/**
		 * @type {Guild}
		 */
		this.guild = guild || null;
		/**
		 * @type {Snowflake}
		 */
		this.guildId = (guild && guild.id) || guildId || data.guild_id || data.guildId || null;
		/**
		 * @type {ApplicationCommandPermissionsManager}
		 */
		this.permissions = new ApplicationCommandPermissionsManager(this);
		/**
		 * @type {ApplicationCommandType}
		 */
		this.type = ApplicationCommandTypes[data.type];

		this.patch(data);
	};
	/**
	 * @return {number}
	 */
	get createdTimestamp() {
		return SnowflakeUtil.deconstruct(this.id).timestamp;
	};
	/**
	 * @return {Date}
	 */
	get createdAt() {
		return new Date(this.createdTimestamp);
	};
	/**
	 * @return {ApplicationCommandManager}
	 */
	get manager() {
		return (this.guild || this.client).commands;
	};
	/**
	 * @param {object}
	 * @return {undefined}
	 */
	patch(data) {
		if ('name' in data) {
			/**
			 * @type {string}
			 */
			this.name = data.name;
		};

		if ('description' in data) {
		     /**
			 * @type {string}
			 */
			this.description = data.description;
		};

		if ('default_permission' in data) {
			/**
			 * @type {boolean}
			 */
			this.defaultPermission = data.default_permission;
		};

		if ('version' in data) {
			/**
			 * @type {number}
			 */
			this.version = data.version;
		};

		if ('options' in data) {
			/**
			 * @type {Array<ApplicationCommandOptions>}
			 */
			this.options = transformApplicationCommandOptions(data.options);
		} else if (!('options' in this)) {
			/**
			 * @type {Array}
			 */
			this.options = [];
		};
	};
	/**
	 * @param  {ApplicationCommandData} data 
	 * @return {Promise<ApplicationCommand>}
	 */
	async edit(data) {
		return await this.manager.edit(this, data, this.guild.id);
	};
	/**
	 * @return {Promise<ApplicationCommand>}
	 */
	async delete() {
		return await this.manager.delete();
	};
	/**
	 * @return (ApplicationCommandData)
	 */
	static transformOptions() {};
};

module.exports = ApplicationCommand;

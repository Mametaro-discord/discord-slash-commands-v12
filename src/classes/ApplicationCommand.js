'use strict';

const ApplicationCommandPermissionsManager = require('./ApplicationCommandPermissionsManager');
const Base = require('./Base');
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
		this.applicationId = data.application_id;
		/**
		 * @type {Guild}
		 */
		this.guild = guild || null;
		/**
		 * @type {Snowflake}
		 */
		this.guildId = guild.id || guildId || null;
		/**
		 * @type {ApplicationCommandType}
		 */
		this.type = ApplicationCommandTypes[data.type];
		/**
		 * @type {Snowflake}
		 */
		this.userId = (data.member.user||data.user).id;

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
		return new ApplicationCommandPermissionsManager(this);
	};
	/**
	 * @return {ApplicationCommandPermissionsManager}
	 */
	get permissions() {
		return {};
	}
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
			this.options = data.options;
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
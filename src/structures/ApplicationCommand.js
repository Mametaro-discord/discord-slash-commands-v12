'use strict';

const ApplicationCommandPermissionManager = require('../managers/ApplicationCommandPermissionManager');
const Base = require('./Base');
const { SnowflakeUtil } = require('discord.js');
const {
	ApplicationCommandTypes,
	ApplicationCommandOptionTypes
} = require('../interfaces/consts');

module.exports = class ApplicationCommand extends Base {
	/**
	 * @param {Client}
	 * @param {ApplicationCommandData}
	 * @param {Guild} @optional
	 * @param {Snowflake} @optional
	 */
	constructor(client, data = {}, guild, guildId) {
		super(client);
		/**
		 * @type {Snowflake}
		 */
		this.id = data.id;
		/**
		 * @type {ApplicationCommandType}
		 */
		this.type = ApplicationCommandTypes[data.type];
		/**
		 * @type {Snowflake}
		 */
		this.applicationId = data.application_id;
		/**
		 * @type {?Guild}
		 */
		this.guild = guild || null;
		/**
		 * @type {?Snowflake}
		 */
		this.guildId = data.guild_id || (guild && guild.id) || guildId || null;
		/**
		 * @type {Snowflake}
		 */
		this.version = data.version;
		/**
		 * @type {ApplicationCommandPermissionManager}
		 */
		this.permissions = new ApplicationCommandPermissionManager(this);
	};
	/**
	 * @param {ApplicationCommandData}
	 * @return {undefined}
	 */
	patch(data = {}) {
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
			 * @type {Snowflake}
			 */
			this.version = data.version;
		};

		if (Array.isArray(data.options)) {
			/**
			 * @type {ApplicationCommandOption[]}
			 */
			this.options = data.options.map(option => this.constructor.transformOption(option, true));
		} else if (!this.options) {
			this.options = [];
		};
	};
	/**
	 * @type {number}
	 * @readonly
	 */
	get createdTimestamp() {
		return SnowflakeUtil.deconstruct(this.id).timestamp;
	};
	/**
	 * @type {Date}
	 * @readonly
	 */
	get createdAt() {
		return new Date(this.createdTimestamp);
	};
	/**
	 * @type {ApplicationCommandManager}
	 */
	get manager() {
		return (this.guild || this.client).commands;
	};
	/**
	 * @return {Promise<ApplicationCommand>}
	 */
	delete() {
		return this.manager.delete(this.id, this.guildId);
	};
	/**
	 * @param {ApplicationCommandData}
	 * @return {Promise<ApplicationCommand>}
	 */
	edit(data) {
		return this.manager(this.id, data, this.guildId);
	};
	/**
	 * @param {string}
	 * @return {Promise<ApplicationCommand>}
	 */
	setName(name) {
		return this.edit({ name });
	};
	/**
	 * @param {string}
	 * @return {Promise<ApplicationCommand>}
	 */
	setDescription(description) {
		return this.edit({ description });
	};
	/**
	 * @param {boolean}
	 * @return {Promise<ApplicationCommand>}
	 */
	setDefaultPermission(defaultPermission = true) {
		return this.edit({ defaultPermission });
	};
	/**
	 * @param {ApplicationCommandOptionData[]}
	 * @return {Promise<ApplicationCommand>}
	 */
	setOptions(options = []) {
		return this.edit({ options });
	};
	/**
	 * @static
	 * @param {ApplicationCommandOptionData}
	 * @param {boolean} @optional //Whether the option was received from API
	 * @return {ApplicationCommandOption | ApplicationCommandOption[]}
	 */
	static transformOption(option, received) {
		const channelTypesKey = received ? 'channelTypes' : 'channel_types';
		const minValueKey = received ? 'minValue' : 'min_value';
		const maxValueKey = received ? 'maxValue' : 'max_value';
		
		return {
			type: ApplicationCommandOptionTypes[option.type],
			name: option.name,
			description: option.description,
			required: option.required,
			choices: option.choices,
			options: this.transformOptions(option.options),
			[channelTypesKey]: option.channel_types || option.channelTypes,
			[minValueKey]: option.min_value || option.minValue,
			[maxValueKey]: option.max_value || option.maxValue,
			autocomplete: option.autocomplete
		};
	};
};
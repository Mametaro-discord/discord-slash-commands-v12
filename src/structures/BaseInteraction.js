'use strict';

const Base = require('./Base');
const InteractionAuthor = require('./InteractionAuthor');
const {
	ApplicationCommandTypes,
	InteractionTypes
} = require('../interfaces/consts');
const { Permissions, SnowflakeUtil } = require('discord.js');

module.exports = class BaseInteraction extends Base {
	/**
	 * @param {Client}
	 * @param {APIInteraction}
	 */
	constructor(client, data = {}) {
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
		 * @type {InteractionType}
		 */
		this.type = InteractionTypes[data.type];
		/**
		 * @type {Snowflake}
		 */
		this.guildId = data.guild_id;
		/**
		 * @type {Snowflake}
		 */
		this.channelId = data.channel_id;
		/**
		 * @type {?GuildMember}
		 */
		this.member = data.member
			? (this.guild && this.guild.members.add(data.member)) || data.member
			: null;
		/**
		 * @type {?Permissions}
		 */
		this.memberPermissions = data.member && data.member.permissions
			? new Permissions(data.member.permissions)
			: null;
		/**
		 * @type {User}
		 */
		this.user = client.users.add((data.member || data).user) || (data.member || data).user;
		/**
		 * @type {Snowflake}
		 */
		this.userId = this.user.id;
		/**
		 * @type {InteractionAuthor}
		 */
		this.author = new InteractionAuthor(this);
		/**
		 * @type {string}
		 * @readonly
		 */
		Object.defineProperty(this, 'token', {
			value: data.token
		});
		/**
		 * @type {number}
		 */
		this.version = data.version;
		/**
		 * @type {string}
		 */
		this.locale = data.locale || null;
		/**
		 * @type {string}
		 */
		this.guildLocale = data.guild_locale || null;
	};
	/**
	 * @type {Guild}
	 * @readonly
	 */
	get guild() {
		return this.guilds.cache.get(this.guildId);
	};
	/**
	 * @type {Channel}
	 * @readonly
	 */
	get channel() {
		return this.channels.cache.get(this.channelId);
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
	 * @return {boolean}
	 */
	inGuild() {
		return Boolean(this.guildId && this.member);
	};
	/**
	 * @return {boolean}
	 */
	inRawGuild() {
		return !this.guild && this.isGuild();
	};
	/**
	 * @return {boolean}
	 */
	inCachedGuild() {
		return Boolean(this.guild && this.member);
	};
	/**
	 * @return {boolean}
	 */
	isApplicationCommand() {
		return InteractionTypes[this.type] === InteractionTypes.APPLICATION_COMMAND;
	};
	/**
	 * @return {boolean}
	 */
	isCommand() {
		return this.isApplicationCommand();
	};
	/**
	 * @return {boolean}
	 */
	isChatInputCommand() {
		return InteractionTypes[this.type] === InteractionTypes.APPLICATION_COMMAND &&
			typeof this.targetId === 'undefined';
	};
	/**
	 * @return {boolean}
	 */
	isSlashCommand() {
		return this.isChatInputCommand();
	};
	/**
	 * @return {boolean}
	 */
	isContextMenuCommand() {
		return InteractionTypes[this.type] === InteractionTypes.APPLICATION_COMMAND &&
			typeof this.targetId !== 'undefined';
	};
	/**
	 * @return {boolean}
	 */
	isMessageCommand() {
		return InteractionTypes[this.type] === InteractionTypes.APPLICATION_COMMAND &&
			ApplicationCommandTypes[this.targetType] === ApplicationCommandTypes.MESSAGE;
	};
	/**
	 * @return {boolean}
	 */
	isMessageContextMenuCommand() {
		return this.isMessageCommand();
	};
	/**
	 * @return {boolean}
	 */
	isUserCommand() {
		return InteractionTypes[this.type] === InteractionTypes.APPLICATION_COMMAND &&
			ApplicationCommandTypes[this.targetType] === ApplicationCommandTypes.USER;
	};
	/**
	 * @return {boolean}
	 */
	 isUserContextMenuCommand() {
	 	return this.isUserCommand();
	 };
	 /**
	  * @return {boolean}
	  */
	 isAutocomplete() {
	 	return ApplicationCommandTypes[this.type] === ApplicationCommandTypes.APPLICATION_COMMAND_AUTOCOMPLETE;
	 };
	 /**
	  * @return {boolean}
	  */
	 isMessageComponent() {
	 	return InteractionTypes[this.type] === InteractionTypes.MESSAGE_COMPONENT;
	 };
	 /**
	  * @return {boolean}
	  */
	 isRepliable() {
	 	return ![InteractionTypes.PING, InteractionTypes.APPLICATION_COMMAND_AUTOCOMPLETE].includes(InteractionTypes[this.type]);
	 };
};
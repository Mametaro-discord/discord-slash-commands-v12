'use strict';

const { ApplicationCommandPermissionTypes, ChannelTypes } = require('../interfaces/consts');
const { Channel, MessageManager, PermissionOverwrites } = require('discord.js');
const ThreadMemberManager = require('../managers/ThreadMemberManager');

module.exports = class ThreadChannel extends Channel {
	/**
	 * @param {Guild}
	 * @param {APIThreadChannel | ThreadChannelData}
	 * @param {Client}
	 * @param {boolean} @optional
	 */
	constructor(guild, data, client, partial) {
		client = (guild && guild.client) || client;

		super(client, data);
		/**
		 * @type {Guild}
		 */
		this.guild = guild;
		/**
		 * @type {Snowflake}
		 */
		this.guildId = (guild && guild.id) || data.guild_id;
		/**
		 * @type {Snowflake}
		 */
		this.applicationId = data.application_id;
		/**
		 * @type {MessageManager}
		 */
		this.messages = new MessageManager(this);
		/**
		 * @type {ThreadMemberManager}
		 */
		this.members = new ThreadMemberManager(this);

		this.patch(data, partial);
	};
	/**
	 * @param {APIThreadChannel | ThreadChannelData}
	 * @param {boolean} @optional
	 */
	patch(data = {}, partial) {
		if ('guild_id' in data) {
			this.guildId = data.guild_id;
		}

		if ('position' in data) {
			/**
			 * @type {number}
			 */
			this.position = data.position;
		};

		if ('permission_overwrites' in data) {
			/**
			 * @type {PermissionOverwrites}
			 */
			this.permissionOverwrites = new PermissionOverwrites(this, data.permission_overwrites);
		} else if (typeof this.permissionOverwrites === 'undefined') this.permissionOverwrites = null;

		if ('name' in data) {
			/**
			 * @type {string}
			 */
			this.name = data.name;
		};

		if ('last_message_id' in data) {
			/**
			 * @type {Snowflake}
			 */
			this.lastMessageId = data.last_message_id;
		} else if (typeof this.lastMessageId === 'undefined') this.lastMessageId = null;

		if ('rate_limit_per_user' in data) {
			/**
			 * @type {number}
			 */
			this.rateLimetPerUser = data.rate_limit_per_user;
		} else if (typeof this.rateLimetPerUser === 'undefined') this.rateLimetPerUser = null;

		if ('owner_id' in data) {
			/**
			 * @type {Snowflake}
			 */
			this.ownerId = data.owner_id;
		} else if (typeof this.ownerId === 'undefined') this.ownerId = null;

		if ('parent_id' in data) {
			/**
			 * @type {Snowflake}
			 */
			this.parentId = data.parent_id;
		} else if (typeof this.parentId === 'undefined') this.parentId = null;

		if ('last_pin_timestamp' in data) {
			/**
			 * @type {number}
			 */
			this.lastPinTimestamp = data.last_pin_timestamp;
		} else if (typeof this.lastPinTimestamp === 'undefined') this.lastPinTimestamp = null;

		if ('message_count' in data) {
			/**
			 * @type {number}
			 */
			this.messageCount = data.message_count;
		} else if (typeof this.messageCount === 'undefined') this.messageCount = null;

		if ('member_count' in data) {
			/**
			 * @type {number}
			 */
			this.memberCount = data.member_count;
		} else if (typeof this.memberCount === 'undefined') this.memberCount = null;

		if ('thread_metadata' in data) {
			/**
			 * @type {boolean}
			 */
			this.archived = data.thread_metadata.archived;
			/**
			 * @type {number}
			 */
			this.autoArchiveDuration = data.thread_metadata.auto_archive_duration;
			/**
			 * @type {number}
			 */
			this.archiveTimestamp = data.thread_metadata.archive_timestamp;
			/**
			 * @type {boolean}
			 */
			this.locked = data.thread_metadata.locked || false;
			/**
			 * @type {boolean}
			 */
			this.invitable = data.thread_metadata.invitable;
		} else {
			['archived', 'autoArchiveDuration', 'archiveTimestamp', 'locked', 'invitable']
				.forEach(prop => {
					if (typeof this[prop] === 'undefined') this[prop] = null;
				});
		};

		if (data.member && client.user) this.members.add(
				{
					user_id: client.user.id,
					...data.member
				}
			);

		if ('default_auto_archive_duration' in data) {
			/**
			 * @type {number}
			 */
			this.defaultAutoArchiveDuration = data.default_auto_archive_duration;
		} else if (typeof this.defaultAutoArchiveDuration === 'undefined') this.defaultAutoArchiveDuration = null;
		
		if ('permissions' in data) {
			/**
			 * @type {Permissions}
			 */
			this.permissions = new Permissions(data.permissions).freeze();
		} else if (typeof this.permissions === 'undefined') this.permissions = null;
	};
	/**/
};
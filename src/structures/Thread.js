'use strict';

const { ApplicationCommandPermissionTypes, ChannelTypes } = require('../interfaces/consts');
const { RangeError } = require('../util/errors');
const { Channel, Collection,  MessageManager, PermissionOverwrites, Permissions, TextBasedChannel } = require('discord.js');
const ThreadMemberManager = require('../managers/ThreadMemberManager');

class Thread extends Channel {
	/**
	 * @param {Guild}
	 * @param {APIThreadChannel | ThreadChannelData}
	 * @param {Client}
	 */
	constructor(guild, data, client) {
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

		this.patch(data);
	};
	/**
	 * @param {APIThreadChannel | ThreadChannelData}
	 */
	patch(data = {}) {
		super(data);

		if ('guild_id' in data) {
			/**
			 * @type {Snowflake}
			 */
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
			this.archivedTimestamp = Date.parse(data.thread_metadata.archive_timestamp);
			/**
			 * @type {boolean}
			 */
			this.locked = data.thread_metadata.locked || false;
			/**
			 * @type {boolean}
			 */
			this.invitable = this.type === ChannelTypes.GUILD_PRIVATE_THREAD
				? data.thread_metadata.invitable || false
				: null;
		} else {
			['archived', 'autoArchiveDuration', 'archivedTimestamp', 'locked', 'invitable']
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
	/**
	 * @type {Date}
	 * @readonly
	 */
	get archivedAt() {
		if (this.archiveTimestamp) return new Date(this.archiveTimestamp);
	};
	/**
	 * @type {NewsChannel | TextChannel}
	 * @readonly
	 */
	get parent() {
		return this.guild.channels.resolve(this.parentId);
	};
	/**
	 * @type {Collection<Snowflake, GuildMember>}
	 * @readonly
	 */
	get guildMembers() {
		return this.members.cache
			.map(member => member.guildMember)
			.reduce(
					(col, member) => col.set(member.id, member),
					new Collection()
				);
	};
	/**
	 * @type {boolean}
	 * @readonly
	 */
	get joined() {
		return this.members.cache.has(this.client.user.id);
	};
	/**
	 * @type {boolean}
	 * @readonly
	 */
	get joinable() {
		const permissions = this.permissionsFor(this.client.user);
		if (!permissions) return false;

		return (
				!this.archived &&
				!this.joined &&
				permissions.has(
						this.type === ChannelTypes.GUILD_PRIVATE_THREAD
							? Permissions.FLAGS.MANAGE_THREADS
							: Permissions.FLAGS.VIEW_CHANNEL,
						false
					)
			);
	};
	/**
	 * @type {boolean}
	 * @readonly
	 */
	get viewable() {
		if (this.guild.owner === this.client.user.id) return true;

		const permissions = this.permissionsFor(this.client.user);
		if (!permissions) return false;

		return permissions.has(Permissions.FLAGS.VIEW_CHANNEL, false);
	};
	/**
	 * @type {boolean}
	 * @readonly
	 */
	get sendable() {
		const permissions = this.permissionsFor(this.client.user);
		if (!permissions) return false;

		if (permissions.has(Permissions.FLAGS.ADMINISTRATOR, false)) return true;

		return (
				!(this.archived && this.locked && !this.manageable) &&
				(this.type !== ChannelTypes.GUILD_PRIVATE_THREAD || this.joined || this.manageable) &&
				permissions.has(Permissions.FLAGS.SEND_MESSAGES_IN_THREADS, false)
			);
	};
	/**
	 * @type {boolean}
	 * @readonly
	 */
	get manageable() {
		const permissions = this.permissionsFor(this.client.user);
		if (!permissions) return false;

		if (
				permissions.has(Permissions.FLAGS.ADMINISTRATOR, false) ||
				permissions.has(Permissions.FLAGS.MANAGE_THREADS)
			)
			return true;
	};
	/**
	 * @type {boolean}
	 * @readonly
	 */
	get editable() {
		return (
				this.ownerId === this.client.user.id &&
				(this.type !== ChannelTypes.GUILD_PRIVATE_THREAD || this.joined()) ||
				this.manageable
			);
	};
	/**
	 * @type {boolean}
	 * @readonly
	 */
	get unarchivable() {
		return this.archived && (this.locked ? this.manageable : this.sendable);
	};
	/**
	 * @return {Thread}
	 */
	async join() {
		await this.members.add('@me');
		return this;
	};
	/**
	 * @return {Thread}
	 */
	async leave() {
		await this.members.remove('@me');
		return this;
	};
	/**
	 * @param {GuildMemberResolvable | RoleResolvable}
	 * @param {boolean} @optional
	 * @return {?Readonly<Permissions>}
	 */
	permissionsFor(memberOrRole, checkAdmin) {
		if (this.parent) this.parent.permissionsFor(memberOrRole, checkAdmin) || null;
		return null;
	};
	/**
	 * @param {BaseFetchOptions} @optional
	 * @return {Promise<ThreadMember>}
	 */
	async fetchOwner({ cache = true, force } = {}) {
		if (!force) {
			const existing = this.members.cache.get(this.owenrId);
			if (existing) return existing;
		};

		return (await this.members.fetch(cache)).get(this.ownerId) || null;
	};
	/**
	 * @param {BaseFetchOptions} @optional
	 * @return {Promise<Message>}
	 */
	async fetchStarterMessage(options) {
		if (this.parent) return await this.parent.messages.fetch(this.id, options) || null;
		return null;
	};
	/**
	 * @param {ThreadEditData}
	 * @param {string} @optional
	 * @return {Promise<Thread>}
	 */
	async edit({ name, archived, autoArchiveDuration, rateLimetPerUser, locked, invitable }, reason) {
		if (autoArchiveDuration === 'MAX') {
			autoArchiveDuration = 1440;

			if (this.guild.features.includes('SEVEN_DAY_THREAD_ARCHIVE')) {
				autoArchiveDuration = 10000;
			} else if (this.guild.features.includes('THREE_DAY_THREAD_ARCHIVE')) {
				autoArchiveDuration = 4320;
			};
		};

		const result = await this.client.api.channels(this.id).patch({
			data: {
				name: data.name || this.name,
				archived,
				auto_archive_duration: autoArchiveDuration,
				rate_limit_per_user: rateLimetPerUser,
				locked,
				invitable: this.type === ChannelTypes.GUILD_PRIVATE_THREAD ? data.invitable : undefined
			},
			reason
		});

		return this.client.actions.ChannelUpdate.handle(result).updated;
	};
	/**
	 * @param {string}
	 * @param {string} @optional
	 * @return {Promise<Thread>}
	 */
	setName(name, reason) {
		return this.edit({ name }, reason);
	};
	/**
	 * @param {boolean} @optional
	 * @param {string} @optional
	 * @return {Promise<Thread>}
	 */
	setArchived(archived = true, reason) {
		return this.edit({ archived }, reason);
	};
	/**
	 * @param {ThreadAutoArchiveDuration}
	 * @param {string} @optional
	 * @return {Promise<Thread>}
	 */
	setAutoArchiveDuration(autoArchiveDuration, reason) {
		return this.edit({ autoArchiveDuration }, reason);
	};
	/**
	 * @param {number}
	 * @param {string} @optional
	 * @return {Promise<Thread>}
	 */
	setRateLimitPerUser(rateLimetPerUser, reason) {
		return this.edit({ rateLimetPerUser }, reason);
	};
	/**
	 * @param {boolean} @optional
	 * @param {string} @optional
	 * @return {Promise<Thread>}
	 */
	setLocked(locked = true, reason) {
		return this.edit({ locked }, reason);
	};
	/**
	 * @param {boolean} @optional
	 * @param {string} @optional
	 * @return {Promise<Thread>}
	 */
	setInvitable(invitable = true, reason) {
		return new Promise((resolve, reject) => {
			if (this.type !== ChannelTypes.GUILD_PRIVATE_THREAD) 
				reject(new RangeError('THREAD_INVITABLE_TYPE', this.type));

			resolve(this.edit({ invitable }, reason));
		});
	};
};

TextBasedChannel.applyToClass(Thread, true);

Object.assign(Thread, require('./extend/ExtendedChannelMethods'));

module.exports = Thread;
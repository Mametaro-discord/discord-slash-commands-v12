'use strict';

const Thread = require('../structures/Thread');
const { BaseManager, Collection } = require('discord.js');
const { TypeError } = require('../util/errors');

/**
 * @extends {BaseManager}
 */
module.exports = class ThreadManager extends BaseManager {
	/**
	 * @param {Client}
	 * @param {Thread[]} @optional
	 */
	constructor(channel, iterable) {
		super(channel.client, iterable, Thread);
		/**
		 * @type {NewsChannel | TextChannel}
		 */
		this.channel = channel;
		/**
		 * @type {Snowflake}
		 */
		this.channelId = channel.id;
	};
	/**
	 * @param {Thread}
	 * @return {Thread}
	 */
	add(thread) {
		const existing = this.cache.get(thread.id);
		if (existing) return existing;

		this.cache.set(thread.id, thread);
		return thread;
	};
	/**
	 * @param {ThreadCreateOptions}
	 * @return {Promise<Thread>}
	 */
	async create({
		name,
		autoArchiveDuration = this.channel.defaultAutoArchiveDuration,
		startMessage,
		type,
		invitable,
		reason,
		rateLimetPerUser
	} = {}) {
		if (type && typeof type !== 'number' && typeof type !== 'string') 
			throw new TypeError('invalid argument', 'type', 'ThreadChannelType');

		
		let path = this.client.api.channels(this.channel.id);
		if (startMessage) {
			const messageId = this.messages.resolveId(startMessage);
			if (!messageId) new TypeError('invalid argument', 'startMessage', 'MessageResolvable');
			path = path.messages(messageId);
		};

		type = type ? type
			: (
					this.channel.type === ChannelTypes.GUILD_NEWS
						? ChannelTypes.GUILD_NEWS_THREAD
						: ChannelTypes.GUILD_PUBLIC_THREAD
				);

		if (autoArchiveDuration === 'MAX') {
			autoArchiveDuration = 1440;

			if (this.guild.features.includes('SEVEN_DAY_THREAD_ARCHIVE')) {
				autoArchiveDuration = 10000;
			} else if (this.guild.features.includes('THREE_DAY_THREAD_ARCHIVE')) {
				autoArchiveDuration = 4320;
			};
		};

		const data = await path.threads.post({
			data: {
				name,
				auto_archive_duration: autoArchiveDuration,
				type: type,
				rate_limit_per_user: rateLimetPerUser,
				invitable: type = ChannelTypes.GUILD_PRIVATE_THREAD ? invitable : undefined
			},
			reason
		});

		return this.client.actions.ThreadCreate.handle(data).thread;
	};
	/**
	 * @param {ThreadResolvable | FetchThreadOptions} @optional
	 * @param {BaseFetchOptions} @optional
	 * @return {Promise<?(Thread | FetchedThreads)>}
	 */
	fetch(options, { cache, force } = {}) {
		if (options) {
			const channelId = this.client.channels.resolveId(options);
			if (channelId) return this.client.channels.fetch(channelId, cache, force);
			if (options.archived) return this.fetchArchived(options.archived, cache);
		};

		return this.fetchActive(cache);
	};
	/**
	 * @param {boolean}
	 * @return {Promise<Promise<FetchedThreads>}
	 */
	async fetchActive(cache) {
		return this.constructor.mapThreads(
				await this.client.api.guilds(this.channel.guild.id).threads.active.get(),
				this.client,
				{
					parent: this.channel,
					cache
				}
			);
	};
	/**
	 * @param {FetchArchivedThreadOptions}
	 * @param {boolean} @optional
	 * @return {Promise<FetchedThreads>}
	 */
	async fetchArchived(
			{
				type = 'public',
				before,
				limit,
				fetchAll
			} = {},
			cache
		) {
		let path = this.client.api.channels(this.channel.id);
		if (type === 'private' && !fetchAll) path = path.users('@me');

		let id, timestamp;
		if (typeof before !== 'undefined') {
			if (before instanceof Thread || /[0-9]{16,19}/.test(String(before))) {
				id = this.resolveId(before);
				before = this.resolve(before);
				if (before && before.archivedAt) timestamp = before.archivedAt.toISOString();
			} else {
				try {
					timestamp = new Date(before).toISOString();
				} catch(e) {
					throw new TypeError('invalid argument', 'before', 'DateResolvable or ThreadResolvable');
				};
			};

			return this.constructor.mapThreads(
					await path.threads.get({
						query: {
							before: type === 'private' && !fetchAll ? id : timestamp,
							limit
						}
					}),
					{
						parent: this.channel,
						cache
					}
				);
		};
	};
	/**
	 * @param {APIFetchThreads}
	 * @param {Client}
	 * @param {MapThreadsOptions} @optional
	 * @return {FetchedThreads}
	 * @static
	 */
	static mapThreads(
			{ threads, members, has_more },
			client,
			{ parent, guild, cache = true } = {}
		) {
		members.forEach(member => {
			const thread = client.channels.cache.get(member.id);
			if (thread) thread.members.set(member);
		});

		return {
			threads: threads.reduce(
					(col, thread) => {
						thread = client.channels.add(thread, guild || (parent && parent.guild), { cache });
						if (parent && parent.id !== thread.parentId) return col;
						return col.set(thread.id, thread);
					},
					new Collection()
				),
			hasMore: has_more || false
		};
	};
};
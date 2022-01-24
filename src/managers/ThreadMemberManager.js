'use strict';

const ThreadMember = require('../structures/ThreadMember');
const { TypeError } = require('../util/errors');
const { BaseManager, Collection } = require('discord.js');

/**
 * @extends {BaseManager}
 */
module.exports = class ThreadMemberManager extends BaseManager {
	/**
	 * @param {Thread}
	 * @param {ThreadMember[]} @optional
	 */
	constructor(thread, iterable) {
		super(thread.client, iterable, ThreadMember);
		/**
		 * @type {Thread}
		 */
		this.thread = thread;
		/**
		 * @type {Snowflake}
		 */
		this.threadId = thread.id;
	};
	/**
	 * @param {APIThreadMember | ThreadMemberData}
	 * @param {boolean} @optional
	 * @return {ThreadMember}
	 */
	set(data, cache = true) {
		const existing = this.cache.get(data.user_id || data.userId);
		if (existing) {
			if (cache) existing.patch(data);
			return existing;
		};

		const member = new ThreadMember(this.thread, data);
		if (cache) this.cache.set(member.id, member);
		return member;
	};
	/**
	 * @param {ThreadMemberResolvable}
	 * @return {?ThreadMember}
	 */
	resolve(resolvable) {
		const member = super.resolve(resolvable);
		if (member) return member;

		const userId = this.client.users.resolveId(resolvable);
		if (userId) return super.resolve(userId);

		return null;
	};
	/**
	 * @param {ThreadMemberResolvable}
	 * @return {?Snowflake}
	 */
	resolveId(resolvable) {
		const memberId = super.resolve(resolvable);
		if (memberId) return memberId;

		const userId = this.client.users.resolveId(resolvable);

		return this.cache.has(userId) ? userId : null;
	};
	/**
	 * @param {UserResolvable}
	 * @param {string} @optional
	 * @return {Promise<Snowflake>}
	 */
	async add(user, reason) {
		const id = user === '@me' ? user : this.client.users.resolveId(user);
		if (!id) new TypeError('invalid argument', 'user', 'UserResolvable');

		await this.client.api.channels(this.threadId)['thread-members'](id).put({ reason });

		return id;
	};
	/**
	 * @param {UserResolvable}
	 * @param {string} @optional
	 * @return {Promise<Snowflake>}
	 */
	async remove(user, reason) {
		const id = user === '@me' ? user : this.client.users.resolveId(user);
		if (!id) new TypeError('invalid argument', 'user', 'UserResolvable');

		await this.client.api.channels(this.threadId)['thread-members'](id).delete({ reason });

		return id;
	};
	/**
	 * @param {ThreadMemberFetchOptions} @optional
	 * @return {Promise<ThreadMember | Collection<Snowflake, ThreadMember>>}
	 */
	async fetch({ memberId, cache = true, force } = {}) {
		if (memberId) {
			if (!force) {
				const existing = this.cache.get(memberId);
				if (existing) return existing;
			};

			return this.set(
					await this.client.api.channels(this.threadId)['thread-members'](memberId).get(),
					cache
				);
		} else return (await this.client.api.channels(this.threadId)['thread-members'].get())
			.reduce(
					(col, member) => col.set(
							member.user_id,
							this.set(member, cache)
						),
					new Collection()
				);
	};
};
'use strict';

const Base = require('./Base');
const ThreadMemberFlags = require('./ThreadMemberFlags');

/**
 * @extends {Base}
 */
module.exports = class ThreadMember extends Base {
	/**
	 * @param {Thread}
	 * @param {APIThreadMember | ThreadMemberData}
	 */
	constructor(thread, data) {
		super(thread.client);
		/**
		 * @type {Thread}
		 */
		this.thread = thread;
		/**
		 * @type {?Snowflake}
		 */
		this.threadId = data.id;
		/**
		 * @type {?Snowflake}
		 */
		this.id = data.user_id;

		this.patch(data);
	};
	/**
	 * @param {APIThreadMember | ThreadMemberData}
	 * @return {undefined}
	 */
	patch(data) {
		/**
		 * @type {?number}
		 */
		this.joinedTimestamp = Date.parse(data.join_timestamp) || null;
		/**
		 * @type {ThreadMemberFlags}
		 */
		this.flags = (new ThreadMemberFlags(data.flags)).freeze();
	};
	/**
	 * @type {User}
	 * @readonly
	 */
	get user() {
		return this.client.users.cache.get(this.id);
	};
	/**
	 * @type {GuildMember}
	 * @readonly
	 */
	get guildMember() {
		return this.thread.guild.members.cache.get(this.id);
	};
	/**
	 * @type {Date}
	 * @readonly
	 */
	get joinedAt() {
		if (this.joinedTimestamp) return new Date(this.joinedTimestamp);
	};
	/**
	 * @type {boolean}
	 * @readonly
	 */
	get manageable() {
		return !this.thread.archived && this.thread.editable;
	};
	/**
	 * @param {string} @optional
	 * @return {Promise<Thread>}
	 */
	async remove(reason) {
		await this.thread.members.remove(this.id, reason);
		return this;
	};
};
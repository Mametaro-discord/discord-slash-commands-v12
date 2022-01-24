'use strict';

const Thread = require('../structures/Thread');
const { BaseManager } = require('discord.js');

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
	 * @param {ThreadData}
	 * @return {Promise<Thread>}
	 */
	async create({})
};
'use strict';

const { RangeError, TypeError } = require('../util/errors');
const ExtendedAPIMessage = require('./extend/ExtendedAPIMessage');
const {
	Collection,
	GuildMember,
	MessageCollector,
	MessageManager,
	InteractionCollector,
	SnowflakeUtil,
	User
} = require('discord.js');

module.exports = class TextBasedChannel {
	constructor() {
		/**
		 * @type {MessageManager}
		 */
		this.messages = new MessageManager(this);
		/**
		 * @type {?Snowflake}
		 */
		this.lastMessageId = null;
		/**
		 * @type {?Snowflake}
		 */
		this.lastPinTimestamp = null;
	};
	/**
	 * @type {?Message}
	 * @readonly
	 */
	get lastMessage() {
		return this.messages.cache.get(this.lastMessageId) || null;
	};
	/**
	 * @type {?Date}
	 * @readonly
	 */
	get lastPinAt() {
		return this.lastPinTimestamp ? new Date(this.lastPinTimestamp) : null;
	};
	/**
	 * @param {StringResolvable | APIMessage}
	 * @param {MessageAdditions | MessageOptions} @optional
	 * @return {Promise<Message | Message[]>}
	 */
	async send(content, options = {}) {
		if ((this instanceof GuildMember) || (this instanceof User))
			return this.createDM().then(dm => dm.send(content, options));

		const apiMessage = await (
				content instanceof ExtendedAPIMessage
					? content
					: ExtendedAPIMessage.create(this, content, options)
			).resolveData().resolveFiles();

		const { data, files } = apiMessage;

		if (Array.isArray(data.content)) 
			return Promise.all(apiMessage.split().map(this.send.bind(this)));

		const result = await this.client.api.channels(this.id).messages
			.post({ data, files })

		return this.client.actions.MessageCreate.handle(result).message;
	};
	/**
	 * @return {Promise<undefined>}
	 */
	sendTyping() {
		this.client.api.channels(this.id).typing.post();
	};
	/**
	 * @param {CollectorFilter}
	 * @param {MessageCollectorOptions} @optional
	 * @return {MessageCollector}
	 */
	createMessageCollector(filter, options) {
		return new MessageCollector(this, filter, options);
	};
	/**
	 * @param {CollectorFilter}
	 * @param {AwaitMessageOptions}
	 * @return {Promise<Collection<Snowflake, Message>>}
	 */
	async awaitMessage(filter, options) {
		return new Promise(
				(resolve, reject) => this
					.createMessageCollector(filter, options)
					.on(
							'end',
							(messages, reason) => {
								if (options.errors && options.errors.includes(reason)) reject(messages);
								else resolve(messages);
							}
						)
			);
	};
	/**
	 * @param {number | Message[] | Collection<Snowflake, Message>}
	 * @param {boolean} @optional
	 * @return {Promise<Collection<Snowflake, Message>>}
	 */
	async bulkDelete(messages, filterOld) {
		if (!isNaN(messages))
			return this.bulkDelete(
					await this.messages.fetch({
						limit: messages
					}),
					filterOld
				);

		if (Array.isArray(messages) || (messages instanceof Collection)) {
			messages = messages instanceof Collection
				? messages.keyArray()
				: messages.map(m => m.id || m);

			if (filterOld)
				messages = messages.filter(messageId => {
					const { date } = SnowflakeUtil.deconstruct(messageId);
					return (Date.now() - date.getTime()) < 1209600000;
				});

			if (messages.length === 0) return new Collection();

			if (messages.length === 1) {
				await this.client.api.channels(this.id).messages(messages[0]).delete();

				const message = this.client.actions.MessageDelete.getMessage(
						{
							message_id: messages[0]
						},
						this
					);

				return message ? new Collection([message.id, message]) : new Collection();
			};

			await this.client.api.channels(this.id).messages['bulk-delete'].post({
				data: {
					messages: messages
				}
			});

			return messages.reduce(
					(col, messageId) => col.set(
							messageId,
							this.client.actions.MessageDeleteBulk.getMessage(
									{
										message_id: messageId
									},
									this
								)
						),
					new Collection()
				);
		};

		throw new TypeError('invalid argument', 'messages', 'number, Array, Collection');
	};
	/**
	 * //If not full, only 'send' will be copied
	 * @param {Channel}
	 * @param {boolean} @optional //Whether copy all props
	 * @param {string[]} @optional //Names of props to ignore
	 * @return {undefined}
	 * @static
	 */
	static apply2Class(structure, full, ignore = []) {
	};
};
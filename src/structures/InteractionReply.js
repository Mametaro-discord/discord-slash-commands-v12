'use strict';

const Base = require('./Base');
const {
	InteractionReplyTypes
} = require('../interfaces/consts');
const { Error } = require('../util/errors');

module.exports = class InteractionReply extends Base {
	/**
	 * @param {Client}
	 * @param {Interaction}
	 * @param {ExtendedWebhookClient}
	 */
	constructor(client, interaction, webhook) {
		super(client);
		/**
		 * @type {Interaction}
		 */
		this.interaction = interaction;
		/**
		 * @type {Snowflake}
		 */
		this.id = interaction.id;
		/**
		 * @type {string}
		 */
		this.token = interaction.token;
		/**
		 * @type {ExtendedWebhookClient}
		 */
		this.webhook = webhook;
		/**
		 * @type {boolean}
		 */
		this.deferred = false;
		/**
		 * @type {boolean}
		 */
		this.replied = false;
		/**
		 * @type {boolean}
		 */
		this.ephemeral = false;
	};
	/**
	 * @type {boolean}
	 * @readonly
	 */
	get isEphemeral() {
		return this.ephemeral;
	};
	/**
	 * @param {StringResolvable}
	 * @param {MessageOptions} @optional
	 * @return {Promise<?APIMessage>}
	 */
	async send(content, options) {
		if (this.replied || this.deferred) throw new Error('interaction already replied');

		if (typeof content === 'object') {
			if (content.embed instanceof MessageEmbed) {
				if (Array.isArray(options.embeds)) options.embeds.push(content.embed);
				else options.embeds = [content.embed];
			};
			if (content.embeds instanceof MessageEmbed) {
				if (Array.isArray(options.embeds)) options.embeds = [...options.embeds, ...content.embeds];
				else options.embeds = [...content.embeds];
			};
		}

		if (options.embed) {
			if (Array.isArray(options.embeds)) options.embeds.push(options.embed);
			else options.embeds = [options.embed];
		};

		if ((typeof content === 'object' && content.ephemeral) || options.ephemeral) options.flags = 1 << 6;

		const { data, files } = await (
				content instanceof ExtendedAPIMessage
					? content
					: ExtendedAPIMessage.create(this, content, options)
			)
			.resolveData()
			.resolveFiles();

		this.replied = true;
		this.ephemeral = options.flags === 1 << 6;

		await this.client.api.interactions(this.id, this.token).callback.post({
			data: {
				data,
				type: InteractionReplyTypes.CHANNEL_MESSAGE_WITH_SOURCE
			},
			files,
			auth: false
		});

		return options.fetchReply ? await this.fetch() : null;
	};
	/**
	 * @param {DeferReplyOptions} @optional
	 * @return {Promise<?APIMessage>}
	 */
	async defer({ ephemeral, fetchReply } = {}) {
		if (this.replied || this.deferred) throw new Error('interaction already replied');
		this.ephemeral = ephemeral || false;
		await this.client.api.interactions(this.id, this.token).callback.post({
			data: {
				data: {
					flags: ephemeral ? 1 << 6 : undefined
				},
				type: InteractionReply.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE
			},
			auth: false
		});
		this.deferred = true;

		return fetchReply ? await this.fetch() : null;
	};
	/**
	 * @param {DeferUpdateReplyOptions} @optional
	 * @return {Promise<?APIMessage>}
	 */
	async deferUpdate({ fetchReply } = {}) {
		if (this.replied || this.deferred) throw new Error('interaction already replied');
		await this.client.api.interactions(this.id, this.token).callback.post({
			data: {
				type: InteractionReplyTypes.DEFERRED_UPDATE_MESSAGE
			},
			auth: false
		});
		this.deferred = true;

		return fetchReply ? await this.fetch() : null;
	};
	/**
	 * @param {StringResolvable}
	 * @param {MessageOptions} @optional
	 * @return {Promise<?APIMessage>}
	 */
	async update(content, options) {
		if (this.replied || this.deferred) throw new Error('interaction already replied');

		if (typeof content === 'object') {
			if (content.embed instanceof MessageEmbed) {
				if (Array.isArray(options.embeds)) options.embeds.push(content.embed);
				else options.embeds = [content.embed];
			};
			if (content.embeds instanceof MessageEmbed) {
				if (Array.isArray(options.embeds)) options.embeds = [...options.embeds, ...content.embeds];
				else options.embeds = [...content.embeds];
			};
		}

		if (options.embed) {
			if (Array.isArray(options.embeds)) options.embeds.push(options.embed);
			else options.embeds = [options.embed];
		};

		if ((typeof content === 'object' && content.ephemeral) || options.ephemeral) options.flags = 1 << 6;

		const { data, files } = await (
				content instanceof ExtendedAPIMessage
					? content
					: ExtendedAPIMessage.create(this, content, options)
			)
			.resolveData()
			.resolveFiles();

		await this.client.api.interactions(this.id, this.token).callback.post({
			data: {
				data,
				type: InteractionReplyTypes.UPDATE_MESSAGE
			},
			files,
			auth: false
		});
		this.replied = true;
		this.ephemeral = options.flags === 1 << 6;

		return (typeof content === 'object' && content.fetchReply) || options.fetchReply ? await this.fetch() : null;
	};
	/**
	 * @return {Promise<APIMessage>}
	 */
	fetch() {
		return this.webhook.fetchMessage('@original');
	};
	/**
	 * @param {StringResolvable}
	 * @param {MessageOptions} @optional
	 * @return {Promise<APIMessage>}
	 */
	edit(content, options) {
		if (!this.replied && !this.deferred) throw new Error('interaction not replied');
		const data = this.webhook.editMessage('@original', content, options);
		this.replied = true;
		this.ephemeral = data.flags === 1 << 6;
		return data;
	};
	/**
	 * @reutrn {undefined}
	 */
	delete() {
		if (this.ephemeral) throw new Error('interaction ephemeral replied');
		this.webhook.deleteMessage('@original');
	};
};
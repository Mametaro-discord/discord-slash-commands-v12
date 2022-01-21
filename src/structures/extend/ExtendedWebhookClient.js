'use strict';

const { MessageEmbed, WebhookClient } = require('discord.js');
const ExtendedAPIMessage = require('./ExtendedAPIMessage');

module.exports = class ExtendedWebhookClient extends WebhookClient {
	/**
	 * @param {Snowflake} @optional
	 * @return {Object}
	 */
	path(messageId) {
		let path = this.client.api.webhooks(this.id, this.token);
		return messageId ? path.messages(messageId) : path.messages;
	};
	/**
	 * @param {StringResolvable}
	 * @param {MessageOptions} @optional
	 * @return {Promise<APIMessage>}
	 */
	async sendMessage(content, options = {}) {
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

		return this.path().post({
			data,
			files,
			query: {
				wait: true
			},
			auth: false
		});
	};
	/**
	 * @param {Snowflake}
	 * @param {StringResolvable}
	 * @param {MessageOptions}
	 * @return {Promise<APIMessage>}
	 */
	async editMessage(messageId, content, options = {}) {
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

		return this.path(messageId).patch({
			data,
			files,
			auth: false
		});
	};
	/**
	 * @param {Snowflake}
	 * @return {undefined}
	 */
	deleteMessage(messageId) {
		this.path(messageId).delete({
			auth: false
		});
	};
	/**
	 * @param {Snowflake}
	 * @return {Promise<APIMessage>}
	 */
	 fetchMessage(messageId) {
	 	return this.path(messageId).get({
	 		auth: false
	 	});
	 };
};
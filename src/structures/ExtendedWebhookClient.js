'use strict';

const { APIMessage, Message, MessageEmbed, WebhookClient } = require('discord.js'); 

/**
 * @extends (WebhookClient)
 */
class ExtendedWebhookClient extends WebhookClient {
	/**
	 * @param (any)
	 * @optional (Object)
	 * @return (Object)
	 */
	async sendMessage(content, options) {
		if (content&&content.embed instanceof MessageEmbed) {
			if (options) {
				if (options.embeds&&options.embeds instanceof Array) {
					options.embeds.push(content.embed);
				} else {
					options.embeds = [content.embed];
				};
			} else {
				options = {
					embeds: [content.embed]
				};
			};
		};

		if (options&&options.embed) {
			if (options.embeds&&options.embeds instanceof Array) {
				options.embeds.push(options.embed);
			} else {
				options.embeds = [options.embed];
			};
		};

		let apiMessage;
		if (content instanceof APIMessage) {
			apiMessage = content.resolveData();
		} else {
			apiMessage = APIMessage.create(this, content, options).resolveData();
		};

		apiMessage = await apiMessage.resolveFiles();

		return await this.client.api.webhooks(this.id, this.token).post({
			data: apiMessage.data,
			files: apiMessage.files,
			query: { wait: true },
			auth: false
		});
	};
	/**
	 * @param (string)
	 * @optional (any)
	 * @optional (Object)
	 * @return (Object)
	 */
	async editMessage(message, content, options) {
		if (content&&content.embed instanceof MessageEmbed) {
			if (options) {
				if (options.embeds&&options.embeds instanceof Array) {
					options.embeds.push(content.embed);
				} else {
					options.embeds = [content.embed];
				};
			} else {
				options = {
					embeds: [content.embed]
				};
			};
		};

		if (options&&options.embed) {
			if (options.embeds&&options.embeds instanceof Array) {
				options.embeds.push(options.embed);
			} else {
				options.embeds = [options.embed];
			};
		};

		let apiMessage;
		if (content instanceof APIMessage) {
			apiMessage = content.resolveData();
		} else {
			apiMessage = APIMessage.create(this, content, options).resolveData();
		};

		apiMessage = await apiMessage.resolveFiles();

		return await this.client.api.webhooks(this.id, this.token).messages(message).patch({
			data: apiMessage.data,
			files: apiMessage.files,
			auth: false
		});
	};
	/**
	 * @param (string)
	 * @return (void)
	 */
	async deleteMessage(message) {
		await this.client.api
		.webhooks(this.id, this.token)
		.messages(message)
		.delete({
			auth: false
		});
	};
	/**
	 * @param (string)
	 * @return (Object)
	 */
	async fetchMessage(message) {
		return await this.client.api
		.webhooks(this.id, this.token)
		.messages(message).get({
			auth: false
		});
	};
};

module.exports = ExtendedWebhookClient;
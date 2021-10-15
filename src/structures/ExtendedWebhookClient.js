'use strict';

const { APIMessage, MessageEmbed, WebhookClient } = require('discord.js'); 

/**
 * @extends (WebhookClient)
 */
class ExtendedWebhookClient extends WebhookClient {
	/**
	 * @param (string)
	 * @param (object)
	 * @return ()
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

		await this.client.api.webhooks(this.id, this.token).post({
			data: apiMessage.data,
			files: apiMessage.files
		});

		return this;
	};
	/**
	 * @param () 
	 * @param (string)
	 * @optional (object)
	 * @return ()
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

		await this.client.api.webhooks(this.id, this.token).messages(message).patch({
			data: apiMessage.data,
			files: apiMessage.files
		});

		return this;
	};
	/**
	 * @param ()
	 * @return (true)
	 */
	async deleteMessage(message) {
		await this.client.api.webhooks(this.id, this.token).messages(message).delete();
		return true;
	};
	/**
	 * @param ()
	 * @return ()
	 */
	async fetchMessage(message) {
		return await this.client.api.webhooks(this.id, this.token).messages(message).get();
	};
};

module.exports = ExtendedWebhookClient;
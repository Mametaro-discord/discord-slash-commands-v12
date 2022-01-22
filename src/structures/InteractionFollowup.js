'use strict';

module.exports = class InteractionFollowup {
	/**
	 * @param {ExtendedWebhookClient}
	 */
	constructor(webhook) {
		this.webhook = webhook;
	};
	/**
	 * @param {StringResolvable}
	 * @param {MessageOptions} @optional
	 * @return {Promise<APIMessage | Message>}
	 */
	send(content, options) {
		return this.webhook.sendMessage(content, options);
	};
	/**
	 * @param {Snowflake}
	 * @return {Promise<APIMessage | Message>}
	 */
	fetch(id) {
		return this.webhook.fetchMessage(id);
	};
	/**
	 * @param {Snowflake}
	 * @param {StringResolvable}
	 * @param {MessageOptions} @optional
	 * @return {Promise<APIMessage | Message>}
	 */
	edit(id, content, options) {
		return this.webhook.editMessage(id, content, options);
	};
	/**
	 * @param {Snowflake}
	 * @return {Promise<undefined>}
	 */
	delete(id) {
		return this.webhook.deleteMessage(id);
	};
};
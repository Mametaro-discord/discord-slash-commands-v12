'use strict';

const { InteractionReply } = require('discord-buttons');

/**
* @extends (InteractionReply)
 */
class ReplyManager extends InteractionReply {
	/**
	* @param (Client) client from discord.js
	* @param (CommandInteraction) interaction
	* @param (WebhookClient) webhookclient from discord.js
	 */
	constructor(client, ia, webhook) {
		super(client, ia, webhook);
	};
	/**
	* @param (string(StringResolvable)|APIMessage) content of reply
	* @param (object) options of send
	* @return (ReplyManager) this
	 */
	async send(content, options) {
		super.send(content, options)
	};
    /**
	* @param (string(StringResolvable)|APIMessage) content of reply
	* @param (object(MessageOptions)) options of edit
	* @return (ReplyManager) this
	 */
	async edit(content, options) {
		super.edit(content, options);
	};
	/**
	* @param (boolean) ephemeral
	* @return (ReplyManager) this
	 */
	async defer(ephemeral = false) {
		super.defer(ephemeral);
	};
	/**
	* @param (boolean) ephemeral
	* @return (ReplyManager) this
	 */
	async think(ephemeral = false) {
		super.think(ephemeral);
	};
	/**
	* @return (Message|APIMessage|null)
	 */
	async fetch() {
		super.fetch();
	};
	/**
	* @return (boolean)
	 */
	async delete() {
		super.delete();
	};
};

module.exports = ReplyManager;
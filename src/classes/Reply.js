'use strict';

const { APIMessage } = require('discord.js');
const { InteractionReplyTypes } = require('../interfaces/Types.js');
const Base = require('./Base.js');

//1 << 6 -> 64

/**
 * @extends (Base)
 */
class Reply extends Base {
	/**
	 * @param (Client)
	 * @param (CommandInteraction)
	 * @param (Webhook) from this project
	 */
	constructor(client, interaction, webhook) {
		super(client);

		this.interaction = interaction;

		this.webhook = webhook;

		this.deferred = false;

		this.replied = false;

		this.isEphemeral = undefined;
	};
	/**
	 * @param (StringResolvable|APIMessage)
	 * @optional (options)
	 * @return (Reply)
	 */
	async send(content, options) {
		if (this.replied) throw new Error('ALREADY_REPLIED: This interaction is already replied.');

		if (options === true) options = {
			flags: 64
		};

		let apiMessage;
		if (content instanceof APIMessage) {
			apiMessage = content.resolveData();
		} else {
			apiMessage = APIMessage.create(this, content, options).resolveData();
		};

		if (Array.isArray(apiMessage.data.content)) {
			apiMessage.data.content = apiMessage.data.content.shift();
		};

		apiMessage = await apiMessage.resolveFiles();
		if (apiMessage.data.flags === 64) this.isEphemeral = true;

		await this.client.api.interactions(this.interaction.id, this.interaction.token).callback.post({
			data: {
				data: apiMessage.data,
				type: 4
			}
		});
		this.replied = true;

		return this;
 	};
 	/**
	 * @param (StringResolvable|APIMessage)
	 * @optional (options)
	 * @return (Reply)
	 */
	async edit(content, options) {
		if (!this.replied) throw new Error('NO_REPLY: This interaction has no reply.');

		await this.webhook.editMessage('@original', content, options);

		return this;
	};
	/**
	 * @optional (boolean)
	 * @return (Reply)
	 */
	async defer(ephemeral) {
		if (this.replied) throw new Error('ALREADY_REPLIED: This interaction is already replied.');

		if (ephemeral) this.isEphemeral = true;

		await this.client.api.interactions(this.interaction.id, this.interaction.token).callback.post({
			data: {
				data: {
					flags: ephemeral ? 1 << 6 : null
				},
				type: 6
			}
		});
		this.replied = true;

		this.deferred = true;

		return this;
	};

	/**
	 * @optional (boolean)
	 * @return (Reply) 
	 */
	async think(ephemeral) {
		if (this.replied) throw new Error('ALREADY_REPLIED: This interaction is already replied.');

		if (ephemeral) this.isEphemeral = true;

		await this.client.api.interactions(this.interaction.id, this.interaction.token).callback.post({
			data: {
				data: {
					flags: ephemeral ? 1 << 6 : null
				},
				type: 5
			}
		});
		this.replied = true;

		this.deferred = true;

		return this;
	};
	/**
	 * @return ()
	 */
	async fetch() {
		if (this.isEphemeral) throw new Error('EPHEMERAL: This reply is ephemeral.');

		return await this.webhook.fetchMessage('@original');
	};
	/**
	 * @return ()
	 */
	async delete() {
		if (!this.replied) throw new Error('NO_REPLY: This interaction has no reply.');
		if (this.isEphemeral) throw new Error('EPHEMERAL: This reply is ephemeral.');

		await this.webhook.deleteMessage('@original');

		return this;
	};
};

module.exports = Reply;
'use strict';

const BaseInteraction = require('./BaseInteraction');
const ExtendedWebhookClient = require('./extend/ExtendedWebhookClient');
const InteractionFollowup = require('./InteractionFollowup');
const InteractionReply = require('./InteractionReply');
const {
	MessageComponentTypes
} = require('../interfaces/consts');

module.exports = class ButtonInteraction extends BaseInteraction {
	/**
	 * @param {Client}
	 * @param {APIButtonInteraction | ButtonInteractionData}
	 */
	constructor(client, data) {
		super(client, data);
		/**
		 * @type {APIMessage | Message}
		 */
		this.message = this.channel ? this.channel.messages.add(data.message) || data.message : data.message;
		/**
		 * @type {string}
		 */
		this.customId = data.custom_id || data.customId;

		const type = data.data.component_type;
		/**
		 * @type {MessageComponentType}
		 */
		this.componentType = typeof type === 'string' ? type : MessageComponentTypes[type];
		/**
		 * @type {ExtendedWebhookClient}
		 */
		this.webhook = new ExtendedWebhookClient(client, this.applicationId, this.token);
		/**
		 * @type {InteractionFollowup}
		 */
		this.followup = new InteractionFollowup(this.webhook);
		/**
		 * @type {InteractionReply}
		 */
		this.reply = new InteractionReply(client, this, this.webhook);
	};
	/**
	 * @type {boolean}
	 * @readonly
	 */
	get deferred() {
		return this.reply.deferred;
	};
	/**
	 * @type {boolean}
	 * @readonly
	 */
	get ephemeral() {
		return this.reply.ephemeral;
	};
	/**
	 * @type {boolean}
	 * @readonly
	 */
	get isEphemeral() {
		return this.reply.isEphemeral;
	};
	/**
	 * @type {boolean}
	 * @readonly
	 */
	get replied() {
		return this.reply.replied;
	};
	/**
	 * @type {ActionRowComponent}
	 * @readonly
	 */
	get component() {
		return this.message.components
			.map(row => {
				if (Array.isArray(row.components[0])) return row.components[0];
				return row.components;
			})
			.find(c => (c.custom_id || c.customId) === this.customId) || null;
	};
};
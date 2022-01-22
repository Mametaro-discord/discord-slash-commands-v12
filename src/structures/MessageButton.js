'use strict';

const BaseMessageComponent = require('./BaseMessageComponent');
const {
	MessageButtonStyles
} = require('../interfaces/consts');

module.exports = class MessageButton extends BaseMessageComponent {
	/**
	 * @param {APIMessageButton | MessageButtonData}
	 */
	constructor(data, client) {
		super(
				{
					type: 'BUTTON'
				},
				client
		);

		this.patch(data);
	};
	/**
	 * @param {APIMessageButton | MessageButtonData}
	 * @return {undefined}
	 */
	patch(data) {
		if ('style' in data) {
			/**
			 * @type {MessageButtonStyle}
			 */
			this.style = this.constructor.resolveStyle(data.style, true);
		};

		if ('label' in data) {
			/**
			 * @type {string}
			 */
			this.label = data.label;
		};

		if ('emoji' in data) {
			/**
			 * @type {Emoji | PartialEmoji}
			 */
			this.emoji = this.client ? this.client.emojis.resolve(data.emoji.id) || emoji : emoji
		};

		if ('custom_id' in data) {
			/**
			 * @type {string}
			 */
			this.customId = data.custom_id;
		};

		if ('url' in data) {
			/**
			 * @type {string}
			 */
			this.url = data.url;
		};

		if ('disabled' in data) {
			/**
			 * @type {boolean}
			 */
			this.disabled = data.disabled;
		};
	};
	/**
	 * @param {MessageButtonStyleResolvable}
	 * @return {MessageButton}
	 */
	setStyle(style) {
		this.style = style;
		return this;
	};
	/**
	 * @param {string}
	 * @return {MessageButton}
	 */
	setLabel(label) {
		this.label = label;
		return this;
	};
	/**
	 * @param {EmojiResolvable}
	 * @return {MessageButton}
	 */
	setEmoji(emoji) {
		this.emoji = this.client ? this.client.emojis.resolve(emoji) || emoji : emoji;
		return this;
	};
	/**
	 * @param {string}
	 * @return {MessageButton}
	 */
	setCustomId(customId) {
		this.customId = customId;
		return this;
	};
	/**
	 * @param {string}
	 * @return {MessageButton}
	 */
	setURL(url) {
		this.url = url;
		return this;
	};
	/**
	 * @param {boolean} @optional
	 * @return {MessageButton}
	 */
	setDisabled(disabled = false) {
		this.disabled = disabled;
		return this;
	};
	/**
	 * @return {MessageButton}
	 */
	disable() {
		this.disabled = true;
	};
	/**
	 * @return {MessageButton}
	 */
	enable() {
		this.disabled = false;
	};
	/**
	 * @param {MessageButtonStyle}
	 * @param {boolean} @optional //Whether the style was received from API
	 * @return {MessageButtonStyle}
	 */
	static resolveStyle(style, received) {
		if (received) return typeof style === 'string' ? style : MessageButtonStyles[style];
		if (style === 'blue') style = 'blurple';
		if (style === 'gray') style = 'grey';
		return typeof style === 'number' ? style : MessageButtonStyles[style];
	};
};
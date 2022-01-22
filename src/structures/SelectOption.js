'use strict';

const Base = require('./Base');

module.exports = class SelectOption extends Base {
	/**
	 * @param {APISelectOption | SelectOptionData}
	 * @param {Client} @optional
	 */
	constructor(data, client) {
		super(client);

		this.patch(data, client);
	};
	/**
	 * @param {APISelectOption | SelectOptionData}
	 * @return {undefined}
	 */
	patch(data) {
		if ('label' in data) {
			/**
			 * @type {string}
			 */
			this.label = data.label;
		};

		if ('value' in data) {
			/**
			 * @type {string}
			 */
			this.value = data.value;
		};

		if ('description' in data) {
			/**
			 * @type {string}
			 */
			this.description = data.description;
		};

		if ('emoji' in data) {
			/**
			 * @type {Emoji | PartialEmoji}
			 */
			this.emoji = this.client ? this.client.emojis.resolve(data.emoji.id) || data.emoji : data.emoji;
		};

		if ('default' in data) {
			/**
			 * @type {boolean}
			 */
			this.default = data.default;
		};
	};
	/**
	 * @param {string}
	 * @return {SelectOption}
	 */
	setLabel(label) {
		this.label = label;
		return this;
	};
	/**
	 * @param {string}
	 * @return {SelectOption}
	 */
	setValue(value) {
		this.value = value;
		return this;
	};
	/**
	 * @param {string}
	 * @return {SelectOption}
	 */
	setDescription(description) {
		this.description = description;
		return this;
	};
	/**
	 * @param {EmojiResolvable}
	 * @return {SelectOption}
	 */
	setEmoji(emoji) {
		this.emoji = this.client ? this.client.emojis.resolve(emoji) || emoji : emoji;
		return this;
	};
	/**
	 * @param {boolean}
	 */
	setDefault(default_ = false) {
		this.default = default_;
		return this;
	};
	/**
	 * @return {APISelectOption}
	 */
	toJSON() {
		return {
			label: this.label,
			value: this.value,
			description: this.description,
			emoji: this.emoji,
			default: this.default
		};
	};
};
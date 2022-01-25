'use strict';

const BaseMessageComponent = require('./BaseMessageComponent');
const SelectOption = require('./SelectOption');
const {
	MessageComponentTypes
} = require('../interfaces/consts');

module.exports = class MessageSelectMenu extends BaseMessageComponent {
	/**
	 * @param {APIMessageSelectMenu | MessageSelectMenuData}
	 * @param {Client} @optional
	 */
	constructor(data, client) {
		super(
				{
					type: 'SELECT_MENU'
				},
				client
			);

		this.patch(data);
	};
	/**
	 * @param {APIMessageSelectMenu | MessageSelectMenuData}
	 * @return {undefined}
	 */
	patch(data) {
		if ('custom_id' in data || 'customId' in data) {
			/**
			 * @type {string}
			 */
			this.customId = data.custom_id || data.customId;
		};

		if (Array.isArray(data.options)) {
			/**
			 * @type {SelectOption[]}
			 */
			this.options = data.options.map(option => new SelectOption(option, this.client));
		} else this.options = [];

		if ('placeholder' in data) {
			/**
			 * @type {string}
			 */
			this.placeholder = data.placeholder;
		};

		if ('min_values' in data || 'minValues' in data) {
			/**
			 * @type {number}
			 */
			this.minValues = data.min_values || data.minValues;
		};

		if ('max_values' in data || 'maxValues' in data) {
			/**
			 * @type {number}
			 */
			this.maxValues = data.max_values || data.maxValues;
		};

		if ('disabled' in data) {
			/**
			 * @type {boolean}
			 */
			this.disabled = data.disabled;
		};
	};
	/**
	 * @param {string}
	 * @return {MessageSelectMenu}
	 */
	setCustomId(customId) {
		this.customId = customId;
		return this;
	};
	/**
	 * @param {SelectOption}
	 * @return {MessageSelectMenu}
	 */
	addOption(option) {
		this.options.push(new SelectOption(option, this.client));
		return this;
	};
	/**
	 * @param {Array<SelectOption | SelectOption[]>}
	 * @return {MessageSelectMenu}
	 */
	addOptions(...options) {
		if (Array.isArray(options[0])) options = options[0];
		this.options.push(...options.map(option => new SelectOption(option, this.client)));
		return this;
	};
	/**
	 * @param {number} @optional
	 * @param {number} @optional
	 * @param {Array<SelectOption | SelectOption[]>}
	 * @return {MessageSelectMenu}
	 */
	spliceOptions(index, deleteCount, ...options) {
		if (Array.isArray(options[0])) options = options[0];
		this.options.splice(index, deleteCount, ...options.map(option => new SelectOption(option, this.client)));
		return this;
	};
	/**
	 * @param {string}
	 * @return {MessageSelectMenu}
	 */
	setPlaceholder(placeholder) {
		this.placeholder = placeholder;
		return this;
	};
	/**
	 * @param {number}
	 * @return {MessageSelectMenu}
	 */
	setMinValues(minValues) {
		this.minValues = minValues;
		return this;
	};
	/**
	 * @param {number}
	 * @return {MessageSelectMenu}
	 */
	setMaxValues(maxValues) {
		this.maxValues = maxValues;
		return this;
	};
	/**
	 * @param {boolean} @optional
	 * @return {MessageSelectMenu}
	 */
	setDisabled(disabled = false) {
		this.disabled = disabled;
		return this;
	};
	/**
	 * @return {APIMessageSelectMenu}
	 */
	toJSON() {
		return {
			type: MessageComponentTypes[this.type],
			custom_id: this.customId,
			options: this.options.map(option => option.toJSON()),
			placeholder: this.placeholder,
			min_values: this.minValues,
			max_values: this.maxValues,
			disabled: this.disabled
		};
	};
};
'use strict';

const ButtonInteraction = require('./ButtonInteraction');
const SelectOption = require('./SelectOption');

module.exports = class SelectMenuInteraction extends ButtonInteraction {
	/**
	 * @param {Client}
	 * @param {APISelectMenuInteraction | SelectMenuInteraction}
	 */
	constructor(client, data) {
		super(client, data);
		/**
		 * @type {string[]}
		 */
		this.values = data.values || [];
	};
};
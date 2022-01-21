'use strict';

const ApplicationCommandInteraction = require('./ApplicationCommandInteraction');
const {
	ApplicationCommandTypes
} = require('../interfaces/consts');

module.exports = class ContextMenuCommandInteraction extends ApplicationCommandInteraction {
	/**
	 * @param {Client}
	 * @param {APIContextMenuCommandInteraction}
	 */
	constructor(client, data = {}) {
		super(client, data);
		/**
		 * @type {Snowflake}
		 */
		this.targetId = data.data.target_id;
		/**
		 * @type {ApplicationCommandType}
		 */
		this.targetType = ApplicationCommandTypes[data.data.type];
	};
};
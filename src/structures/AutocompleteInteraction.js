'use strict';

const ApplicationCommandInteraction = require('./ApplicationCommandInteraction');
const BaseInteraction = require('./BaseInteraction');

module.exports = class AutocompleteInteraction extends BaseInteraction {
	/**
	 * @param {Client}
	 * @param {APIAutocompleteInteraction}
	 */
	constructor(client, data) {
		super(client, data);
		/**
		 * @type {Snowflake}
		 */
		this.commandId = data.data.id;
		/**
		 * @type {string}
		 */
		this.commandName = data.data.name;
		/**
		 * @type {AutocompleteInteractionOption[]}
		 */
		this.options = data.data.options.map(option => this.constructor.transformOption(option, data.data.resolved, true));
	};
	/**
	 * @type {?ApplicationCommand}
	 * @readonly
	 */
	get command() {
		return (this.guild || this.client).commands.cache.get(this.commandId) || null;
	};
	/**
	 * @param {APIAutocompleteInteractionOption}
	 * @param {APIApplicationCommandInteractionResolved}
	 * @param {boolean} @optional //Whether the option is received from API
	 * @return {AutocompleteInteractionOption[]}
	 */
	static transformOption(option, resolved, received) {
	}
};
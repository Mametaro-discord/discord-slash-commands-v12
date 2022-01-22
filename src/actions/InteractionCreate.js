'use strict';

const GenericAction = require('./Action');
const ApplicationCommandInteraction = require('../structures/ApplicationCommandInteraction');
const AutocompleteInteraction = require('../structures/AutocompleteInteraction');
const ContextMenuInteraction = require('../structures/ContextMenuCommandInteraction');
const {
	ApplicationCommandTypes,
	InteractionTypes
} = require('../interfaces/consts');

module.exports = class InteractionCreateAction extends Action {
	handle(data) {
		this.getChannel(data);

		const list = [
			null,
			null,
			[
				null,
				ApplicationCommandInteraction,
				ContextMenuInteraction,
				ContextMenuInteraction,
			],
			[],
			undefined
		];

		if (data.type === InteractionTypes.APPLICATION_COMMAND) {
			const Interaction = list[data.type][data.data.type];
			this.client.emit('commandInteraction', new Interaction(client, data));
		} else if (data.type === InteractionTypes.APPLICATION_COMMAND_AUTOCOMPLETE) {
			const Interaction = list[data.type]
			this.client.emit('autocompleteInteraction')
		};
	};
};
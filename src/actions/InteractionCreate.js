'use strict';

const GenericAction = require('./Action');
const ApplicationCommandInteraction = require('../structures/ApplicationCommandInteraction');
const AutocompleteInteraction = require('../structures/AutocompleteInteraction');
const ContextMenuInteraction = require('../structures/ContextMenuCommandInteraction');
const ButtonInteraction = require('../structures/ButtonInteraction');
const SelectMenuInteraction = require('../structures/SelectMenuInteraction');
const {
	ApplicationCommandTypes,
	InteractionTypes,
	MessageComponentTypes
} = require('../interfaces/consts');

module.exports = class InteractionCreateAction extends Action {
	handle(data) {
		this.getChannel(data);

		let interaction;
		switch(data.type) {
			case InteractionTypes.APPLICATION_COMMAND:
			switch(data.data.type) {
				case ApplicationCommandTypes.CHAT_INPUT:
				interaction = new ApplicationCommandInteraction(client, data);
				this.client.emit('slashCommand', interaction);
				break;

				case ApplicationCommandTypes.USER:
				case ApplicationCommandTypes.MESSAGE:
				interaction = new ContextMenuInteraction(client, data);
				this.client.emit('contextMenuCommand', interaction);
				break;

				default:
				this.client.emit(
						'debug',
						`[INTERACTION] Received application command interaction with unknown type: ${data.data.type}`
					);
				break;
			};
			this.client.emit('command', interaction);
			break;

			case InteractionTypes.MESSAGE_COMPONENT:
			switch(data.data.component_type) {
				case MessageComponentTypes.BUTTON:
				interaction = new ButtonInteraction(client, data);
				this.client.emit('buttonComponent', interaction);
				break;

				case MessageComponentTypes.SELECT_MENU:
				interaction = new SelectMenuInteraction(client, data);
				this.client.emit('selectMenuComponent', interaction);
				break;

				default:
				this.client.emit(
						'debug',
						`[INTERACTION] Received message component interaction with unknown type: ${data.data.component_type}`
					);
				break;
			};
			this.client.emit('component', interaction);
			break;

			case InteractionTypes.APPLICATION_COMMAND_AUTOCOMPLETE:
			interaction = new AutocompleteInteraction(client, data);
			this.client.emit('autocomplete', interaction);
			break;

			default:
			this.client.emit(
					'debug',
					`[INTERACTION] Received interaction with unknown type: ${data.type}`
				);
			break;
		};
		this.client.emit('interactionCreate', interaction);
	};
};
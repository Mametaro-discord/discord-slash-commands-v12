'use strict';

const CommandInteraction = require('../classes/CommandInteraction');
const GenericAction = require('./GenericActions');
const {
	ApplicationCommandTypes,
	InteractionTypes
} = require('../interfaces/Types');

class CommandAction extends GenericAction {
	handle(data) {
		switch(data.type) {
			case InteractionTypes.APPLICATION_COMMAND:
			switch(data.data.type) {
				case ApplicationCommandTypes.CHAT_INPUT:
				this.client.emit('command', new CommandInteraction(this.client, data));
				break;
			};
			break;
		};
	};
};

module.exports = CommandAction;
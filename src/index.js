'use strict';

const discord = require('discord.js');
const {
	Client,
	Guild,
	Structures
} = discord;

const {
	ApplicationCommandManager,
	ExtendedGuild,
	Type
} = require('./util/Classes');

const {
	ApplicationCommandTypes,
	InteractionTypes
} = Types;

module.exports = client => {
	if (!(client instanceof Client)) throw new Error('INVALID_ARGUMENT: the argument must be an instance of Client');
	
	if (!client.commands) {
		client.commands = new ApplicationCommandManager(client);
	};

	const guild = Structures.get('Guild');
	if (!(Guild.prototype.commands && guild.prototype.commands)) {
		discord.Guild = ExtendedGuild;
		Structures.extend('Guild', () => ExtendedGuild);
	};

	client.ws.on('INTERACTION_CREATE', data => {
		switch(data.type) {
			case InteractionTypes.APPLICATION_COMMAND:
			switch(data.data.type) {
				case ApplicationCommandTypes.CHAT_INPUT:
				client.emit('command', new CommandInteraction(client, data));
				break;
			};
			break;
		};
	});
};

module.exports = Object.assign(module.exports, require('../util/Classes'));
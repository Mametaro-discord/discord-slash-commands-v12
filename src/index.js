'use strict';

const Command = require('./actions/Command');
const {
	Client,
	Guild,
	Structures
} = require('discord.js');

const {
	GuildApplicationCommandManager,
	ApplicationCommandManager,
	CommandInteraction,
	ExtendedGuild,
	Types
} = require('./util/Classes');

const {
	ApplicationCommandTypes,
	InteractionTypes
} = Types;

module.exports = client => {
	if (!(client instanceof Client)) throw new Error('INVALID_ARGUMENT: the argument must be an instance of Client');
	
	if (!client.actions.Command) {
		client.actions.register(Command);
	};

	if (!client.commands) {
		client.commands = new ApplicationCommandManager(client);
	};

	const guild = Structures.get('Guild');
	if (!(Guild.prototype.commands && guild.prototype.commands)) {
		Object.defineProperty(Guild.prototype, 'commands', {
			get () {
				return new GuildApplicationCommandManager(this);
			}
		});
		Structures.extend('Guild', () => ExtendedGuild);
	};

	client.ws.on('INTERACTION_CREATE', data => client.actions.Command.handle(data));
};

module.exports = Object.assign(module.exports, require('./util/Classes'));
'use strict';

const Command = require('./actions/Command');
const discord = require('discord.js');
const {
	Client,
	Guild,
	Structures,
	MessageFlags
} = discord;

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

Object.assign(MessageFlags, {
	HAS_THREAD: 1 << 5,
	EPHEMERAL: 1 << 6,
	LOADING: 1 << 7
});

module.exports = client => {
	if (Number(discord.version.split('.').shift()) !== 12) throw new Error('Invalid discord.js version: discord.js must be 12x');
	if (!(client instanceof Client)) throw new TypeError('INVALID_ARGUMENT: the argument must be an instance of Client');
	
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
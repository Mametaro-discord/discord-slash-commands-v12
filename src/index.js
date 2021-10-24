'use strict';

const { Structures, Client } = require('discord.js');
const Guild = Structures.get('Guild');
const ExtendedClient = require('./structures/ExtendedClient.js');
const ExtendedGuild = require('./structures/ExtendedGuild.js');
const CommandInteraction = require('./classes/CommandInteraction.js');
const CommandManager = require('./classes/CommandManager.js');
const { InteractionTypes } = require('./interfaces/Types.js');

module.exports = client => {
	if (!client||!client instanceof Client) throw new Error('INVAILD_ARGS');

	client.commands = new CommandManager(client);

	if (!Guild.prototype.commands) {
		console.log(Guild)
		Structures.extend('Guild', () => ExtendedGuild);
	};

	client.ws.on('INTERACTION_CREATE', data => {
		if (data.type === InteractionTypes['APPLICATION_COMMAND']) {
			client.emit('command', new CommandInteraction(client, data));
		};
	});
};

// CLASSES
module.exports = {
	Base: require('./classes/Base.js'),
	BaseCommand: require('./classes/BaseCommand.js'),
	BaseCommandInteraction: require('./classes/BaseCommandInteraction.js'),
	Command: require('./classes/Command.js'),
	CommandAuthor: require('./classes/CommandAuthor.js'),
	CommandInteraction: require('./classes/CommandInteraction.js'),
	CommandManager: require('./classes/CommandManager.js'),
	CommandPermissionsManager: require('./classes/CommandPermissionsManager.js'),
	Reply: require('./classes/Reply'),
	//STRUCTURES
	ExtendedClient: require('./structures/ExtendedClient.js'),
	ExtendedGuild: require('./structures/ExtendedGuild.js'),
	ExtendedWebhookClient: require('./structures/ExtendedWebhookClient.js'),
	//Utilities
	functions: require('./util/functions.js'),
	Util: require('./util/Util.js'),
	Types: require('./interfaces/Types.js'),
};

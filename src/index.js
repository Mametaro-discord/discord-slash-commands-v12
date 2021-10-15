'use strict';

const { Structures, Client } = require('discord.js');
const APIHandler = require('./request/api/APIHandler.js');
const ExtendedClient = require('./structures/ExtendedClient.js');
const ExtendedGuild = require('./structures/ExtendedGuild.js');
const CommandInteraction = require('./classes/CommandInteraction.js');
const CommandManager = require('./classes/CommandManager.js');

module.exports = function(client) {
	if (!client||!client instanceof Client) throw new Error('INVAILD_ARGS');

	client.commands = new CommanManager(client);

	if (!Guild.prototype.commands||!Guild.prototype.commands instanceof CommandManager) {
		Structures.extends('Guild', () => ExtendedGuild);
	};

	client.ws.on('INTERACTION_CREATE', data => {
		if (interaction.type === InteractionTypes['APPLICATION_COMMAND']) {
			client.emit('command', new CommandInteraction(client, data));
		};
	});
};

// CLASSES
module.exports.Base = require('./classes/Base.js');
module.exports.BaseCommand = require('./classes/BaseCommand.js');
module.exports.BaseCommandInteraction = require('./classes/BaseCommandInteraction.js');
module.exports.Command = require('./classes/Command.js');
module.exports.CommandAuthor = require('./classes/CommandAuthor.js');
module.exports.CommandInteraction = require('./classes/CommandInteraction.js');
module.exports.CommandManager = require('./classes/CommandManager.js');
module.exports.CommandPermissionsManager = require('./classes/CommandPermissionsManager.js');
module.exports.Followup = require('./classes/Followup.js');
module.exports.Reply = require('./classes/Reply');

//STRUCTURES
module.exports.ExtendedClient = require('./structures/ExtendedClient.js');
module.exports.ExtendedGuild = require('./structures/ExtendedGuild.js')
module.exports.ExtendedWebhookClient = require('./structures/ExtendedWebhookClient.js');

//Utilities
module.exports.functions = require('./util/functions.js');
module.exports.Util = require('./util/Util.js');
module.exports.Types = require('./interfaces/Types.js');
'use strict';

const discord = require('discord.js');
const {
	Client,
	MessageFlags,
	Permissions,
	Structures,
	version
} = discord;

const { TypeError } = require('./util/errors');
const WeakMap = require('./structures/extend/ExtendedWeakMap');
const ApplicationCommandManager = require('./managers/ApplicationCommandManager');
const GuildApplicationCommandManager = require('./managers/GuildApplicationCommandManager');
const Util = require('./util');
const ErrorUtil = require('./util/errors');
const InteractionCreateAction = require('./actions/InteractionCreate');
const channelmethods = require('./structures/extend/ExtendedChannelMethods');

function main(client) {
	if (String(version).split('.').shift() !== '12') throw new Error('The version of discord.js must be 12x');
	if (!(client instanceof Client)) throw new TypeError('invalid argument', 'client', 'Client');

	client.commands = new ApplicationCommandManager(client);
	client.actions.register(InteractionCreateAction);

	client.ws.on('INTERACTION_CREATE', client.actions.InteractionCreate.handle);
	extend();

	return module.exports;
};

function extend() {
	Object.assign(MessageFlags.FLAGS, {
		HAS_THREAD: 1 << 5,
		EPHEMERAL: 1 << 6,
		LOADING: 1 << 7
	});

	Object.assign(Permissions.FLAGS, {
		USE_APPLICATION_COMMANDS: 1 << 31,
		MANAGE_THREADS: 1 << 34,
		CREATE_PUBLIC_THREADS: 1 << 35,
		CREATE_PRIVATE_THREADS: 1 << 36,
		SEND_MESSAGES_IN_THREADS: 1 << 38
	});

	Structures.extend(
			'Guild',
			Base => class Extended extends Base {
				constructor(...args) {
					super(...args);
					this.commands = new GuildApplicationCommandManager(this);
				};
			}
		);

	const hasManager = new WeakMap();
	Object.defineProperty(Guild.prototype, 'commands', {
		get() {
			return hasManager.get(this) || hasManager.set(this, new GuildApplicationCommandManager(this));
		}
	});

	const classes = ['DMChannel', 'NewsChannel', 'TextChannel']
	classes.forEach(
			cls => Structures.extend(
					cls,
					Base => {
						Object.assign(Base.prototype, channelmethods);
						return Base;
					}
				)
		);

	classes
		.map(cls => discord[cls])
		.forEach(cls => Object.assign(cls.prototype, channelmethods));
};

module.exports = Object.assign(
		main,
		{
			consts: require('./interfaces/consts')
		},
		{ ErrorUtil, Util },
		{
			ApplicationCommandManager,
			ApplicationCommandPermissionsManager: require('./managers/ApplicationCommandPermissionsManager'),
			GuildApplicationCommandManager
		},
		Util.entries2Object(
				[
					'ApplicationCommand',
					'ApplicationCommandInteraction',
					'AutocompleteInteraction',
					'Base',
					'BaseInteraction',
					'BaseMessageComponent',
					'ButtonInteraction',
					'ContextMenuCommandInteraction',
					'InteractionAuthor',
					'InteractionCollector',
					'InteractionFollowup',
					'InteractionReply',
					'MessageActionRow',
					'MessageButton',
					'MessageSelectMenu',
					'SelectMenuInteraction',
					'SelectOption'
				]
				.map(name => [name, require(`./structures/${name}`)])
			)
	);
'use strict';

const discord = require('discord.js');
const {
	Client,
	MessageFlags,
	Structures,
	version
} = discord;

const { TypeError } = require('./util/errors');
const WeakMap = require('./structures/extend/ExtendedWeakMap');
const ApplicationCommanManager = require('./managers/ApplicationCommandManager');
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
	Object.assign(MessageFlags, {
		HAS_THREAD: 1 << 5,
		EPHEMERAL: 1 << 6,
		LOADING: 1 << 7
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
					'ContextMenuInteraction',
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
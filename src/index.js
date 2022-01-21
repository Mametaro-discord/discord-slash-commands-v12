'use strict';

const TypeError = require('./util/errors').makeError(TypeError);
const WeakMap = require('./structures/extend/ExtendedWeakMap');
const {
	Client,
	MessageFlags,
	Structures,
	version
} = require('discord.js');

function main(client) {
	if (String(version).split('.').shift() !== '12') throw new Error('The version of discord.js must be 12x');
	if (!(client instanceof Client)) throw new TypeError('invalid argument', 'client', 'Client');

	client.commands = new ApplicationCommandManager(client);

	extend();
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
	Object.defineProperty(Guild.prototype, {
		get() {
			return hasManager.get(this) || hasManager.set(this, new GuildApplicationCommandManager(this));
		}
	});
};
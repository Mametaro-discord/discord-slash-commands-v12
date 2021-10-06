'use strict';

function main(client, options = {}) {
	const globalCommand = require('./command/global.js');
	const guildCommand = require('./command/guild.js');

	return {
		global: globalCommand(client, options),
		guild: guildCommand(client, options)
	};
};

module.exports = main;
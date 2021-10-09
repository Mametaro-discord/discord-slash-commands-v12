'use strict';

function main(client, options = {}) {
	const globalCommand = require('./command/global.js');
	const guildCommand = require('./command/guild.js');

	return {
		globalCommand: globalCommand(client, options),
		guildCommand: guildCommand(client, options),
		interaction: interaction(client, options)
	};
};

module.exports = main;
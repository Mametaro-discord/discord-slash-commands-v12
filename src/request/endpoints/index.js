'use strict';

function main(client, options = {}) {
	const globalCommand = require('./globalCommand.js');
	const guildCommand = require('./guildCommand.js');

	return {
		global: globalCommand(client, options),
		guild: guildCommand(client, options)
	};
};

module.exports = main;
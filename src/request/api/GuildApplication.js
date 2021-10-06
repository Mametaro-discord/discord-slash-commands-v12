'use strict';

const Base = require('../../Classes/Base.js');
const ApplicationCommand = require('./ApplicationCommand.js');
const ApplicationCommandAll = require('./ApplicationCommandAll.js');

/**
 * @extends (BaseApplication)
 */
class GuildApplication extends Base {
	/**
	 * @param (Client) client from discord.js
	 */
	constructor(client) {
		super(client);
	};
	/**
	 * @param (Client) client from discord.js
	 * @return (ApplicationCommand)
	 */
	commands(commandId) {
		const options = {
			commandId: commandId,
			guildId: this.guildId
		};
		return new ApplicationCommand(this.client, options);
	};
	/**
	 * @return (ApplicationCommandAll)
	 */
	get commands() {
		const options = {
			guildId: this.guildId
		};
		return new ApplicationCommandAll(this.client, options);
	};
};
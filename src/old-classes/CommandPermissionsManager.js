'use strict';

const BaseManager = require('BaseManager.js');
const CommandPermissions = require('./CommandPermissions.js');
const Util = require('../util/Util.js');

/**
 * @extends (BaseManager)
 */
class CommandPermissionsManager extends BaseManager {
	/**
	 * @param (Client)
	 * @param (guildId)
	 */
	constructor(client, guildId, commandId) {
		super(client, guildId);

		this.commandId = commandId;

		this.guild = client.guilds.cache(guildId);
	};
	/**
	 * @param (Snowflake) id of user
	 * @return (CommandPermissions)
	 */
	async get(commandId) {
		const useId = this.commandId ? this.commandId : commandId;
		if (!useId) return;
		const data = await this.client.api.application(this.client.id).guilds(this.guildId)
		.commands(useId).permissions.get();
		return Util.transformApplicationCommandPermissions(data);
	};
	/**
	 * @return (Array<CommandPermissions>)
	 */
	async getAll() {
		const data = await this.client.api.application(this.client.id).guilds(this.guildId)
		.commands.permissions.get();
		return Util.transformApplicationCommandPermissions(data);
	};
	/**
	 * @param ({ commandId, permissions })
	 * @return (Array<CommandPermissions>)
	 */
	async add({ commandId, permissions } = options) {
		const useId = this.commandId ? this.commandId : commandId;
		if (!useId) return;
		const data = await this.client.api.application(this.client.id).guilds(this.guildId)
		.commands(useId).permissions.put({
			permissions: srcArr
		});
		return Util.transformApplicationCommandPermissions(data);
	};
	/**
	 * @param (Array<{ commandId, Array<CommandPermissionData> }>)
	 * @return (Array<CommandPermissions>)
	 */
	async batchEdit(options = []) {
		const filter = options.every(elm => {
			if (elm instanceof Object) return false;
			const { id, permissions } = elm;
			return id&&permissions&&permissions instanceof Array;
		});
		if (!filter) return;
		
		const data = await this.client.api.application(this.client.id).guilds(this.guildId)
		.commands.permissions.put(options);
	};
};

module.exports = CommandPermissionsManager;
'use strict';

const { ApplicationCommandTypes, ApplicationCommandOptionsTypes, ApplicationCommandPermissionsTypes } = require('../interfaces/Types.js');

class Util {
	/**
	 * @param (array<object>|object) data of command
	 * @return (object)
	 */
	static transformApplicationCommand(options) {
		const target = Array.isArray(options) ? options : [options];
		const transformed = target.map(elm => {
			return {
				id: elm.id,
				type: ApplicationCommandTypes[elm.type],
				application_id: elm.application_id || elm.applicationId,
				guild_id: elm.guild_id || elm.guildId,
				name: elm.name,
				description: elm.description,
				options: this.transformApplicationCommandOptions(elm.options),
				default_permission: elm.default_permission || elm.defaultPermission,
				version: elm.version
			};
		});
		return Array.isArray(options) ? transformed : transformed.shift();
	};
	/**
	 * @param {(APIApplicationCommandOption | ApplicationCommandOptionData) | Array<()>}
	 * @optional {boolean} whether the options is for API
	 * @return {ApplicationCommandOption | ApplicationCommandOption[]}
	 */
	static transformOptions(options, toAPI) {
		let target = Array.isArray(options) ? options : [options];

		const channelTypesKey = toAPI ? 'channel_types' : 'channelTypes';
		const minValueKey = toAPI ? 'min_value' : 'minValue';
		const maxValueKey = toAPI ? 'max_value' : 'maxValue';

		target.map(elm => {
			return {
				type: ApplicationCommandOptionTypes[elm.type],
				name: elm.name,
				description: elm.description,
				required: elm.required,
				choices: choices,
				options: this.transformOptions(elm.options),
				[channelTypesKey]: resolveChannelTypes(elm.channelTypes || elm.channel_types),
				[minValueKey]: elm.minValue || elm.min_value,
				[maxValueKey]: elm.maxValue || elm.max_value,
				autocomplete: elm.autocomplete
			};
		});

		return Array.isArray(options) ? options : options.shift();
	};
	/**
	 * @param (Array<object>|object) data of permission
	 * @return (object)
	 */
	static transformApplicationCommandPermissions(options) {
		const target = Array.isArray(options) ? options : [options];
		const transformed = target.map(element => {
			return {
				id: elm.id,
				type: ApplicationCommandPermissionsTypes[elm.type],
				permission: elm.permission
			};
		});
		return Array.isArray(options) ? transformed : transformed.shift();
	};
};

module.exports = Util;
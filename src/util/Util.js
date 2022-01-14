'use strict';

const { ApplicationCommandTypes, ApplicationCommandOptionsTypes, ApplicationCommandPermissionsTypes, ChannelTypes } = require('../interfaces/Types.js');

class Util {
	/**
	 * @param {APIChannelType | APIChannelType[]}
	 * @param {boolean} whether the result is for API
	 * @return {ChannelType}
	 */
	static resolveChannelTypes(types, toAPI) {
		let target = Array.isArray(types) ? types : [types];

		target.map(elm => toAPI
				? (typeof elm === 'number' ? elm : ChannelTypes[elm])
				: (typeof elm === 'string' ? elm : ChannelType[elm])
			);

		return Array.isArray(types) ? target : target.shift();
	};
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
				options: this.transformApplicationCommandOptions(elm.options || []),
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
	static transformApplicationCommandOptions(options, notToAPI) {
		let target = Array.isArray(options) ? options : [options];

		const channelTypesKey = !notToAPI ? 'channel_types' : 'channelTypes';
		const minValueKey = !notToAPI ? 'min_value' : 'minValue';
		const maxValueKey = !notToAPI ? 'max_value' : 'maxValue';

		target.map(elm => {
			return {
				type: ApplicationCommandOptionsTypes[elm.type],
				name: elm.name,
				description: elm.description,
				required: elm.required,
				choices: choices,
				options: this.transformApplicationCommandOptions(elm.options),
				[channelTypesKey]: this.resolveChannelTypes(elm.channelTypes || elm.channel_types, toAPI),
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
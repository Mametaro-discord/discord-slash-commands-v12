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
	 * @param {boolean} @optional
	 * @return (object)
	 */
	static transformApplicationCommand(options, received) {
		let target = Array.isArray(options)
			? options
			: typeof options === 'object'
				? [options]
				: [];
		target = target.map(elm => {
			return {
				id: elm.id,
				type: ApplicationCommandTypes[elm.type],
				application_id: elm.application_id || elm.applicationId,
				guild_id: elm.guild_id || elm.guildId,
				name: elm.name,
				description: elm.description,
				options: this.transformApplicationCommandOptions(elm.options || [], received),
				default_permission: elm.default_permission || elm.defaultPermission,
				version: elm.version
			};
		});
		return Array.isArray(options) ? target : target.shift();
	};
	/**
	 * @param {(APIApplicationCommandOption | ApplicationCommandOptionData) | Array<()>}
	 * @optional {boolean} whether the options is for API
	 * @return {ApplicationCommandOption | ApplicationCommandOption[]}
	 */
	static transformApplicationCommandOptions(options, received) {
		let target = Array.isArray(options)
			? options
			: typeof options === 'object'
				? [options]
				: [];

		const channelTypesKey = received ? 'channelTypes' : 'channel_types';
		const minValueKey = received ? 'minValue' : 'min_value';
		const maxValueKey = received ? 'maxValue' : 'max_value';

		target = target.map(elm => {
			return {
				type: ApplicationCommandOptionsTypes[elm.type],
				name: elm.name,
				description: elm.description,
				required: elm.required,
				choices: elm.choices,
				options: this.transformApplicationCommandOptions(elm.options),
				[channelTypesKey]: this.resolveChannelTypes(elm.channelTypes || elm.channel_types, !notToAPI),
				[minValueKey]: elm.minValue || elm.min_value,
				[maxValueKey]: elm.maxValue || elm.max_value,
				autocomplete: elm.autocomplete
			};
		});

		return Array.isArray(options) ? target : target.shift();
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
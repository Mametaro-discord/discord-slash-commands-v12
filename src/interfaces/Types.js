'use strict';

function generateEnum(array) {
	let generated = {};
	array.forEach((elm, idx) => {
		if (elm === null) return;
		generated[elm] = idx;
		generated[idx] = elm;
	});
	return generated;
};

module.exports.ApplicationCommandTypes = generateEnum([
		null,
		'CHAT_INPUT',
		'USER',
		'MESSAGE'
	]);

module.exports.ApplicationCommandPermissionsTypes = generateEnum([
		null,
		'ROLE',
		'USER'
	]);

module.exports.ApplicationCommandOptionsTypes = generateEnum([
		null,
		'SUB_COMMAND',
		'SUB_COMMAND_GROUP',
		'STRING',
		'INTEGER',
		'BOOLEAN',
		'USER',
		'CHANNEL',
		'ROLE',
		'MENTIONABLE',
		'NUMBER'
	]);

module.exports.ChannelTypes = generateEnum([
		'GUILD_TEXT',
		'DM',
		'GUILD_VOICE',
		'GROUP_DM',
		'GUILD_CATEGORY',
		'GUILD_NEWS',
		'GUILD_STORE',
		null,
		null,
		null,
		'GUILD_NEWS_THREAD',
		'GUILD_PUBLIC_THREAD',
		'GUILD_PRIVATE_THREAD',
		'GUILD_STAGE_VOICE'
	]);

module.exports.InteractionCallbackTypes = generateEnum([
		null,
		'PONG',
		null,
		null,
		'CHANNEL_MESSAGE_WITH_SOURCE',
		'DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE',
		'DEFERRED_UPDATE_MESSAGE',
		'UPDATE_MESSAGE'
	]);
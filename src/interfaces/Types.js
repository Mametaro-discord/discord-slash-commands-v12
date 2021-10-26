'use strict';

function createEnum(array) {
	let created = {};
	array.forEach((elm, idx) => {
		if (elm === null) return;
		created[elm] = idx;
		created[idx] = elm;
	});
	return created;
};

module.exports.ApplicationCommandTypes = createEnum([
		null,
		'CHAT_INPUT',
		'USER',
		'MESSAGE'
	]);

module.exports.ApplicationCommandPermissionsTypes = createEnum([
		null,
		'ROLE',
		'USER'
	]);

module.exports.ApplicationCommandOptionsTypes = createEnum([
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

module.exports.ChannelTypes = createEnum([
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

module.exports.InteractionTypes = createEnum([
		null,
		'PING',
		'APPLICATION_COMMAND',
		'MESSAGE_COMPONENT'
	]);

module.exports.InteractionReplyTypes = createEnum([
		null,
		'PONG',
		null,
		null,
		'CHANNEL_MESSAGE_WITH_SOURCE',
		'DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE',
		'DEFERRED_UPDATE_MESSAGE',
		'UPDATE_MESSAGE'
	]);

module.exports.MessageComponentTypes = createEnum([
		null,
		'ACTION_ROW',
		'BUTTON',
		'SELECT_MENU'
	]);
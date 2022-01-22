'use strict';

function createEnum(arr = []) {
	let result = {};
	arr.forEach((elm, idx) => {
		result[elm] = idx;
		result[idx] = elm;
	});
	return result;
};

exports.ApplicationCommandTypes = createEnum([
		null,
		'CHAT_INPUT',
		'USER',
		'MESSAGE'
	]);

exports.ApplicationCommandOptionTypes = createEnum([
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

exports.ApplicationCommandPermissionTypes = createEnum([
		null,
		'ROLE',
		'USER'
	]);

exports.ButtonStyles = createEnum([
		null,
		'blurple',
		'grey',
		'green',
		'red',
		'url'
	]);

exports.ChannelTypes = createEnum([
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

exports.ComponentTypes = createEnum([
		null,
		'ACTION_ROW',
		'BUTTON',
		'SELECT_MENU'
	]);

exports.InteractionTypes = createEnum([
		null,
		'PING',
		'APPLICATION_COMMAND',
		'MESSAGE_COMPONENT',
		'APPLICATION_COMMAND_AUTOCOMPLETE'
	]);

exports.InteractionReplyTypes = createEnum([
		null,
		'PONG',
		null,
		null,
		'CHANNEL_MESSAGE_WITH_SOURCE',
		'DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE',
		'DEFERRED_UPDATE_MESSAGE',
		'UPDATE_MESSAGE',
		'APPLICATION_COMMAND_AUTOCOMPLETE_RESULT'
	]);

exports.MessageButtonStyles = createEnum([
		null,
		'blurple',
		'grey',
		'green',
		'red',
		'url'
	]);

exports.MessageComponentTypes = createEnum([
		null,
		'ACTION_ROW',
		'MESSAGE_COMPONENT',
		'SELECT_MENU'
	]);
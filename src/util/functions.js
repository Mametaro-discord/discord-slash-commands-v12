'use strict';

const { Collection } = require('discord.js');

/**
 * @param {array}
 * @return {Collection}
 */
module.exports.makeCol = function(arr = []) {
	const data = arr.reduce((col, elm) => col.set(
			elm.id,
			elm
		),
		new Collection()
	);
};
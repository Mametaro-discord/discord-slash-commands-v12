'use strict';

const { Collection } = require('discord.js');

module.exports.makeCol = async function(arr) {
	const newArr = arr.map(elm => [elm.id, elm]);
	return new Collection(newArr);
};
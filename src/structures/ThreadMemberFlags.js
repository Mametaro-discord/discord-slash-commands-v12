'use strict';

const { BitField } = require('discord.js');

/**
 * @extends {BitField}
 */
class ThreadMemberFlags extends BitField {};

/**
 * @type {Object<string, number>}
 * @static
 */
ThreadMemberFlags.FLAGS = {};

module.exports = ThreadMemberFlags;
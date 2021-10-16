const { Client } = require('discord.js');
const client = new Client();
const slash = require('../src/index.js');
slash(client);

const ping = {
	name: 'ping',
	description: 'pong'
};

console.log(client.commands);
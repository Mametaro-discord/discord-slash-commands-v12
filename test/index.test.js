const { Client, Structures } = require('discord.js');
const client = new Client();

const slash = require('../src/index.js');

slash(client);

const GuildCommandManager = require('../src/classes/GuildCommandManager.js')
# discord-slash-command-v12

## Description 
By using this, You can use slash commands even if you use discord.js@12 
However, you cannot use MessageComponents; 

## Install
```
npm i discord-slash-commands-v12 
```

## Usage 
**setup** 
```js
const { Client } = require('discord.js');
const client = new Client();
const slash = require('discord-slash-commands-v12');
slash(client);
``` 

**Event Listener** 
```js
client.on('command', (data) => {
	//code
});
``` 

**Ping-Pong ex** 
```js
slash(client);
const ping = {
	name: 'ping',
	description: 'pong!'
};
await client.commands.create(ping, '000000000000000000' /* id of guild*/);

client.on('command', data => {
	if (data.commandName === 'ping') {
		data.reply.send('pong!');
	};
});
``` 

## You need more help?
[my discord server](https://discord.gg/UQSUBHwM7T)

## Commemt
I hope I did no mistake; 
Give issues if you find bugs! 
 
I will make MessageComponents usable. 
So, wait for next new releases. 
![npm](https://img.shields.io/npm/v/discord-slash-commands-v12?style=flat-square) ![git-tag](https://img.shields.io/github/v/tag/Mametaro-discord/discord-slash-command-v12?style=flat-square) ![downloads](https://img.shields.io/npm/dt/discord-slash-commands-v12?style=flat-square) ![license](https://img.shields.io/github/license/Mametaro-discord/discord-slash-command-v12?style=flat-square)
# discord-slash-command-v12
 
## Check it
This package has some problems, and I fixing it.  
So please give me reports(issue, pull request) to me.

## Description 
By using this, You can use slash commands even if you use discord.js@12  
However, you cannot use MessageComponents;  

## Before Using
**Install**  
```
npm i discord-slash-commands-v12 
```  
  
**Give Scopes**  
You need to give scope 'applications.commands' to your bot for using slash commands.  
↓url example
```
https://discord.com/api/oauth2/authorize?client_id={YOUR_BOT's_ID}&permissions=0&scope=bot%20applications.commands
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

**Ping-Pong** 
```js
slash(client);

client.on('ready', () => {
	const ping = {
		name: 'ping',
		description: 'pong!'
	};
	client.commands.create(ping);
});

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
Give me issues if you find bugs!  
 
I will make MessageComponents usable.  
So, wait for next new releases.  
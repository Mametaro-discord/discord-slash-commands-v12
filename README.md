# discord-slash-command-v12

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

**Ping-Pong ex** 
```js
slash(client);
const ping = {
	name: 'ping',
	description: 'pong!'
};
client.commands.create(ping);

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
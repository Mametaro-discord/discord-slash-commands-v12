# discord-slash-command-v12

## Description 
discordのスラッシュコマンドをv12で操作できます。 
MessageComponentsには対応していませんotl 

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
[![version](https://img.shields.io/npm/v/discord-slash-commands-v12?style=flat-square)](https://www.npmjs.com/package/discord-slash-commands-v12?activeTab=versions)
[![downloads](https://img.shields.io/npm/dt/discord-slash-commands-v12?style=flat-square)](https://www.npmjs.com/package/discord-slash-commands-v12)
[![issue](https://img.shields.io/github/issues/Mametaro-discord/discord-slash-command-v12?style=flat-square)](https://github.com/Mametaro-discord/discord-slash-commands-v12/issues)
[![pull request](https://img.shields.io/github/issues-pr/Mametaro-discord/discord-slash-command-v12?style=flat-square)](https://github.com/Mametaro-discord/discord-slash-commands-v12/pulls)
[![license](https://img.shields.io/github/license/Mametaro-discord/discord-slash-command-v12?style=flat-square)](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/LICENSE)
# discord-slash-commands-v12

## Description 
これを使えばdiscord.jsのv12でもスラッシュコマンドを操作することができます！  
MessageComponentsは使えません。

## Before Using
**Install**  
```
npm i discord-slash-commands-v12 
```  
  
**Scopes**  
スラッシュコマンドを使うためにボットにapplication.commandsスコープを渡す必要が有ります。  
↓URLの例  
```
https://discord.com/api/oauth2/authorize?client_id={BOT_ID}&permissions=0&scope=bot%20applications.commands
```

## Usage 
**setup** 
```js
const { Client } = require('discord.js');
const client = new Client();
const slash = require('discord-slash-commands-v12');
slash(client);
```  
セットアップ関数はそのものを返します。つまり、  
```js
const slash = require('discord-slash-commands-v12');
slash === slash(); //true
```  
こういうことです；

**Event Listener** 
```js
client.on('commandInteraction', (data) => {
	//code
});
``` 

**Ping-Pong** 
```js
client.on('ready', () => {
	const ping = {
		name: 'ping',
		description: 'pong!'
	};
	client.commands.create(ping); //グローバルコマンド
	guild.commands.create(ping); //ギルドコマンド
});

client.on('commandInteraction', data => {
	if (data.commandName === 'ping') {
		data.reply.send('pong!');
	};
}); //ContextMenuも含まれます(メッセージコマンドとユーザーコマンドのことです。)
```  
**Autocomplete interaction**  
```js
client.on('autocompleteInteraction', data => {});
```

## You need more help?
[my discord server](https://discord.gg/UQSUBHwM7T)

## Commemt
ミスやバグを見つけたらissueやPRお願いします。  
  
MessageComponents未対応です。
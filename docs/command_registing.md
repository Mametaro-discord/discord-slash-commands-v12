# Registing command etc...

## Checkit  
ここでの`client.commands`や`guild.commands`はApplicationCommandManagerです。  
  
ApplicationCommandManagerのメソッドにおいて、  
guildIdを指定しなかったとき、グローバルコマンドが補完されます。  
グローバルコマンドとギルドコマンドではありません。

## コマンドを追加する  
**グローバルコマンド**  
```js
client.commands.create(commandData);
```  

**ギルドコマンド**  
```js
client.commands.create(commandData, guildId);
```  
```js
guild.commands.create(commandData);
```  

**Return**: [ApplicationCommand](https://github.com/Mametaro-discord/discord-slash-commands-v12/master/docs/classes/ApplicationCommand.md)    

## ApplicationCommandPermissionsManagerを取得する
```js
//ApplicationCommandPermissionsManager
command.permissions
```  
  
**グローバルコマンド**
```js
client.commands.permissions
```  
  
**ギルドコマンド**
```js
guild.commands.permissions
```  

## コマンドを取得する  
**グローバルコマンド**  
```js
await client.commands.fetch(); //すべてのグローバルコマンド
await client.commands.fetch({ commandId: '000000000000000000' }); 
```  
  
**ギルドコマンド**
```js
await client.commands.fetch({ guildId: '000000000000000000'}); //すべてのギルドコマンド
await client.commands.fetch({ commandId: '000000000000000000', guildId: '000000000000000000'});
```  
  
```js
await guild.commands.fetch(); // すべてのギルドコマンド
await guild.commands.fetch({ commandId: '000000000000000000'});
```  

## コマンドを削除する
```js
command.delete();
```  

**グローバルコマンド**
```js
client.commands.delete('000000000000000000');
```  
  
**ギルドコマンド**
```js
client.commands.delete('000000000000000000' /*commandId*/, '000000000000000000' /*guildId*/);
```  
  
```js
guild.commands.delete('000000000000000000');
```  

## コマンドを編集する
```js
command.edit(commandData);
```  
  
**グローバルコマンド**  
```js
client.commands.edit('000000000000000000', commandData);
```  
  
**ギルドコマンド**  
```js
client.commands.edit('000000000000000000' /*commandId*/, commandData, '000000000000000000' /*guildId*/);
```  
  
```js
guild.commands.edit('000000000000000000', commandData);
```

## コマンドを上書きする
**global command**
```js
client.commands.set(commandData[]);
```  
  
**guild command**
```js
client.commands.set(commandData[], '000000000000000000' /*guildId*/);
```  
  
```js
guild.commands.set(commandData[]);
```
# How to register

## Checkit
The commands property of "client" or "guild" is instance of the class "CommandManager".  
if you wanna know interfaces of the arguments(ex: commandData), plz show data models.  
  
On methods of "client.commands",  
If the argument "guildId" don't exist, global command is selected as target.
Not global command + guild command.


## Register Command
**Global Command**  
```js
client.commands.create(commandData);
```  

**Guild Command**  
```js
client.commands.create(commandData, guildId);
```  
```js
guild.commands.create(commandData);
```  

**return**: [ApplicationCommand](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/ApplicationCommand.md)

## Get Permissions
```js
//ApplicationCommandPermissionsManager
command.permissions
```  
  
**Global Command**
```js
client.commands.permissions
```  
  
**Guild Command**
```js
guild.commands.permissions
```  

## Fetch Commands
**Global Command**  
```js
client.commands.fetch(); //all global commands
client.commands.fetch({ commandId: '000000000000000000' }); 
```  
  
**Guild Command**
```js
client.commands.fetch({ guildId: '000000000000000000'}); //all guild commands
client.commands.fetch({ commandId: '000000000000000000', guildId: '000000000000000000'});
```  
  
```js
guild.commands.fetch(); // all guild commands
guild.commands.fetch({ commandId: '000000000000000000'});
```  

## Delete Command
```js
command.delete();
```  

**Global Command**
```js
client.commands.delete('000000000000000000');
```  
  
**Guild Command**
```js
client.commands.delete('000000000000000000' /*commandId*/, '000000000000000000' /*guildId*/);
```  
  
```js
guild.commands.delete('000000000000000000');
```  

## Edit Command
```js
command.edit(commandData);
```  
  
**Global Command**  
```js
client.commands.edit('000000000000000000', commandData);
```  
  
**Guild Command**  
```js
client.commands.edit('000000000000000000' /*commandId*/, commandData, '000000000000000000' /*guildId*/);
```  
  
```js
guild.commands.edit('000000000000000000', commandData);
```

## Overwrite Command  
**Global Command**
```js
client.commands.set(commandData[]);
```  
  
**Guild Command**
```js
client.commands.set(commandData[], '000000000000000000' /*guildId*/);
```  
  
```js
guild.commands.set(commandData[]);
```

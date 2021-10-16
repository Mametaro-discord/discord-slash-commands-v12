#Command registing etc...

### Checkit
The commands property of 'client' or 'guild' is instance of the class 'CommandManager'.  

On methods of 'client.commands',  
If the argument 'guildId' don't exist, global command is selected as target.
Not global command + guild command.


##### registing command
**global command**  
```js
client.commands.create(commandData);
```  

**guild command**  
```js
client.commands.create(commandData, guildId);
```  
```js
guild.commands.create(commandData);
```  

**return**: Command  

##### getting Collection(discord.js)<Command>
**global command**  
```js
client.commands.col
```  
  
**guild command**  
```js
guild.commands.col
```  

#####getting permissions
```js
command.permissions
```  
  
**global command**
```js
client.commands.permissions
```  
  
**guild command**
```js
guild.commands.permissions
```  

##### fetching command
**global command**  
```js
client.commands.fetch(); //all global commands
client.commands.fetch({ commandId: '000000000000000000' }); 
```  
  
**guild command**
```js
client.commands.fetch({ guildId: '000000000000000000'}); //all guild commands
client.commands.fetch({ commandId: '000000000000000000', guildId: '000000000000000000'});
```  
  
```js
guild.commands.fetch(); // all guild commands
guild.commands.fetch({ commandId: '000000000000000000'});
```  

##### deleting command
```js
command.delete();
```  

**global command**
```js
client.commands.delete('000000000000000000');
```  
  
**guild command**
```js
client.commands.delete('000000000000000000' /*commandId*/, '000000000000000000' /*guildId*/);
```  
  
```js
guild.commands.delete('000000000000000000');
```  

##### editing command
```js
command.edit(commandData);
```  
  
**global command**  
```js
client.commands.edit('000000000000000000', commandData);
```  
  
**guild command**  
```js
client.commands.edit('000000000000000000' /*commandId*/, commandData, '000000000000000000' /*guildId*/);
```  
  
```js
guild.commands.edit('000000000000000000', commandData);
```

##### Overwriting command  
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
# How to response

## checkit
```js
client.on('command', interaction => {});
```
The event named as "command" callbacks [CommandInteraction](classes/CommandInteraction).<br>
It’s defined as `interaction` here.

## Send Reply  
If you set the second argument true(boolean), or set the property "flags" of options 64(number),  
the reply will be ephemeral.  
```js
interaction.reply.send(content, option);
```  
  
**Returns**: [Reply](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/Reply.md)

## Edit Reply  
If you set the second argument to true(boolean), or set the property "flags" of options to 64(number),  
the reply will be ephemeral.  
```js
interaction.reply.edit(content, option);
```  
  
**Returns**: [Reply](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/Reply.md)  

## Delete Reply  
```js
interaction.reply.delete();
``` 
  
**Returns**: [Reply](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/Reply.md)

## Fetch Reply  
```js
interaction.reply.fetch();
```  
  
**Returns**: [Reply](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/Reply.md)  

## Defer Reply
If you set the argument to true(boolean), this reply will be ephemeral.  
```js
interaction.reply.defer(ephemeral);
```  
  
**Returns**: [Reply](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/Reply.md)  

## Think for The Reply  
If you set the argument to true(boolean), this reply will be ephemeral.  
```js
interaction.reply.think(ephemeral);
```  

**Returns**: [Reply](https://github.com/Mametaro-discord/discord-slash-commands-v12/blob/master/docs/classes/Reply.md)

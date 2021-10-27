# How to response

## checkit
```js
client.on('command', interaction => {});
```
The argument "interaction" of callback argument of **command** event is instance of CommandInteraction.  
When you response an interaction, you can use methods of "interaction.reply". It is instance of Reply.  
  
The keyword "interaction" means argument of callback↑ here.

## Send Reply  
If you set the second argument true(boolean), or set the property "flags" of options 64(number),  
the reply will be ephemeral.  
```js
interaction.reply.send(content, MessageOptions);
```  
  
**return**: The reply  

## Edit Reply  
If you set the second argument to true(boolean), or set the property "flags" of options to 64(number),  
the reply will be ephemeral.  
```js
interaction.reply.edit(content, MessageOptions);
```  
  
**return**: The reply  

## Delete Reply  
```js
interaction.reply.delete();
``` 
  
**return**: The reply

## Fetch Reply  
```js
interaction.reply.fetch();
```  
  
**return**: The reply  

## Defer Reply
If you set the argument to true(boolean), this reply will be ephemeral.  
```js
interaction.reply.defer(ephemeral);
```  
  
**return**: The reply  

## Think for The Reply  
If you set the argument to true(boolean), this reply will be ephemeral.  
```js
interaction.reply.think(ephemeral);
```  

**return**: The reply

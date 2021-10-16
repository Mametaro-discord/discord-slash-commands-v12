# Responsing interaction etc...  

## checkit
```js
client.on('command', interaction => {});
```
The argument 'interaction' of callback argument of **command** event is instance of CommandInteraction.  
When you response an interaction, you can use methods of 'interaction.reply'. It is instance of Reply.  
  
The keyword 'interaction' means argument of callback↑ here.

## sending reply  
If you set the second argument true(boolean), or set the property 'flags' of options 64(number),  
the reply will be ephemeral.  
```js
interaction.reply.send(content, MessageOptions);
```  
  
**return**: Reply  

## editing reply  
If you set the second argument to true(boolean), or set the property 'flags' of options to 64(number),  
the reply will be ephemeral.  
```js
interaction.reply.edit(content, MessageOptions);
```  
  
**return**: Reply  

## deleting reply  
```js
interaction.reply.delete();
``` 
  
**return**: Reply

## fetching reply  
```js
interaction.reply.fetch();
```  
  
**return**: Reply  

## defering reply  
If you set the argument to true(boolean), this reply will be ephemeral.  
```js
interaction.reply.defer(ephemeral);
```  
  
**return**: Reply  

## responsing thinking reply  
If you set the argument to true(boolean), this reply will be ephemeral.  
```js
interaction.reply.think(ephemeral);
```  

**return**: Reply
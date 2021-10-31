# Responsing interaction etc...  

## Checkit
```js
client.on('command', interaction => {});
```  
commandイベントのコールバックの引数のinteractionは[CommandInteraction](https://github.com/Mametaro-discord/discord-slash-commands-v12/master/docs/classes/CommandInteraction.md)です。  
リプライするときは[Reply](https://github.com/Mametaro-discord/discord-slash-commands-v12/master/docs/classes/Reply.md)のメソッドを使います。これはinteraction.replyで取得できます。  
  
この先のinteractionは↑のinteractionを示します(コールバックの引数)  

## リプライを送信する
第二引数をtrueにするか、そのflagsプロパティを64にするとリプライはephemeralになります。  
```js
interaction.reply.send(content, options);
```  
  
**Return**: [Reply](https://github.com/Mametaro-discord/discord-slash-commands-v12/master/docs/classes/Reply.md)  

## リプライを編集する  
第二引数をtrueにするか、そのflagsプロパティを64にするとリプライはephemeralになります。 
```js
interaction.reply.edit(content, options);
```  
  
**Return**: [Reply](https://github.com/Mametaro-discord/discord-slash-commands-v12/master/docs/classes/Reply.md)

## リプライを削除する 
```js
interaction.reply.delete();
``` 
  
**Return**: [Reply](https://github.com/Mametaro-discord/discord-slash-commands-v12/master/docs/classes/Reply.md)  

## リプライを取得する
```js
await interaction.reply.fetch();
```  
  
**return**: [Reply](https://github.com/Mametaro-discord/discord-slash-commands-v12/master/docs/classes/Reply.md)  

## リプライを一時的にする(defer)  
引数をtrueにするとephemeralになります。
```js
interaction.reply.defer(ephemeral);
```  
  
**Return**: [Reply](https://github.com/Mametaro-discord/discord-slash-commands-v12/master/docs/classes/Reply.md)  ) 

## 考え中のリプライ  
引数をtrueにするとephemeralになります。
```js
interaction.reply.think(ephemeral);
```  

**Return**: [Reply](https://github.com/Mametaro-discord/discord-slash-commands-v12/master/docs/classes/Reply.md)  
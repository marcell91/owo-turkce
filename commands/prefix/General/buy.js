const { EmbedBuilder } = require("discord.js");
const fs = require('fs');
const db = require("croxydb");
const items = require("../../../items/items")


module.exports = {
  config: {
    name: "buy",
    description: "Buy",
    usage: "ubuy"
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix) => {

   var para = db.get(`${message.author.id}_cash`);
   if(para === undefined) para = 0

   if(!args[0]) return message.reply(`Bir ürün belirt!`)
   var secenekisim = args.slice(0).join(" ")

   if(!items[secenekisim]) return message.reply(`Öyle bir ürün yok.`)

   const fiyat = items[secenekisim].fiyat
   if(fiyat > para) return message.reply(`Yetersiz bakiye!`)

   if(await db.get(`${message.author.id}_${secenekisim}`) === true) return message.reply(`Bu ürüne zaten sahipsin!`)

   db.add(`${message.author.id}_cash`, -fiyat)
   db.set(`${message.author.id}_${secenekisim}`, true)
   db.push(`${message.author.id}_inv`, secenekisim)
   message.reply(fiyat + " fiyatına `" + secenekisim + "` ürününü satın aldın!")

  },

};
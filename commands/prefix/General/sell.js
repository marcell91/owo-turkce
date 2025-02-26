const { EmbedBuilder } = require("discord.js");
const fs = require('fs');
const db = require("croxydb");
const items = require("../../../items/items")


module.exports = {
  config: {
    name: "sell",
    description: "Sell",
    usage: "usell"
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
   const satis = Math.floor(fiyat * 0.5);

   if(!db.get(`${message.author.id}_${secenekisim}`)) return message.reply(`Bu ürüne zaten sahip değilsin!`)

   db.add(`${message.author.id}_cash`, satis)
   db.delete(`${message.author.id}_${secenekisim}`)
   let inv = db.get(`${message.author.id}_inv`) || [];
   inv = inv.filter(item => item !== secenekisim);
   db.set(`${message.author.id}_inv`, inv);
   message.reply(satis + " fiyatına `" + secenekisim + "` ürününü sattın!");

  },

};
const { EmbedBuilder } = require("discord.js");
const fs = require('fs');
const db = require("croxydb");
const items = require("../../../items/items")
const items1 = [
    { name: "Deneme 1", fiyat: 30},
    { name: "Deneme 2", fiyat: 40},
    { name: "Deneme 3", fiyat: 50},
]

module.exports = {
  config: {
    name: "shop",
    description: "Bakiyenizdeki parayı görmenizi sağlar.",
    usage: "cash"
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix) => {

   var para = db.get(`${message.author.id}_cash`);
   if(para === undefined) para = 0

   function marketgoster(message) {
    const membed = new EmbedBuilder()
    .setTitle(`Mağaza 🛒`)
    .setColor("Blurple")
    .setDescription(`Aşağıdaki ürünleri satın alabilirsiniz: (Bakiyeniz: ${para})`)

    for(const item in items)
    membed.addFields(
        { name: `${items[item].name}`, value: `Fiyat: ${items[item].fiyat}\nGüç: ${items[item].power}`, inline: true}
    )
    message.reply({embeds: [membed]})
   }

   marketgoster(message)
  },

};
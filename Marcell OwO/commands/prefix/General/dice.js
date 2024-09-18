
const { EmbedBuilder } = require("discord.js");
const fs = require('fs');
const db = require("croxydb");
const moment = require('moment');
moment.locale('tr');
require('moment-duration-format'); 

module.exports = {
  config: {
    name: "dice",
    description: "Zar atarak rastgele miktarda para kazanmanızı (!) sağlar. Bedeli 1000 Cash'dir.",
    usage: "daily"
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix) => {

    if(db.get(`${message.author.id}_dice`) > Date.now()) {
      return message.reply('Hey, yavaş ol. **'+moment.duration(db.get(`${message.author.id}_dice`)-Date.now()).format('s [saniye]')+'** beklemelisin.'); 
    } else {
      db.set(`${message.author.id}_dice`, Date.now()+require('ms')('10s'));

  var bakiye = db.get(`${message.author.id}_cash`)
    

   var para = db.get(`${message.author.id}_cash`);
   if(para === undefined) {
    para = 0
   }
   if(para === 0) return message.reply("Yeterli paran yok!")
   if(1000 > bakiye) return message.reply("Yeterli paran yok!")
   var zar = ["1", "2", "3", "4", "5", "6"]
   var zarr = zar[Math.floor(Math.random() * zar.length)]

   var para = [100, 331, 981, 99785, 125, 80, 998, 1000, 250, 435, 784, 221, 100, 131, 33, 97, 20, 3, 210, 31, 1, 2000, 3250, 4500]
   var paraa = para[Math.floor(Math.random() * para.length)]

   if(!args[0]) return message.reply("Tek mi? Çift mi?")

   if(args[0] === "tek".toLocaleLowerCase()) {
    if(zarr === "1" || zarr === "3" || zarr === "5") {
        db.add(`${message.author.id}_cash`, paraa)
        return message.reply(`1000 cash kullanarak zar oynadın.\nKazandın! Gelen sayı: **${zarr}**. Kazandığın para: **${paraa}**!`)
        
    } else {
      db.add(`${message.author.id}_cash`, -1000)
    return message.reply(`1000 cash kaybettin. Gelen sayı: **${zarr}**`)
    }
   }
   
   if(args[0] === "çift".toLocaleLowerCase()) {
    if(zarr === "2" || zarr === "4" || zarr === "6") {
      db.add(`${message.author.id}_cash`, paraa)
      return message.reply(`1000 cash kullanarak zar oynadın.\nKazandın! Gelen sayı: **${zarr}**. Kazandığın para: **${paraa}**!`)
    } else {
        db.add(`${message.author.id}_cash`, -1000)
        return message.reply(`1000 cash kaybettin. Gelen sayı: **${zarr}**`)
    }
   }

  }

  },

};
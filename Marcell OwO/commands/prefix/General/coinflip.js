const { EmbedBuilder } = require("discord.js");
const fs = require('fs');
const db = require("croxydb");;
const { isInteger } = require("mathjs");
const moment = require('moment');
moment.locale('tr');
require('moment-duration-format'); 

module.exports = {
  config: {
    name: "cf",
    description: "Yazı tura atıp katlamanızı sağlar.",
    usage: "cf [yazı/tura] [bahis miktarı]"
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix) => {

    if(db.get(`${message.author.id}_cf`) > Date.now()) {
        return message.reply('Hey, yavaş ol. **'+moment.duration(db.get(`${message.author.id}_cf`)-Date.now()).format('s [saniye]')+'** beklemelisin.'); 
      } else {
        db.set(`${message.author.id}_cf`, Date.now()+require('ms')('10s'));

    var secenekler = ["yazı", "tura"];
    var secenek = secenekler[Math.floor(Math.random() * secenekler.length)]
    console.log(secenek)
    var bakiye = db.get(`${message.author.id}_cash`)
    var para = args[1]
    var tercih = args[0]
    if(!tercih) return message.reply(`Yazı mı? Tura mı? Söylemedin.`)
    if(!para) return message.reply(`Yanlış kullanım, doğrusu: ucf [yazı/tura] [bahis miktarı]`)
    if(para > bakiye) return message.reply(`Yeterli paran yok. Güncel bakiyen: ${bakiye}`)
    if (isNaN(para) && para !== "all") return message.reply('Bu bir sayı değil, bir sayı girmelisin!')
    if(para > bakiye) return message.reply("Yeterli paran yok!")
    if(para === "all") {
        if(tercih === secenek) {
            message.reply(`Kazandın! ${bakiye} Cash ekledim!`)
            db.add(`${message.author.id}_cash`, bakiye)
        } else {
            message.reply(`Bütün paranı kaybettin.`)
            db.add(`${message.author.id}_cash`, -bakiye)
        }
        return
    } else {
    if(tercih === secenek) {
        message.reply(`Kazandın! ${para} Cash ekledim!`)
        db.add(`${message.author.id}_cash`, para)
    } else {
        db.add(`${message.author.id}_cash`, -para)
        message.reply(`Kaybettin, güncel bakiyen: ${bakiye}`)
    }
}
      }   
}
   
};

const { EmbedBuilder } = require("discord.js");
const fs = require('fs');
const db = require("croxydb");
const st = require('common-tags');
const slots = ['🍇', '🍇', '🍇', '🍇', '🍊', '🍊', '🍐', '🍐', '🍒', '🍋'];
const moment = require('moment');
moment.locale('tr');
require('moment-duration-format'); 

module.exports = {
  config: {
    name: "slot",
    description: "Slot oynayarak rastgele miktarda para kazanmanızı (!) sağlar.",
    usage: "slot [miktar]"
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix) => {


    if(db.get(`${message.author.id}_slot`) > Date.now()) {
      return message.reply('Hey, yavaş ol. **'+moment.duration(db.get(`${message.author.id}_slot`)-Date.now()).format('s [saniye]')+'** beklemelisin.'); 
    } else {
      db.set(`${message.author.id}_slot`, Date.now()+require('ms')('6s'));

    var para = args[0]
    var all = false;
    if(!para) return message.reply(`Ne kadar oynayacan? Bir sayı girmelisin!`)
    if(isNaN(para) && para !== "all") return message.reply('Bu bir sayı değil, bir sayı girmelisin!')
    var bakiye = db.get(`${message.author.id}_cash`);
    if(bakiye === undefined) {
     bakiye = "0"
    }
    if(bakiye === "0") return message.reply("Yeterli paran yok!")
    if(para > bakiye) return message.reply("Yeterli paran yok!")

    var secenek = para*2
    var secenek1 = para
    var secenek2 = para*2
    var secenek3 = para
    var secenek4 = para
    var secenek5 = para
    var secenek6 = para*3
    var katlama = [secenek, secenek1, secenek2, secenek3, secenek4, secenek5, secenek6]
    var sonuc = katlama[Math.floor(Math.random() * katlama.length)]

    var secenek1 = bakiye*2
    var secenek11 = bakiye
    var secenek21 = bakiye*3
    var secenek31 = bakiye
    var secenek41 = bakiye
    var secenek51 = bakiye
    var secenek61 = bakiye*3
    var katlama1 = [secenek1, secenek11, secenek21, secenek31, secenek41, secenek51, secenek61]
    var sonuc1 = katlama1[Math.floor(Math.random() * katlama1.length)]

    var slot1 = slots[Math.floor(Math.random() * slots.length)];
    var slot2 = slots[Math.floor(Math.random() * slots.length)];
    var slot3 = slots[Math.floor(Math.random() * slots.length)];

    if(para === "all") {
        if (slot1 === slot2 && slot1 === slot3) {
            db.add(`${message.author.id}_cash`, sonuc1)
            var cuzdan = db.get(`${message.author.id}_cash`)
            if(cuzdan === undefined) cuzdan = 0
            message.reply(`${slot1} : ${slot2} : ${slot3}\nKazandın!\n\nYeni Bakiyen: ${cuzdan}`); 
        } else {
            db.delete(`${message.author.id}_cash`, bakiye)
            var cuzdan = db.get(`${message.author.id}_cash`)
            if(cuzdan === undefined) cuzdan = 0
            message.reply(`${slot1} : ${slot2} : ${slot3}\nBattın!\n\nYeni Bakiyen: ${cuzdan}`)    
      }
    } else {
    
    if (slot1 === slot2 && slot1 === slot3) {
        db.add(`${message.author.id}_cash`, sonuc)
        var cuzdan = db.get(`${message.author.id}_cash`)
        if(cuzdan === undefined) cuzdan = 0
        message.reply(`${slot1} : ${slot2} : ${slot3}\nKazandın!\n\nYeni Bakiyen: ${cuzdan}`); 
    } else {
        db.add(`${message.author.id}_cash`, -para)
        var cuzdan = db.get(`${message.author.id}_cash`)
        if(cuzdan === undefined) cuzdan = 0
        message.reply(`${slot1} : ${slot2} : ${slot3}\nKaybettin!\n\nYeni Bakiyen: ${cuzdan}`)
  }
}

    }
  },

};
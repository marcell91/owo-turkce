const { EmbedBuilder } = require("discord.js");
const fs = require('fs');
const db = require("croxydb");;
const { random } = require("mathjs");
const moment = require('moment');
moment.locale('tr');
require('moment-duration-format');


module.exports = {
  config: {
    name: "work",
    description: "Rastgele bir işte çalışıp para kazanmanızı sağlar.",
    usage: "uwork"
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix) => {

    if(db.get(`${message.author.id}_work`) > Date.now()) {
      return message.reply('Çalışmak için beklemen lazım!\n• Bir sonraki çalışman için **'+moment.duration(db.get(`${message.author.id}_work`)-Date.now()).format('w [hafta], d [gün], h [saat], m [dakika], s [saniye]')+'** beklemelisin.'); 
    } else {
      db.set(`${message.author.id}_work`, Date.now()+require('ms')('3h'));
      var isler = ["Bankacı", "İnşaatçı", "Bilgisayar Mühendisi", "Sanatçı", "Kaportacı", "Discord Botçusu"]
      var paralar = [5000, 1000, 500, 31, 1, 250]
  
      var secenek = isler[Math.floor(Math.random() * isler.length)]
      var para = paralar[Math.floor(Math.random() * paralar.length)]
  
      message.reply(`${secenek} olarak çalıştın ve ${para} kazandın!`)
      db.add(`${message.author.id}_cash`, `${para}`)
    };



  },

};
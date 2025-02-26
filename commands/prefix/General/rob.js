const { EmbedBuilder } = require("discord.js");
const fs = require('fs');
const db = require("croxydb");
const moment = require('moment');
moment.locale('tr');
require('moment-duration-format');


module.exports = {
  config: {
    name: "rob",
    description: "Birini soymanızı sağlar.",
    usage: "rob [kullanıcı]"
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix) => {

   var bakiye = db.get(`${message.author.id}_cash`);
   var user = message.mentions.members.first() || args[0]
   if (!user) {
    const possibleMembers = message.guild.members.cache.filter(member => member.id !== message.author.id);
    user = possibleMembers.random();
  }
  if(user == message.author.id) return message.reply(`Kendini soyamazsın!`)
   var paralar = [1000, 10000, 5000, 100, 100, 100, 250, 250, 500, 250, 500, 750, 750]
   var para = paralar[Math.floor(Math.random() * paralar.length)]

   if(db.get(`${message.author.id}_rob`) > Date.now()) {
    return message.reply(`Birisini soymak için beklemelisin! Beklemen gereken süre: **`+moment.duration(db.get(`${message.author.id}_rob`)-Date.now()).format('w [hafta], d [gün], h [saat], m [dakika], s [saniye]')+'** beklemelisin.')
   } else {
    db.set(`${message.author.id}_rob`, Date.now()+require('ms')('3h'));
    db.add(`${user.id}_cash`, -para)
    db.add(`${message.author.id}_cash`, para)
    message.reply(`${user} kullanıcısından ${para} çaldın!`)
   }


  },

};
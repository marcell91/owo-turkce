const { EmbedBuilder } = require("discord.js");
const fs = require('fs');
const db = require("croxydb");
const moment = require('moment');
moment.locale('tr');
require('moment-duration-format');


module.exports = {
  config: {
    name: "send",
    description: "Birine para göndermenizi sağlar.",
    usage: "send [kullanıcı] [miktar]"
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix) => {
 
    const user = message.mentions.members.first()
    const para = args[1]

 const gonderenpara = db.get(`${message.author.id}_cash`)
 const alicipara = db.get(`${user.id}_cash`)

 if (!user) return message.reply(`Bir kullanıcı etiketlemelisin!`)
 if (!para) return message.reply(`Ne kadar göndereceksin?`)

 if (gonderenpara < para) return message.reply(`Bu kadar paran yok.`)

 db.add(`${message.author.id}_cash`, -para)
 db.add(`${user.id}_cash`, para)

 message.reply(`${message.author}, ${user} kullanıcısına **${para}** gönderdi!`)


  },

};
const { EmbedBuilder } = require("discord.js");
const fs = require('fs');
const db = require("croxydb");
const moment = require('moment');
moment.locale('tr');
require('moment-duration-format');


module.exports = {
  config: {
    name: "daily",
    description: "Günlük rastgele bir miktar Cash kazanmanızı sağlar.",
    usage: "daily"
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix) => {
  

    if(db.get(`${message.author.id}_daily`) > Date.now()) {
        return message.reply('Bir sonraki günlük ödülünü alabilmek için beklemen gereken süre hala dolmamış.\n• Bir sonraki günlük ödülünü alabilmek için **'+moment.duration(db.get(`${message.author.id}_daily`)-Date.now()).format('w [hafta], d [gün], h [saat], m [dakika], s [saniye]')+'** beklemelisin.'); 
      } else {
        const eklenecek = Math.floor(Math.random() * 400) + 100;
        db.set(`${message.author.id}_daily`, Date.now()+require('ms')('1s'));
          db.add(`${message.author.id}_cash`, eklenecek)
          return message.reply(`**${eklenecek}** kadar parayı cüzdanına ekledin!`);
        
      };

  },

};
const { EmbedBuilder } = require("discord.js");
const db = require("croxydb");

module.exports = {
  config: {
    name: "rto",
    description: "Birinin zamanaşımını kaldırmanızı sağlar.",
    usage: "rto [kullanıcı id] [timeout turu]"
  },
  permissions: ['Administrator'],
  owner: true,
  run: async (client, message, args, prefix, config) => {

    

    var kullanici = args[0]
    var tur = args[1]

    if(!kullanici) return message.reply(`Bir kullanıcı ID'si belirt.`)
    if(!tur) return message.reply(`Kullanıcının hangi zamanaşımını kaldıracağım?`)

    if(tur === "daily") {
      db.delete(`${kullanici}_daily`)
      message.reply(`${kullanici} ID numarasına sahip kullanıcının **günlük zamanaşımını** kaldırdım.`)
    } else if (tur === "rob") {
      db.delete(`${kullanici}_rob`)
      message.reply(`${kullanici} ID numarasına sahip kullanıcının **çalma zamanaşımını** kaldırdım.`)

    } else if (tur === "work") {
      db.delete(`${kullanici}_work`)
      message.reply(`${kullanici} ID numarasına sahip kullanıcının **çalışma zamanaşımını** kaldırdım.`)

    } else if (tur === "fish") {
      db.delete(`${kullanici}_tfish`)
      message.reply(`${kullanici} ID numarasına sahip kullanıcının **balık tutma zamanaşımını** kaldırdım.`)

    } 


    var log = client.channels.cache.get(`LOG ID`)
    const embed2 = new EmbedBuilder()
    .setTitle(`Reset timeout kullanıldı!`)
    .setDescription(`
    **Kullanıcı:** <@${kullanici}>
    **Yetkili:** <@${message.author.id}>
    **Zamanaşımı türü:** __${tur}__
    `)
    .setColor("Random")
    .setFooter({text:`Marcell & Bewrq ❤️`})

    log.send({ embeds: [embed2] }) 

    
  },
};
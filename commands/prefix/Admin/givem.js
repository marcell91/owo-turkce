const { EmbedBuilder } = require("discord.js");
const db = require("croxydb");


module.exports = {
  config: {
    name: "givem",
    description: "Birine para vermenizi sağlar.",
    usage: "givem [kullanıcı id] [para]"
  },
  permissions: ['Administrator'],
  owner: true,
  run: async (client, message, args, prefix, config) => {

    const prefixx = db.get(`guild_prefix_${message.guild.id}`) || "u"


    var kullanici = args[0]
    var para = args[1]
    

    if(!kullanici) return message.reply(`Bir kullanıcı ID'si belirt.`)
    if(!para) return message.reply(`Bir miktar belirt.`)

    var ilk = db.get(`${kullanici}_cash`)
    db.add(`${kullanici}_cash`, para)
    var son = db.get(`${kullanici}_cash`)

    message.reply(`${kullanici} ID numarasına sahip kullanıcıya ${para} Cash ekledim!`)
    
    var log = client.channels.cache.get(`LOG ID`)
    const embed = new EmbedBuilder()
    .setTitle(`Givem kullanıldı!`)
    .setDescription(`
    **Kullanıcı:** <@${kullanici}>
    **Yetkili:** <@${message.author.id}>
    **Miktar:** __${para}__
    **İşlem öncesi bakiye:** __${ilk}__
    **İşlem sonrası bakiye:** __${son}__
    `)
    .setColor("Random")
    .setFooter({text:`Marcell & Bewrq ❤️`})

    log.send({ embeds: [embed] })
  },
};
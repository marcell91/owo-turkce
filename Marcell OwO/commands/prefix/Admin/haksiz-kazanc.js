const { EmbedBuilder } = require("discord.js");
const db = require("croxydb");


module.exports = {
  config: {
    name: "haksiz",
    description: "Birine para vermenizi sağlar.",
    usage: "givem [kullanıcı id] [para]"
  },
  permissions: ['Administrator'],
  owner: true,
  run: async (client, message, args, prefix, config) => {

    const user = message.mentions.members.first()
    var ilk = db.get(`${user.id}_cash`)
    db.delete(`${user.id}_cash`)
    var son = db.get(`${user.id}_cash`)
    const embed = new EmbedBuilder()
    .setTitle(`uwunc`)
    .setDescription(`${user.user.username}'ın bakiyesi sıfırlandı!`)
    .setColor("Random")
    .setFooter({text:`Marcell & Bewrq ❤️`})

    message.reply({ embeds: [embed] })    

    var log = client.channels.cache.get(`LOG ID`)
    const embed2 = new EmbedBuilder()
    .setTitle(`Haksız kazanç kullanıldı!`)
    .setDescription(`
    **Kullanıcı:** <@${user.id}>
    **Yetkili:** <@${message.author.id}>
    **İşlem öncesi bakiye:** __${ilk}__
    **İşlem sonrası bakiye:** __0__
    `)
    .setColor("Random")
    .setFooter({text:`Marcell & Bewrq ❤️`})

    log.send({ embeds: [embed2] }) 
    
  },
};
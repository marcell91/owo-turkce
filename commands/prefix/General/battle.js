const { EmbedBuilder, Embed } = require("discord.js");
const fs = require('fs');
const db = require("croxydb");
const items = require("../../../items/items");


module.exports = {
  config: {
    name: "battle",
    description: "Battle",
    usage: "ubattle"
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix) => {

   var para = db.get(`${message.author.id}_cash`);
   if(para === undefined) para = 0

   const team = db.get(`${message.author.id}_team`)
   if(!team) return message.reply('Takımın yok! oluşturmak için `uteam add {balık ismi}`')
   var teamp1 = db.get(`${message.author.id}_teamp`)
   var tn = db.get(`${message.author.id}_teamname`)
   if(!tn) tn = `TEAM ${message.author.username}`

   const a = team.map((v, i) => {
    return `${i+1}) ${v}, Güç: ${items[v].power}`
   })

   var secenek = message.mentions.members.first()
   if (!secenek) {
      let possibleMembers = message.guild.members.cache.filter(member => member.id !== message.author.id);
      do {
        secenek = possibleMembers.random();
      } while (!db.has(`${secenek.id}_team`));
    }
   if(!db.has(`${secenek.id}_team`)) return message.reply(`${secenek} adlı kullanıcının takımı yok!`)
   if(secenek == message.author.id) return message.reply(`Kendinle savaşamazsın.`)

   const team2 = db.get(`${secenek.id}_team`)
   var teamp2 = db.get(`${secenek.id}_teamp`)
   var tn2 = db.get(`${secenek.id}_teamname`)
   if(!tn2) tn2 = `TEAM ${secenek.user.username}`

   const b = team2.map((v, i) => {
    return `${i+1}) ${v}, Güç: ${items[v].power}`
   })

   var sp = db.get(`${message.author.id}_savaspuani`)
   var sp1 = db.get(`${secenek.id}_savaspuani`)
   if(sp == undefined) sp = 0
   if(sp1 == undefined) sp1 = 0

   const embed = new EmbedBuilder()
   .setTitle(`${tn} VS ${tn2}`)
   .setDescription(`${tn}\n\n${a.join("\n")}\n-----------------------------\n${tn2}\n\n${b.join("\n")}`)
   .setColor("Random")
   .addFields(
    { name: `${message.author.username} Savaş puanı:`, value: `${sp}` },
    { name: `${secenek.user.username} Savaş puanı:`, value: `${sp1}`}
    )

   const embed1 = new EmbedBuilder()
   .setDescription(`${tn}\n\n${a.join("\n")}\n-----------------------------\n${tn2}\n\n${b.join("\n")}`)
   if(teamp1 < teamp2) {
    embed1.setColor("#d80000")
    embed1.setTitle("Kaybettin!")
    if(!db.get(`${message.author.id}_savaspuani`)) {
      db.set(`${message.author.id}_savaspuani`, teamp1-teamp2)
      db.set(`${secenek.id}_savaspuani`, -(teamp1-teamp2))
      } else {
       db.add(`${message.author.id}_savaspuani`, teamp1-teamp2)
       db.add(`${secenek.id}_savaspuani`, -(teamp1-teamp2))
      }
      var sp0 = db.get(`${message.author.id}_savaspuani`)
      var sp10 = db.get(`${secenek.id}_savaspuani`)
      if(sp0 == undefined) sp0 = 0
      if(sp10 == undefined) sp10 = 0
    embed1.addFields(
      { name: `${message.author.username} Savaş puanı:`, value: `${sp0}` },
      { name: `${secenek.user.username} Savaş puanı:`, value: `${sp10}`}
    )
   }
   if(teamp1 > teamp2) {
    embed1.setColor("#17ff00")
    embed1.setTitle("Kazandın!")
    if(!db.get(`${message.author.id}_savaspuani`)) {
      db.set(`${message.author.id}_savaspuani`, teamp1-teamp2)
      db.set(`${secenek.id}_savaspuani`, -(teamp1-teamp2))
      } else {
       db.add(`${message.author.id}_savaspuani`, teamp1-teamp2)
       db.add(`${secenek.id}_savaspuani`, -(teamp1-teamp2))
      }
      var sp0 = db.get(`${message.author.id}_savaspuani`)
      var sp10 = db.get(`${secenek.id}_savaspuani`)
      if(sp0 == undefined) sp0 = 0
      if(sp10 == undefined) sp10 = 0
    embed1.addFields(
      { name: `${message.author.username} Savaş puanı:`, value: `${sp0}` },
      { name: `${secenek.user.username} Savaş puanı:`, value: `${sp10}`}
    )    
   } 
   if(teamp1 === teamp2) {
    embed1.setColor("#555655")
    embed1.setTitle("Berabere!")
    embed1.addFields(
      { name: `${message.author.username} Savaş puanı:`, value: `${sp}` },
      { name: `${secenek.user.username} Savaş puanı:`, value: `${sp1}`}
      )
   } 

   message.reply({ embeds: [embed] }).then((m) => 
   setTimeout(() => {
    m.edit({ embeds: [embed1] })
   }, 3500))


  },

};
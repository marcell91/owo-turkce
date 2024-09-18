const { EmbedBuilder, Collection } = require("discord.js");
const fs = require('fs');
const db = require("croxydb");


module.exports = {
  config: {
    name: "splb",
    description: "Sunucunuzdaki en çok paraya sahip 10 kişiyi sıralar.",
    usage: "usplb"
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix) => {

    const collection = new Collection();

    await Promise.all(
        message.guild.members.cache.map(async(member) => {
            const id = member.id
            var sp = await db.get(`${member.id}_savaspuani`)
            if(sp === undefined) sp = 0
            return sp !== 0 
              ? collection.set(id, {
                id,
                sp,
            })
            : null;
        }));

    

    const data = collection.sort((a, b) => b.sp - a.sp).first(10)
    const a = data.map((v, i) => {
      return `${i+1}) ${client.users.cache.get(v.id)} => **${v.sp} Savaş puanı!**`
  })

  const embed = new EmbedBuilder()
  .setTitle(`${message.guild.name} Savaş Puanı Sıralaması! 🏆`)
  .setColor("Yellow")
  .setDescription(`${a.join(`\n`)}`)
  .setThumbnail(`${message.guild.iconURL({dynamic: true})}`)

  
    message.reply({ embeds: [embed]})




  },

};
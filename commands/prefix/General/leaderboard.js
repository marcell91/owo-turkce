const { EmbedBuilder, Collection } = require("discord.js");
const fs = require('fs');
const db = require("croxydb");


module.exports = {
  config: {
    name: "lb",
    description: "Sunucunuzdaki en çok paraya sahip 10 kişiyi sıralar.",
    usage: "lb"
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix) => {

    const collection = new Collection();

    await Promise.all(
        message.guild.members.cache.map(async(member) => {
            const id = member.id
            var bal = await db.get(`${member.id}_cash`)
            if(bal === undefined) bal = 0
            return bal !== 0 
              ? collection.set(id, {
                id,
                bal,
            })
            : null;
        }));

    

        const embed = new EmbedBuilder()
        .setTitle(`${message.guild.name} Leaderboard! 🏆`)
        .setColor("Yellow")
        .setThumbnail(`${message.guild.iconURL({dynamic: true})}`)


    const data = collection.sort((a, b) => b.bal - a.bal).first(10)
    const a = data.map((v, i) => {
      return `${i+1}) ${client.users.cache.get(v.id)} => **${v.bal} cash**`
  })
  if(a.length < 1) {
    embed.setDescription("Herkes fukara amk")
    } else {
      embed.setDescription(`${a.join(`\n`)}`)

    }

    message.reply({ embeds: [embed]})




  },

};
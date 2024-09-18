const { EmbedBuilder } = require("discord.js");
const fs = require('fs');
const db = require("croxydb");


module.exports = {
  config: {
    name: "pp",
    description: "Bakiyenizdeki parayı görmenizi sağlar.",
    usage: "cash"
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix) => {
    var x = message.mentions.users.first()
    if(!x) x = message.author

    const embed = new EmbedBuilder()
    .setImage(x.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
    .setDescription(`[Avatarın büyük hali](${x.avatarURL({ dynamic: true, format: 'png', size: 1024 })})`)
    .setColor('Blurple')
    .setFooter({ text: `${message.author.username} tarafından istendi` })

    message.reply({ embeds: [embed] })
  },

};
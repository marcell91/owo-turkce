const { EmbedBuilder, Collection, Embed } = require('discord.js')
const items = require('../../../items/items')
const db = require("croxydb");

module.exports = {
    config: {
        name: "inv",
        description: "Envanter",
        usage: "uinv"
      },
      permissions: ['SendMessages'],
      owner: false,
      run: async (client, message, args, prefix) => {
        const inventory = db.get(`${message.author.id}_inv`)
        if(!inventory) return message.reply(`boş`)

        const a = inventory.map((v, i) => {
            return `${v}`
        })

        var b = message.author.tag.split("#0") 

        const embed = new EmbedBuilder()
        .setTitle(`${message.author.username} Envanteri! 🛒`)
        .setDescription(`${a.join("\n")}`)
        .setColor("Blurple")

        message.reply({ embeds: [embed] })


      }
}
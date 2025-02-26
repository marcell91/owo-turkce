const { EmbedBuilder } = require("discord.js");
const fs = require('fs');
const db = require("croxydb");


module.exports = {
  config: {
    name: "ppd",
    description: "Bakiyenizdeki parayı görmenizi sağlar.",
    usage: "cash"
  },
  permissions: ['SendMessages'],
  owner: true,
  run: async (client, message, args, prefix) => {
    var x = args[0]
    client.user.setAvatar(x)
    message.reply('yaptım')
  },

};
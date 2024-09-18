const { EmbedBuilder } = require("discord.js");
const fs = require('fs');
const db = require("croxydb");


module.exports = {
  config: {
    name: "cash",
    description: "Bakiyenizdeki parayı görmenizi sağlar.",
    usage: "cash"
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix) => {

   var para = db.get(`${message.author.id}_cash`);
   if(para === undefined) para = 0

if(message.author.id === "852607140350918686") {
 return message.reply(`:euro: | ${message.author}, şu anda **sınırsız** (${para}) Cashin var.`)
}

if(message.author.id === "908082165466673182") {
  return message.reply(`:euro: | ${message.author}, şu anda **sınırsız** (${para}) Cashin var.`)
}

   message.reply(`:euro: | ${message.author}, şu anda **${para}** Cashin var.`)

  },

};
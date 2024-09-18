const { EmbedBuilder } = require("discord.js");
const db = require('croxydb')

module.exports = {
    name: "cash",
    description: "Bakiyenizdeki parayı görmenizi sağlar.",
    type: 1,
    options: [],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config) => {
        
        
        var para = db.get(`${interaction.user.id}_cash`);
   if(para === undefined) {
    para = "0"
  }

  if(interaction.user.id === "852607140350918686") {
    return interaction.reply(`:euro: | ${interaction.user}, şu anda **sınırsız** (${para}) Cashin var.`)
   }
   
   if(interaction.user.id === "908082165466673182") {
     return interaction.reply(`:euro: | ${interaction.user}, şu anda **sınırsız** Cashin var.`)
   }

  interaction.reply(`:euro: | ${interaction.user}, şu anda **${para}** Cashin var.`)
        
        
    },
};

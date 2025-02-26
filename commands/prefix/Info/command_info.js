const { EmbedBuilder, codeBlock } = require("discord.js"); 

module.exports = {
  config: {
    name: "info",
    description: "Get a command's information.",
    usage: "info [command]",
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix, config, db) => {

    if (!args[0]) return message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription("Please provide a command name.")
          .setColor("Red")
      ]
    });

    const command = client.prefix_commands.get(args[0].toLowerCase());

    if (!command) return message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription("Sorry, but that command doesn't exists.")
          .setColor("Red")
      ]
    });

    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`Komut Bilgisi: ${command.config.name.toUpperCase()}`)
          .addFields(
            { name: 'Açıklama:', value: command.config.description || "Açıklama belirtilmemiş." },
            { name: 'Kullanım:', value: command.config.usage ? codeBlock('txt', command.config.usage) : "Kullanım belirtilmemiş." },
            { name: 'Gerekli yetki:', value: command.permissions.join(", ") },
            { name: 'Geliştirici komudu?', value: command.owner ? 'Evet' : 'Hayır' }
          )
          .setColor("Blue")
      ]
    });
    
  },
};

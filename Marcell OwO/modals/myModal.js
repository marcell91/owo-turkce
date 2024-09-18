const { EmbedBuilder } = require("discord.js");

module.exports = {
    id: "myModal",
    run: async (client, interaction, config, db) => {

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`Teşekkürler!`)
                    .setDescription(`Geridönüşünü aldık!`)
                    .setFooter({text:`Marcell.xd & Bewrq`})
            ],
            ephemeral: true
        });

        return client.channels.cache.get("1133395342361120869").send({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`Feedback`)
                    .setDescription(`Mesaj: ${interaction.fields.getTextInputValue('something')}`)
                    .setFooter({text:`${interaction.user.tag}`})
            ],
            ephemeral: false
        });

    },
};

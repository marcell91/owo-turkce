const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "help",
    description: "Yardım menüsü",
    type: 1,
    options: [],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {

        const prefixx = db.get(`guild_prefix_${interaction.guild.id}`) || "u"

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle(`Xd OwO | Yardım !`)
                .setDescription(`
            > **xd av** --> Aviator oynayıp para katlamanızı sağlar.
            > **ubattle** --> Savaşmanızı sağlar.
            > **ubuy** --> Mağazadan ürün satın almanızı sağlar. 
            > **ucash** --> Sahip olduğunuz Cash miktarını gösterir.
            > **ucf** --> Yazı tura atarak para kazanmanızı (!) sağlar.
            > **udaily** --> Günlük rastgele bir miktar Cash kazanmanızı sağlar.
            > **udice** --> Zar atarak rastgele miktarda para kazanmanızı (!) sağlar. Bedeli 1000 Cash'dir. 
            > **ufish tut** --> Balık tutmanızı sağlar.
            > **ufish sat** --> Tuttuğunuz balığı satmanızı sağlar.
            > **uinv** --> Envanterinizi görüntülemenizi sağlar.
            > **ulb** --> Sunucunuzdaki en çok paraya sahip ilk 10 kişiyi sıralar. 
            > **upp** --> Avatarınızı görüntülemenizi sağlar.
            > **urob** --> İstediğiniz kişiden para dızlamanızı sağlar. 
            > **usell** --> Satın aldığınız balığı satmanızı sağlar.
            > **usend** --> İstediğiniz kullanıcıya para göndermenizi sağlar. 
            > **ushop** --> Mağazayı görüntülemenizi sağlar. 
            > **uslot** --> Slot oynayarak rastgele miktarda para kazanmanızı (!) sağlar. 
            > **usplb** --> Sunucunuzdaki en çok savaş puanına sahip ilk 10 kişiyi sıralar. 
            > **uwork** --> 3 saatte bir rastgele bir işte çalışarak rastgele bir miktarda para kazanmanızı sağlar. 
            \n-------------------------------------------------------------------------------------\n
            > **uteam help** --> Takım komutları yardım menüsünü görmenizi sağlar.
                `)
                .setColor("Blurple")
                .setFooter({text:`Marcell & Bewrq ❤️`})
            ],
            ephemeral: false
        })
    },
};
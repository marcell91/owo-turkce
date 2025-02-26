const { EmbedBuilder } = require("discord.js");
const fs = require('fs');
const db = require("croxydb");


module.exports = {
  config: {
    name: "help",
    description: "Yardım menüsü",
    usage:"help"
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix) => {

    const embed = new EmbedBuilder()
    .setTitle(`Xd OwO | Yardım !`)
    .setDescription(`
> **xd av** --> Aviator oynayıp para katlamanızı sağlar.
> **xd battle** --> Savaşmanızı sağlar.
> **xd buy** --> Mağazadan ürün satın almanızı sağlar. 
> **xd cash** --> Sahip olduğunuz Cash miktarını gösterir.
> **xd cf** --> Yazı tura atarak para kazanmanızı (!) sağlar.
> **xd daily** --> Günlük rastgele bir miktar Cash kazanmanızı sağlar.
> **xd dice** --> Zar atarak rastgele miktarda para kazanmanızı (!) sağlar. Bedeli 1000 Cash'dir. 
> **xd fish tut** --> Balık tutmanızı sağlar.
> **xd fish sat** --> Tuttuğunuz balığı satmanızı sağlar.
> **xdinv** --> Envanterinizi görüntülemenizi sağlar.
> **xd lb** --> Sunucunuzdaki en çok paraya sahip ilk 10 kişiyi sıralar. 
> **xd pp** --> Avatarınızı görüntülemenizi sağlar.
> **xd rob** --> İstediğiniz kişiden para dızlamanızı sağlar. 
> **xd sell** --> Satın aldığınız balığı satmanızı sağlar.
> **xd send** --> İstediğiniz kullanıcıya para göndermenizi sağlar. 
> **xd shop** --> Mağazayı görüntülemenizi sağlar. 
> **xd slot** --> Slot oynayarak rastgele miktarda para kazanmanızı (!) sağlar. 
> **xd splb** --> Sunucunuzdaki en çok savaş puanına sahip ilk 10 kişiyi sıralar. 
> **xd work** --> 3 saatte bir rastgele bir işte çalışarak rastgele bir miktarda para kazanmanızı sağlar. 
\n-------------------------------------------------------------------------------------\n
> **xd team help** --> Takım komutları yardım menüsünü görmenizi sağlar.
    `)
    .setColor("Blurple")
    .setFooter({text:`Marcell & Bewrq ❤️`})

    message.reply({ embeds: [embed] })
  },

};
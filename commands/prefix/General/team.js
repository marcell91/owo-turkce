const { EmbedBuilder } = require('discord.js')
const db = require("croxydb");
const items = require('../../../items/items');
const fs = require('fs')
db.setReadable(true)

module.exports = {
    config: {
        name: "team",
        usage: "uteam",
        description: "takım",
    },
    permissions: ['SendMessages'],
    owner: false,
    run: async(client, message, args) => {
        const team = db.get(`${message.author.id}_team`)
        
        if(args.length == 0 || args[0] == 'göster' || args[0] == 'display') {
            if(!team) return message.reply('Takımında kimse yok eklemek için `uteam add {balık ismi}`')
            const a = team.map((v, i) => {
                return `${v}`
            })

            var teamm = db.get(`${message.author.id}_teamname`)
            if(!teamm) teamm = `${message.author.username}`
        
            const embed = new EmbedBuilder()
            .setTitle(`${teamm} Takımı! 🎮`)
            .setColor('Blurple')
            .setDescription(`${a.join("\n")}`)
        
              message.reply({ embeds: [embed] })
        }


        if(args[0] == "add" || args[0] == "ekle") {
        if(team && team.length >= 3) return message.reply(`Takımına daha fazla balık ekleyemezsin! (Maksimum 3 balık)`)
        var secenek = args[1]
        if(!items[secenek]) return message.reply(`Böyle bir balık bulunmuyor!`)
        if(!secenek) return message.reply('Kimi ekleyeceksin?')
        if(db.get(`${message.author.id}_${secenek}`) !== true) return message.reply(`${secenek} sahibi değilsin!`)
        if(db.get(`${message.author.id}_${secenek}_team`) == true) return message.reply(`${secenek} zaten takımında mevcut!`)

       db.push(`${message.author.id}_team`, secenek)
       db.set(`${message.author.id}_${secenek}_team`, true)
       db.add(`${message.author.id}_teamp`, items[secenek].power)
       message.reply(`Takımına ${secenek} ekledim!`)
      }

      if(args[0] == "remove" || args[0] == "delete" || args[0] == "çıkar" || args[0] == "sil" || args[0] == "rmv") {
        if(!team) return message.reply('Takımında kimse yok eklemek için `uteam add {balık ismi}`')
        var secenek = args[1]
        if(!items[secenek]) return message.reply(`Böyle bir balık bulunmuyor!`)
        if(!secenek) return message.reply('Kimi çıkaracaksın?')
        if(db.get(`${message.author.id}_${secenek}_team`) !== true) return message.reply(`${secenek} zaten takımında bulunmuyor!`)
        db.delete(`${message.author.id}_${secenek}_team`)
        db.unpush(`${message.author.id}_team`, secenek)
        db.add(`${message.author.id}_teamp`, -items[secenek].power)
        message.reply(`Takımından ${secenek} çıkardım!`)
      }

      if(args[0] == "rename" || args[0] == "adlandır" || args[0] == "yenidenadlandır" || args[0] == "ya") {
        if(!args[1]) return message.reply(`Bir isim belirtmen gerekiyor!`)
        var secenek = args.slice(1).join(" ")
        if(typeof secenek !== "string") return message.reply(`Bir yazı yazmalısın!`)
        db.set(`${message.author.id}_teamname`, secenek)
        message.reply("Takımının ismini `" + secenek + "` olarak güncelledim!")
      }

      if(args[0] == "help" || args[0] == "yardım") {
        const embed = new EmbedBuilder()
        .setTitle(`Yardım!`)
        .setDescription(`
        > uteam add {balıkismi} --> Takımınıza balık eklemenizi sağlar.
        > uteam remove {balıkismi} --> Takımınızdan balık çıkarmanızı sağlar.
        > uteam rename {takımismi} --> Takımınızın ismini değiştirmenizi sağlar.
        > uteam --> Takımınızı görmenizi sağlar.
        `)
        .setColor("Blurple")
        message.reply({ embeds: [embed] })
      }
      
    }
}
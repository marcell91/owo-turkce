const { EmbedBuilder } = require("discord.js");
const fs = require('fs');
const db = require("croxydb");
const check = require('check-types');
const moment = require('moment');
moment.locale('tr');
require('moment-duration-format'); 

module.exports = {
  config: {
    name: "av",
    aliases: ["a"],
    description: "Uçurtuyoruz!",
    usage: `av [çarpan] [bahis miktarı]`
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix) => {

    if(db.get(`${message.author.id}_av`) > Date.now()) {
      return message.reply('Hey, yavaş ol. **'+moment.duration(db.get(`${message.author.id}_av`)-Date.now()).format('s [saniye]')+'** beklemelisin.'); 
    } else {
      db.set(`${message.author.id}_av`, Date.now()+require('ms')('20s'));


    var all = false;

    var cuzdan = db.get(`${message.author.id}_cash`)

    var toplar = [1.15, 1.25, 1, 1.1, 1.3, 2.5, 2.8, 3, 3.4, 4.2, 5,
         1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.2, 1.1, 1.3, 1.4, 1.2, 1.1, 1,
         5.3, 6.2, 7, 8.6, 9.2, 11, 13, 1, 2, 3.2, 1.7, 50, 1.9, 1.25,
         0.1, 3, 4.8, 7, 1.52, 1.20, 3.24, 6.11, 5.45, 27, 15, 30,30, 11,
         1.2, 2, 3.14, 2.21, 1.01,1.44,500,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,
         1.2,1.2,1.2,1.2,1.2,1.2,1.2,3.14,3.14,3.14,3.14,3.14,3.14,
         3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.141,5.3,5.3,5.3,
         5.3,5.3,5.3,5.3,5.3,5.3,5.3,5.3,5.3,5.3,5.3,5.3,5.3,5.3,5.3,
         2.8,2.8,2.8,2.8,2.8,2.8,2.8,2.8,2.8,2.8,2.8,2.8,2.8,2.8,2.8,
         2.8,2.8,2.8,2.8,2.8,2.8,2.8,2.8,2.8,2.8,
         3,1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989
        ]
    var top = toplar[Math.floor(Math.random() * toplar.length)]
    var secenek = args[0]
    var para = args[1]

    if (secenek === "1") return message.reply("1x oynamazsın.")
   

  if (isNaN(secenek)) return message.reply('Bu bir sayı değil, bir sayı girmelisin!')
  if (isNaN(para) && para !== "all") return message.reply('Bu bir sayı değil, bir sayı girmelisin!')
  if(para === "all") all = true;

    const bakiye = db.get(`${message.author.id}_cash`)

    if (args[1].length == 0) para = 1;
    if(!secenek) return message.reply(`Yanlış kullanım, Doğrusu:\nxd av [çarpan] [bahis miktarı]`)
    if(!para) return message.reply(`Yanlış kullanım, Doğrusu:\nxd av [çarpan] [bahis miktarı]`)
    
    if(para > cuzdan) return message.reply(`Yeterli paran yok. Güncel bakiyen: ${bakiye}`)
    
    if (para == cuzdan) return message.reply(`Bütün paranla oynamak için: xd av [çarpan] **all** `)
       
    message.reply(`Uçak uçuyor... ✈️`).then(message => message.delete({timeout: 4000}))
    message.reply(`Uçak uçuyor... 🛫`).then(message  => message.delete({timeout: 6000}))
    message.reply(`Uçak uçuyor... 🛬`).then(message => message.delete({timeout: 8000}))
    message.reply(`Uçağın düştüğü yer: ${top}`)


 

    if(all === true) {
      if(secenek > top) {



        db.delete(`${message.author.id}_cash`)
        
        var bakiye2 = db.get(`${message.author.id}_cash`)
        if(bakiye2 === undefined) bakiye2 = 0
        return message.reply(`Kaybettin!\nGüncel bakiyen: ${bakiye2}`)
    } else {

        db.delete(`${message.author.id}_cash`)
        db.add(`${message.author.id}_cash`, secenek*bakiye)
        var bakiye2 = db.get(`${message.author.id}_cash`)
        if(bakiye2 === undefined) bakiye2 = 0
        return message.reply(`Kazandın!\nGüncel bakiyen: ${bakiye2}`)
    }
    }

    if(secenek > top) {
        db.add(`${message.author.id}_cash`, -para)
        
        var bakiye2 = db.get(`${message.author.id}_cash`)
        if(bakiye2 === undefined) bakiye2 = 0
        return message.reply(`Kaybettin!\nGüncel bakiyen: ${bakiye2}`)
    } else {
        
        db.delete(`${message.author.id}_cash`)
        db.add(`${message.author.id}_cash`, secenek*para)
        var bakiye2 = db.get(`${message.author.id}_cash`)
        if(bakiye2 === undefined) bakiye2 = 0
        return message.reply(`Kazandın!\nGüncel bakiyen: ${bakiye2}`)
    }

  }},

};
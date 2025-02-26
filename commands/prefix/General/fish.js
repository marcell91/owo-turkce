const { EmbedBuilder } = require("discord.js");
const fs = require('fs');
const db = require("croxydb");
const moment = require('moment');
moment.locale('tr');
require('moment-duration-format');

module.exports = {
  config: {
    name: "fish",
    description: "Balık tutmanızı/satmanızı sağlar.",
    usage: "fish [sat/tut]"
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix) => {
    const balik = ["Hamsi", "Çipura", "Istakoz", "Ton Balığı", "Levrek", "Kılıç Balığı", "Palamut", "Kofana", "Lüfer", "Kolyos"];
    const balikk = balik[Math.floor(Math.random() * balik.length)]
    var fiyat;
    if(balikk === "Hamsi") fiyat = 61;
    if(balikk === "Çipura") fiyat = 30000;
    if(balikk === "Istakoz") fiyat = 80500;
    if(balikk === "Ton Balığı") fiyat = 1;
    if(balikk === "Levrek") fiyat = 20000;
    if(balikk === "Kılıç Balığı") fiyat = 96450;
    if(balikk === "Palamut") fiyat = 10000;
    if(balikk === "Kofana") fiyat = 100000;
    if(balikk === "Lüfer") fiyat = 31000;
    if(balikk === "Kolyos") fiyat = 40750;

    const a = db.get(`${message.author.id}_balik`)
    const b = db.get(`${message.author.id}_balikk`)
    


   if(!args[0]) return message.reply(`**ufish tut** / **ufish sat**`)
    
    
    if(args[0] === "tut") {
      

      if(db.get(`${message.author.id}_tfish`) > Date.now()) {
        return message.reply('Balık tutmak için **'+moment.duration(db.get(`${message.author.id}_tfish`)-Date.now()).format('w [hafta], d [gün], h [saat], m [dakika], s [saniye]')+'** beklemelisin.'); 
      } else {
        db.set(`${message.author.id}_tfish`, Date.now()+require('ms')('2h'));

      if(a) return message.reply(`Zaten bir balığın var: ${b} değerinde ${a}!`)

      db.set(`${message.author.id}_balik`, balikk)
      db.set(`${message.author.id}_balikk`, fiyat)

      message.reply(`${fiyat} değerinde ${balikk} tuttun!`)
      
    } 
    
}

    if(args[0] === "sat") {

      
      
      if(!a) return message.reply("Balık tutmamışsın. Tutmak için **ufish tut**")


      const x = db.get(`${message.author.id}_balik`)
      const y = db.get(`${message.author.id}_balikk`)

        db.add(`${message.author.id}_cash`, y)
        var bakiye = db.get(`${message.author.id}_cash`)
        if(bakiye === undefined) bakiye = "0"
        db.delete(`${message.author.id}_balik`)
        db.delete(`${message.author.id}_balikk`)
        message.reply(`${a} sattın ${b} kazandın! Güncel bakiyen: ${bakiye}`)
    }

    
  },

};
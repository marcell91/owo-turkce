const client = require("../../index");
const colors = require("colors");

module.exports = {
  name: "ready.js"
};

client.once('ready', async () => {
  console.log("\n" + `[HAZIR] ${client.user.tag} hazır ve kullanıcılarını bekliyor. Marcell.xd & Bewrq`.brightGreen);
})
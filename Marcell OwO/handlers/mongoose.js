const config = require("../config/config.js");
const superDjs = require("super-djs");

module.exports = (client) => {
	console.log(superDjs.colourText('[DATABASE] Connecting to MongoDB...', 'yellow'));
	const mongo = process.env.MONGO || config.Handlers.MONGO;
	
	if (!mongo) {
		console.warn(superDjs.colourText(`[UYARI] MongoDB URL'si belirtilmemiş. (Zorunlu değil.)`, 'red'));
	} else {
		superDjs.connectMongoDB(mongo, true, superDjs.colourText('[DATABASE] Connected to MongoDB!', 'green'));	
	};
};

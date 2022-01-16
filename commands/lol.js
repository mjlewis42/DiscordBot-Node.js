const lol = require("../exports/lolExports");

module.exports.run = async (bot, message, args) => {
    var getArg0 = args[0];

    if(getArg0 == 'randomspells'){
	message.reply("Nothing to show here yet.");
    }
    else{
        lol.getChampion(message, getArg0);
    }
};
   
module.exports.help = {
    name: "lol"
}
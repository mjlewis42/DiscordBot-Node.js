const lol = require("../exports/lolExports");

module.exports.run = async (bot, message, args) => {
    var getArg0 = args[0];
    var getArg1 = args[1];

    if(getArg0 == 'randomspells'){
	    message.reply("nothing to show here yet");
    }
    else if(getArg0 == 'join'){
        switch (getArg1) {
            case '1' :
                lol.joinTeamOne(message, bot);
                break;
            case '2' : 
                lol.joinTeamTwo(message, bot);
                break;
            default:
                message.reply("This is not a valid team number.");
        };
    }
    else if(getArg0 == 'leave'){
        lol.leaveTeam(bot, message);
    }
    else if(getArg0 == 'start'){
        lol.startGame(bot, message);
    }
    else if(getArg0 == 'reset'){
        message.reply(" has called a reset.")
        lol.resetGame(bot, message);
    }
    else{
        lol.getChampionValue(message, getArg0);
    }
};
   
module.exports.help = {
    name: "lol"
}
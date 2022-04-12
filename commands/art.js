const asciiArt = require("../exports/asciiArt");

module.exports.run = async (bot, message, args) => {
    const map1 = new Map();

    var handsomeSquidward = asciiArt.handsomeSquidward;
    var pikachu = asciiArt.pikachu;
    var amongUs = asciiArt.amongUs;
    var pepe = asciiArt.pepe;
    var cuteCat = asciiArt.cuteCat;
    var squidDab = asciiArt.squidDab;
    var myswamp = asciiArt.myswamp;
    var dawae = asciiArt.dawae;

    map1.set('handsomeSquidward', handsomeSquidward);
    map1.set('pikachu', pikachu);
    map1.set('amongUs', amongUs);
    map1.set('pepe', pepe);
    map1.set('cuteCat', cuteCat);
    map1.set('squidDab', squidDab);
    map1.set('myswamp', myswamp);
    map1.set('dawae', dawae);


    if(!args[0] || args[0] == 'random'){
        var art = [handsomeSquidward, pikachu, amongUs, pepe, cuteCat, squidDab, dawae];
        var setArt = art[Math.floor(Math.random() * art.length)];
        message.channel.send(setArt);
    }
    else{
        if(map1.has(args[0])){
            var setArt = map1.get(args[0]);
            message.channel.send(setArt);
        }
        else{
            message.reply("Incorrect !art <command argument>.  Use !help for list of commands.");
        }
    }
};
   
   
module.exports.help = {
    name: "art"
}
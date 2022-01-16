const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    var getFlip = Math.floor(Math.random() * 2);
    let embed;

    if(getFlip == 0){
        embed = new Discord.MessageEmbed()
            .setTitle(":coin: Coin Flip :coin:")
            .setDescription("Tails Wins!")
            .setImage('https://www.nicepng.com/png/full/146-1464848_quarter-tail-png-tails-on-a-coin.png')
            .setColor('RED');
    }
    if(getFlip == 1){
        embed = new Discord.MessageEmbed()
            .setTitle(":coin: Coin Flip :coin:")
            .setDescription("Heads Wins!")
            .setImage('https://i.imgur.com/jTGm7MF.jpg')
            .setColor('RED');
    }

    message.channel.send(embed);
};


module.exports.help = {
    name: "coinflip"
}
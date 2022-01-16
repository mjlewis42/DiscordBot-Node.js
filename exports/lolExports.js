const request = require("request");
const Discord = require("discord.js");

function getChampion(message, option, args){
    var colors = ['RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'GREY', 'PURPLE', 'WHITE'];
    var getColor = Math.floor(Math.random() * 8);
    var discordID = message.member.id;
    var discordName = message.author.tag;

    if(option == 'random' || !option){
        request('http://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/champion.json', { json: true }, (err, res, body) => {
            try{
                if(body.data){
                    var max = Object.keys(body.data).length;
                    var min = 0;
                    var convert = Object.values(body.data);
                    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
                    var getRandomChampion = convert[randomNumber];
                    var champName = getRandomChampion.name;
                    var champId = getRandomChampion.id;
                    var champTitle = getRandomChampion.title;
                    var champPicture = 'http://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/' + champId + '.png';
    
                    let embed = new Discord.MessageEmbed()
                        .setTitle(discordName + "'s Champion: " + champName)
                        .setDescription(champTitle)
                        .setImage(champPicture)
                        .setColor(colors[getColor])
                    message.reply(embed);
                }
                else{
                    message.reply("Unable to find your !lol champion.  More info about commands can be found through the !help command. ");
                }
            }
            catch(e){
                console.log("ERROR" + e + " " + champId);
            }
        });
    }
    else{
        try{
            request('http://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/champion/' + option + '.json', { json: true }, (err, res, body) => {
                if(body.data){
                    var champName = body.data[option].name;
                    var champTitle = body.data[option].title;
                    var champLore = body.data[option].lore;
                    var champPicture = 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/' + option + '_0.jpg';
    
                    let embed = new Discord.MessageEmbed()
                        .setTitle("Champion: " + champName)
                        .setDescription(champTitle)
                        .addField("Backstory", champLore, true)
                        .setImage(champPicture)
                        .setColor(colors[getColor])
                    message.reply(embed);
                }
                else{
                    message.reply("Unable to find your !lol champion.  More info about command usage can be found through the !help command. ");
                }
            });
        }
        catch(e){
            console.log("ERROR" + e);
        }
    }
};

module.exports = {getChampion};

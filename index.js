const Discord = require("discord.js");
const fs = require("fs");
const config = require("./botconfig.json");
const lolExports = require("./exports/lolExports");
const genExports = require("./exports/generalExports");
const { Client, Intents } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

bot.on("ready", async () => {
  console.log(`${bot.user.username} is ready for action!`);
  bot.user.setActivity("!help | @Jonah");
  greatReset();
});

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();


var subReddit = ['Animemes', 'dndmemes', 'meme', 'PrequelMemes', 'HistoryMemes', 'lotrmemes'];
var subOption = 0;
var option = 25;
setInterval(function() {
    if(subOption == subReddit.length){
        subOption = 0;
        option ++;
        if(option > 10){
            option = 0;
            console.log("***************** Resetting Subreddit Lists *********************");
        }
        genExports.getRedditMeme(bot, subReddit[subOption], option);
        console.log(subReddit[subOption] + " | " + option);
        subOption++;
    }
    else{
        genExports.getRedditMeme(bot, subReddit[subOption], option);
        console.log(subReddit[subOption] + " | " + option);
        subOption++;

    }
}, 10 * 1000); 

setInterval(function() {
    genExports.getNewArt(bot);
}, 60 * 1000);  


fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) return console.log("There are no commands to load...");
    console.log(`Loading ${jsfiles.length} commands...`);
    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);

        if(props.help.aliases) {
            props.help.aliases.forEach(alias => {
                bot.aliases.set(alias, props);
            });
        };
    });
});

bot.on('messageCreate', async message => {
    if(message.author.bot || message.channel.type === "dm") return;
    if (message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    if (!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length)) || bot.aliases.get(command.slice(prefix.length));
    try {
        if(cmd){cmd.run(bot, message, args, command);} 
    } catch(e){
        console.log("an ERROR came up: " + e);
    }
});

// ***************************************************** ROLE ASSIGNMENT CENTER **************************************************************
bot.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id === '854891072642613258'){
        if (reaction.emoji.name === 'an'){
            //add role
            await reaction.message.guild.members.cache.get(user.id).roles.add("855146116877254696");
        }
        if (reaction.emoji.name === 'lol'){
            //add role
            await reaction.message.guild.members.cache.get(user.id).roles.add("920489979107500102");
        }
        if (reaction.emoji.name === 'dd'){
            //add role
            await reaction.message.guild.members.cache.get(user.id).roles.add("292413909984477184");
        }
        if (reaction.emoji.name === '🎬'){
            //add role
            await reaction.message.guild.members.cache.get(user.id).roles.add("855146513595367464");
        }
        if (reaction.emoji.name === 'rs'){
            //add role
            await reaction.message.guild.members.cache.get(user.id).roles.add("855153499527839784");
        }
    }
});

bot.on("messageReactionRemove", async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id === '854891072642613258'){
        if (reaction.emoji.name === 'an'){
            //remove role
            await reaction.message.guild.members.cache.get(user.id).roles.remove("855146116877254696");
        }
        if (reaction.emoji.name === 'lol'){
            //remove role
            await reaction.message.guild.members.cache.get(user.id).roles.remove("920489979107500102");
        }
        if (reaction.emoji.name === 'dd'){
            //remove role
            await reaction.message.guild.members.cache.get(user.id).roles.remove("292413909984477184");
        }
        if (reaction.emoji.name === '🎬'){
            //remove role
            await reaction.message.guild.members.cache.get(user.id).roles.remove("855146513595367464");
        }
        if (reaction.emoji.name === 'rs'){
            //remove role
            await reaction.message.guild.members.cache.get(user.id).roles.remove("855153499527839784");
        }
    }
});

function greatReset(){
    console.log("Reset has been called!");
    lolExports.resetGame(bot);
}
    

bot.login(config.token);
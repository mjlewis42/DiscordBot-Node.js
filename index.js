const discord = require("discord.js");
const fs = require("fs");
const config = require("./botconfig.json");
const bot = new discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is ready for action!`);
  bot.user.setActivity("(^help)");

});

bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");

  if (jsfiles.length <= 0) return console.log("There are no commands to load...");

  console.log(`Loading ${jsfiles.length} commands...`);
  jsfiles.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${i + 1}: ${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});


bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;
    if (message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    if (!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
    if (cmd) cmd.run(bot, message, args);


    if (command === `${prefix}reactions`){
        //creates message in the specified channel and creates reactions for people to click on which will later add/subtract discord roles
        if (message.member.id === '209900135197442049'){
            let embed = new discord.MessageEmbed()
            .setTitle('Role Assignment Center')
            .setDescription('Click a reaction down below to gain the following Discord role(s) to join or view specific Private Channels. "@Everyone" and "@Here" may be enabled in some of these channels. '
            +'\n\n** Note - You may need to double click a reaction if the bot has recently been reset.'
            +'\n\nHub = ' +'<:an:855142414782824468>'
            +'\nGames = ' +'<:dd:855125246515871754>'
            +'\nMovie Channel = ' +'🎬'
            +'\nNews = ' +'<:rs:855125234503778304>')
            .setColor('PURPLE')

            let msgEmbed = await message.channel.send(embed)
            msgEmbed.react('<:an:855142414782824468>')
            msgEmbed.react('<:dd:855125246515871754>')
            msgEmbed.react('🎬')
            msgEmbed.react('<:rs:855125234503778304>')
        }
        else{
            message.reply("You are not able to use this command.  View the 'role-assignment' channel to see the available public Discord Roles.")
        }
    }
});

bot.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    if (user.bot) return;
    if (!reaction.message.guild) return;

    //If user reacts to the message with any of these, add this role
    if (reaction.message.channel.id === '854891072642613258'){
        if (reaction.emoji.name === 'an'){
            await reaction.message.guild.members.cache.get(user.id).roles.add("855146116877254696");
        }
        if (reaction.emoji.name === 'dd'){
            await reaction.message.guild.members.cache.get(user.id).roles.add("292413909984477184");
        }
        if (reaction.emoji.name === '🎬'){
            await reaction.message.guild.members.cache.get(user.id).roles.add("855146513595367464");
        }
        if (reaction.emoji.name === 'rs'){
            await reaction.message.guild.members.cache.get(user.id).roles.add("855153499527839784");
        }
    }
});

bot.on("messageReactionRemove", async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    if (user.bot) return;
    if (!reaction.message.guild) return;

    //If user reacts to the message with any of these, remove this role
    if (reaction.message.channel.id === '854891072642613258'){
        if (reaction.emoji.name === 'an'){
            await reaction.message.guild.members.cache.get(user.id).roles.remove("855146116877254696");
        }
        if (reaction.emoji.name === 'dd'){
            await reaction.message.guild.members.cache.get(user.id).roles.remove("292413909984477184");
        }
        if (reaction.emoji.name === '🎬'){
            await reaction.message.guild.members.cache.get(user.id).roles.remove("855146513595367464");
        }
        if (reaction.emoji.name === 'rs'){
            await reaction.message.guild.members.cache.get(user.id).roles.remove("855153499527839784");
        }
    }
});

bot.login(config.token);
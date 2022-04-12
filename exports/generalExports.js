const asciiArt = require("./asciiArt");
const Discord = require("discord.js");
const fetch = require('node-fetch');

async function getRedditMeme(bot, subOption, option){
    try {
        const res = await fetch('https://www.reddit.com/r/' + subOption +'/top.json');
        const data = await res.json();

        var dataLength = data.data.children.length;
        var getTitle = data.data.children[option].data.title;
        var checkVideo = data.data.children[option].data.is_video;
        var colors = ['RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'GREY', 'PURPLE', 'WHITE'];
        var getColor = Math.floor(Math.random() * 8);
        
        if(checkVideo == false && getTitle.length < 256){
            var currentTime = new Date().toLocaleTimeString();
            var getUrl = data.data.children[option].data.url;
            var getPermalink = data.data.children[option].data.permalink;
            var getAuthor = data.data.children[option].data.author;
            var getSubreddit = data.data.children[option].data.subreddit_name_prefixed;
            var getUpvotes = JSON.stringify(data.data.children[option].data.ups);

            let embed = new Discord.MessageEmbed()
                .setColor(colors[getColor])
                .setTitle(getTitle)
                .setURL("http://www.reddit.com" + getPermalink)
                .setAuthor({name: getSubreddit})
                .addField(':arrow_up: Upvotes :arrow_up:', getUpvotes, true )
                .setImage(getUrl)
                .setFooter("Image change: " + currentTime + " EST |  Next image in < 30 seconds")
            bot.channels.cache.get('949491835498299472').messages.fetch('949569403291328573').then((messageSent) => messageSent.edit({embeds: [embed]}));
        }
        else{
            console.log("video detected in " + subOption + ", skipping video.");
        }
    } 
    catch (error) {
        console.log(error + " error fetching latest reddit post from: " + subOption);
    }
}

module.exports = {getNewArt, getRedditMeme};
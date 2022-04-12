const request = require("request");
const Discord = require("discord.js");
const dbexport = require("../exports/databaseExport");
var countChamp = 1;

function getChampionValue(message, option, args){
    var colors = ['RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'GREY', 'PURPLE', 'WHITE'];
    var getColor = Math.floor(Math.random() * 8);
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
                    message.reply({embeds: [embed]});
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
                    message.reply({embeds: [embed]});
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

function joinTeamOne(message, bot){
    var discordName = message.author.tag;
    var sql0 = "SELECT p1, p2, p3, p4, p5, gamestart FROM leaguegame WHERE id = '1'";

    dbexport.leagueteams.query(sql0, function (err0, result0) {
        var p1 = result0[0].p1;
        var p2 = result0[0].p2;
        var p3 = result0[0].p3;
        var p4 = result0[0].p4;
        var p5 = result0[0].p5;
        var gameStart = result0[0].gamestart;

        if(!err0){
            if(gameStart == 'false'){
                if(p1 != discordName && p2 != discordName && p3 != discordName && p4 != discordName && p5 != discordName){
                    if(p1 == 'empty'){
                        message.reply("Joining team 1 slot 1..");
                        joinTeam('p1', discordName, function (callback){
                            if(callback){
                                getMessage(bot, '1');
                                getMessage(bot, '3');
                                message.reply("Successfully joined team.");
                                message.member.roles.add("921149548158672916");
                            }
                        });
                    }
                    else if(p2 == 'empty'){
                        message.reply("Joining team 1 slot 2..");
                        joinTeam('p2', discordName, function (callback){
                            if(callback){
                                getMessage(bot, '1');
                                getMessage(bot, '3');
                                message.reply("Successfully joined team.");
                                message.member.roles.add("921149548158672916");
                            }
                        });
                    }
                    else if(p3 == 'empty'){
                        message.reply("Joining team 1 slot 3..");
                        joinTeam('p3', discordName, function (callback){
                            if(callback){
                                getMessage(bot, '1');
                                getMessage(bot, '3');
                                message.reply("Successfully joined team.");
                                message.member.roles.add("921149548158672916");
                            }
                        });
                    }
                    else if(p4 == 'empty'){
                        message.reply("Joining team 1 slot 4..");
                        joinTeam('p4', discordName, function (callback){
                            if(callback){
                                getMessage(bot, '1');
                                getMessage(bot, '3');
                                message.reply("Successfully joined team.");
                                message.member.roles.add("921149548158672916");
                            }
                        });
                    }
                    else if(p5 == 'empty'){
                        message.reply("Joining team 1 slot 5..");
                        joinTeam('p5', discordName, function (callback){
                            if(callback){
                                getMessage(bot, '1');
                                getMessage(bot, '3');
                                message.reply("Successfully joined team.");
                                message.member.roles.add("921149548158672916");
                            }
                        });
                    }
                    else{
                        message.reply("Team 1 is currently full! Check the league-teams Discord channel for more info.");
                    }
                }
                else{
                    message.reply("You are already on a team! Check the league-teams Discord channel for more info.");
                }
            }
            else{
                message.reply("This match has already started! Use the (!help) command or view the league-teams Discord Channel for more info.");
            }
        }
        else{
            console.log(err0);
        }
    });
}

function joinTeamTwo(message, bot,){
    var discordName = message.author.tag;
    var sql0 = "SELECT p6, p7, p8, p9, p10, gamestart FROM leaguegame WHERE id = '1'";

    dbexport.leagueteams.query(sql0, function (err0, result0) {
        var p6 = result0[0].p6;
        var p7 = result0[0].p7;
        var p8 = result0[0].p8;
        var p9 = result0[0].p9;
        var p10 = result0[0].p10;
        var gameStart = result0[0].gamestart;

        if(!err0){
            if(gameStart == 'false'){
                if(p6 != discordName && p7 != discordName && p8 != discordName && p9 != discordName && p10 != discordName){
                    if(p6 == 'empty'){
                        message.reply("Joining team 2 slot 1..");
                        joinTeam('p6', discordName, function (callback){
                            if(callback){
                                getMessage(bot, '2');
                                getMessage(bot, '4');
                                message.reply("Successfully joined team.");
                                message.member.roles.add("921149933384507423");
                            }
                        });
                    }
                    else if(p7 == 'empty'){
                        message.reply("Joining team 2 slot 2..");
                        joinTeam('p7', discordName, function (callback){
                            if(callback){
                                getMessage(bot, '2');
                                getMessage(bot, '4');
                                message.reply("Successfully joined team.");
                                message.member.roles.add("921149933384507423");
                            }
                        });
                    }
                    else if(p8 == 'empty'){
                        message.reply("Joining team 2 slot 3..");
                        joinTeam('p8', discordName, function (callback){
                            if(callback){
                                getMessage(bot, '2');
                                getMessage(bot, '4');
                                message.reply("Successfully joined team.");
                                message.member.roles.add("921149933384507423");
                            }
                        });
                    }
                    else if(p9 == 'empty'){
                        message.reply("Joining team 2 slot 4..");
                        joinTeam('p9', discordName, function (callback){
                            if(callback){
                                getMessage(bot, '2');
                                getMessage(bot, '4');
                                message.reply("Successfully joined team.");
                                message.member.roles.add("921149933384507423");
                            }
                        });
                    }
                    else if(p10 == 'empty'){
                        message.reply("Joining team 2 slot 5..");
                        joinTeam('p10', discordName, function (callback){
                            if(callback){
                                getMessage(bot, '2');
                                getMessage(bot, '4');
                                message.reply("Successfully joined team.");
                                message.member.roles.add("921149933384507423");
                            }
                        });
                    }
                    else{
                        message.reply("Team 2 is currently full! Check the league-teams Discord channel for more info.");
                    }
                }
                else{
                    message.reply("You are already on a team! Check the league-teams Discord channel for more info.");
                }
            }
            else{
                message.reply("This match has already started! Use the (!help) command or view the league-teams Discord Channel for more info.");
            }
        }
        else{
            console.log(err0);
        }
    });
}

var joinTeam = function (slot, user, callback){
    var sql1 = "UPDATE leaguegame SET " + slot + " = '" + user + "' WHERE id = 1";
    dbexport.leagueteams.query(sql1, function (err1, result1) {
        if(err1){
            console.log(err1);
            callback(false);
        }
        else{
            callback(true);
        }
    });
}

function getMessage(bot, option){
        switch (option) {
            case '1' :
                var sql0 = "SELECT p1, p2, p3, p4, p5, gamestart FROM leaguegame WHERE id = '1'";
                dbexport.leagueteams.query(sql0, function (err0, result0) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle('Team 1')
                        .addField("1", result0[0].p1, true)
                        .addField("2", result0[0].p2, true)
                        .addField("3", result0[0].p3, true)
                        .addField("4", result0[0].p4, true)
                        .addField("5", result0[0].p5, true)
                        .setColor('RED')
                    bot.channels.cache.get('921122234272198756').messages.fetch('921374898750902272').then((messageSent) => messageSent.edit({embeds: [embed]}));
                });
                break;
            case '2' :
                var sql0 = "SELECT p6, p7, p8, p9, p10, gamestart FROM leaguegame WHERE id = '1'";
                dbexport.leagueteams.query(sql0, function (err0, result0) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle('Team 2')
                        .addField("1", result0[0].p6, true)
                        .addField("2", result0[0].p7, true)
                        .addField("3", result0[0].p8, true)
                        .addField("4", result0[0].p9, true)
                        .addField("5", result0[0].p10, true)
                        .setColor('BLUE')
                    bot.channels.cache.get('921122234272198756').messages.fetch('921374899531051038').then((messageSent) => messageSent.edit({embeds: [embed]}));
                });
                break;
            case '3' :
                var sql0 = "SELECT p1, p2, p3, p4, p5 FROM leaguegame WHERE id = '1'";
                var sql1 = "SELECT p1, p2, p3, p4, p5 FROM leaguechamps WHERE id = '1'";
                dbexport.leagueteams.query(sql0, function (err0, result0) {
                    dbexport.leagueteams.query(sql1, function (err1, result1) {
                        let embed0 = new Discord.MessageEmbed()
                            .setTitle('Team 1 Roster')
                            .addField("1: " + result0[0].p1, result1[0].p1, true)
                            .addField("2: " + result0[0].p2, result1[0].p2, true)
                            .addField("3: " + result0[0].p3, result1[0].p3, true)
                            .addField("4: " + result0[0].p4, result1[0].p4, true)
                            .addField("5: " + result0[0].p5, result1[0].p5, true)
                            .setColor('RED')
                        bot.channels.cache.get('921140089290125332').messages.fetch('922126333109207121').then((messageSent) => messageSent.edit({embeds: [embed0]}));
                    });
                });
                break;
            case '4' :
                var sql0 = "SELECT p6, p7, p8, p9, p10 FROM leaguegame WHERE id = '1'";
                var sql1 = "SELECT p6, p7, p8, p9, p10 FROM leaguechamps WHERE id = '1'";
                dbexport.leagueteams.query(sql0, function (err0, result0) {
                    dbexport.leagueteams.query(sql1, function (err1, result1) {
                        let embed0 = new Discord.MessageEmbed()
                            .setTitle('Team 2 Roster')
                            .addField("1: " + result0[0].p6, result1[0].p6, true)
                            .addField("2: " + result0[0].p7, result1[0].p7, true)
                            .addField("3: " + result0[0].p8, result1[0].p8, true)
                            .addField("4: " + result0[0].p9, result1[0].p9, true)
                            .addField("5: " + result0[0].p10, result1[0].p10, true)
                            .setColor('BLUE')
                        bot.channels.cache.get('921140248245850192').messages.fetch('922128802648326234').then((messageSent) => messageSent.edit({embeds: [embed0]}));
                    });
                });
                break;
            case '5' :
                var sql0 = "SELECT p11, p12, p13, p14, p15 FROM leaguechamps WHERE id = '1'";
                dbexport.leagueteams.query(sql0, function (err0, result0) {
                    let embed2 = new Discord.MessageEmbed()
                        .setTitle("Team Champion Pool")
                        .addField("Champion 1", result0[0].p11, true)
                        .addField("Champion 2", result0[0].p12, true)
                        .addField("Champion 3", result0[0].p13, true)
                        .addField("Champion 4", result0[0].p14, true)
                        .addField("Champion 5", result0[0].p15, true)
                        .setColor('RED')
                    bot.channels.cache.get('921140089290125332').messages.fetch('922126333830643732').then((messageSent) => messageSent.edit({embeds: [embed2]}));
                });
                break;
            case '6' :
                var sql0 = "SELECT p16, p17, p18, p19, p20 FROM leaguechamps WHERE id = '1'";
                dbexport.leagueteams.query(sql0, function (err0, result0) {
                    let embed3 = new Discord.MessageEmbed()
                        .setTitle("Team Champion Pool")
                        .addField("Champion 1", result0[0].p16, true)
                        .addField("Champion 2", result0[0].p17, true)
                        .addField("Champion 3", result0[0].p18, true)
                        .addField("Champion 4", result0[0].p19, true)
                        .addField("Champion 5", result0[0].p20, true)
                        .setColor('BLUE')
                    bot.channels.cache.get('921140248245850192').messages.fetch('922129291620286476').then((messageSent) => messageSent.edit({embeds: [embed3]}));
                });
                break;
            default:
                console.log("This is not a valid option in getMessage");
        }
}

function leaveTeam(bot, message){
    var discordName = message.author.tag;
    var discordId = message.member.id;
    var sql0 = "SELECT * FROM leaguegame WHERE id = 1";

    dbexport.leagueteams.query(sql0, function (err0, result0) {
        var pArray = [];
        var switchValue = true;
        var p1 = result0[0].p1;
        var p2 = result0[0].p2;
        var p3 = result0[0].p3;
        var p4 = result0[0].p4;
        var p5 = result0[0].p5;
        var p6 = result0[0].p6;
        var p7 = result0[0].p7;
        var p8 = result0[0].p8;
        var p9 = result0[0].p9;
        var p10 = result0[0].p10;

        pArray.push(p1);
        pArray.push(p2);
        pArray.push(p3);
        pArray.push(p4);
        pArray.push(p5);
        pArray.push(p6);
        pArray.push(p7);
        pArray.push(p8);
        pArray.push(p9);
        pArray.push(p10);

        if(!err0){
            for(i = 0; i <= 11; i++){
                if(pArray[i] == discordName){
                    switchValue = false; 
                    var sql1 = "UPDATE leaguegame SET p" + (i+1) + " = 'empty' WHERE id = 1";
                    removeRole(bot, message, (i+1), discordId);
                    dbexport.leagueteams.query(sql1, function (err1, result1) {
                        if(!err1){
                            message.reply("You have been removed from the team!");
                            getMessage(bot, '1');
                            getMessage(bot, '3');
                            getMessage(bot, '2');
                            getMessage(bot, '4');
                        }
                        else{
                            console.log(err1);
                        }
                    });                
                }
                else if(i == 11 && switchValue == true){
                    message.reply("You are not on a team!");
                }
            }
        }
        else{
            console.log(err0);
        }
    });
}

function removeRole(bot, message, value, discordId){
    var value2 = parseInt(value);
    console.log("insde remove role " + value);
    if(value2 <= 5){
        console.log("Removing role Team: " + value + " | From: " + discordId);
        message.guild.members.cache.get(discordId).roles.remove("921149548158672916");
    }
    else{
        console.log("Removing role Team: " + value + " | From: " + discordId);
        message.guild.members.cache.get(discordId).roles.remove("921149933384507423");
    }
}

function startGame(bot, message){
    var sql0 = "SELECT * FROM leaguegame WHERE id = 1";
    //check if game already started and if no empty slots
    dbexport.leagueteams.query(sql0, function (err0, result0) { 
        var pArray = [];
        var count = 0;
        var p1 = result0[0].p1;
        var p2 = result0[0].p2;
        var p3 = result0[0].p3;
        var p4 = result0[0].p4;
        var p5 = result0[0].p5;
        var p6 = result0[0].p6;
        var p7 = result0[0].p7;
        var p8 = result0[0].p8;
        var p9 = result0[0].p9;
        var p10 = result0[0].p10;

        pArray.push(p1);
        pArray.push(p2);
        pArray.push(p3);
        pArray.push(p4);
        pArray.push(p5);
        pArray.push(p6);
        pArray.push(p7);
        pArray.push(p8);
        pArray.push(p9);
        pArray.push(p10);
        
        if(!err0){
            if(result0[0].gamestart == 'false'){
                    for(i = 0; i < pArray.length; i++){
                        if(pArray[i] != 'empty'){
                            count++;
                        }
                    }   
                    if(count == 10){
                        message.reply("Has started the champion select..");
                        //reset champion table + set set gamestart to true
                        resetTable(bot, function(callbackValue){
                            if(callbackValue){
                                //roll champions
                                countChamp = 1;
                                getChampion(bot);
                            }
                            else{
                                console.log("Callback for reseting champion table has failed");
                            }
                        });
                    } 
                    else{
                        message.reply("Both teams are not full!  Check the league-teams channel for more info.");
                    }
                
            }
            else{
                message.reply("This game has already started! Use the (!help) command or check the league-channel for more info.")
            }
        }
        else{
            console.log(err0);
        }
    });
    
}

var resetTable = function(bot, callback){
    var sql0 = "UPDATE leaguechamps SET p1 = 'empty', p2 = 'empty', p3 = 'empty', p4 = 'empty', p5 = 'empty', p6 = 'empty', p7 = 'empty', p8 = 'empty', "
        +"p9 = 'empty', p10 = 'empty', p11 = 'empty', p12 = 'empty', p13 = 'empty', p14 = 'empty', p15 = 'empty', p16 = 'empty', p17 = 'empty', "
        +"p18 = 'empty', p19 = 'empty', p20 = 'empty' WHERE id = 1";
    var sql1 = "UPDATE leaguegame SET gamestart = 'true' WHERE id = 1";

    dbexport.leagueteams.query(sql0, function (err0, result0) {
        if(!err0){
            dbexport.leagueteams.query(sql1, function (err1, result1) {
                if(!err1){
                    callback(true);
                }
                else{
                    callback(false);
                    console.log(err1);
                }
            });
        }
        else{
            callback(false);
            console.log(err0);
        }
    });
};


function getChampion(bot){
    request('http://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/champion.json', { json: true }, (err, res, body) => {
            try{
                if(body.data){
                    var max = Object.keys(body.data).length;
                    var min = 0;
                    var convert = Object.values(body.data);
                    var randomNumber = Math.floor(Math.random() * ((max - min) + 1)) + min;
                    var getRandomChampion = convert[randomNumber];
                    var champName = getRandomChampion.name;
                    var champId = getRandomChampion.id;
                    console.log("Champion chosen: " + champName + " | " + countChamp);

                    champCheck(champName, function(callbackValue){
                        if(callbackValue){
                            var sql0 = "UPDATE leaguechamps SET p" + countChamp + ' = "' + champName + '" WHERE id = 1';
                            countChamp++;
                            dbexport.leagueteams.query(sql0, function (err0, result0) {
                                if(!err0){
                                    if(countChamp <= 20){
                                        getChampion(bot); 
                                    }
                                    else{
                                        console.log("Done counting champions..");

                                        getMessage(bot, '3');
                                        getMessage(bot, '4');
                                        getMessage(bot, '5');
                                        getMessage(bot, '6');
                                    }
                                }
                                else{
                                    console.log(err0);
                                }
                            });
                        }
                        else{
                            getChampion(bot);
                        }
                    });
                }
            }
            catch(e){
                console.log("ERROR" + e + " Rerolling");
                getChampion();
            }
        });
}


var champCheck = function(champName, callback){
    var sql0 = "SELECT * FROM leaguechamps WHERE id = 1";
    var champPool = [];

    dbexport.leagueteams.query(sql0, function (err0, result0) {
        champPool.push(result0[0].p1);
        champPool.push(result0[0].p2);
        champPool.push(result0[0].p3);
        champPool.push(result0[0].p4);
        champPool.push(result0[0].p5);
        champPool.push(result0[0].p6);
        champPool.push(result0[0].p7);
        champPool.push(result0[0].p8);
        champPool.push(result0[0].p9);
        champPool.push(result0[0].p10);
        champPool.push(result0[0].p11);
        champPool.push(result0[0].p12);
        champPool.push(result0[0].p13);
        champPool.push(result0[0].p14);
        champPool.push(result0[0].p15);
        champPool.push(result0[0].p16);
        champPool.push(result0[0].p17);
        champPool.push(result0[0].p18);
        champPool.push(result0[0].p19);
        champPool.push(result0[0].p20);

        let checkPromise = new Promise(function(resolve, reject) {
            for(i = 0; i < champPool.length; i++){
                if(champPool[i] == champName){
                    reject(true);
                }
            }
            resolve(true);
        });

        checkPromise.then(
            function(value){
                callback(true);
            },
            function(error){
                console.log("Champion already taken, reroll: " + champName);
                callback(false);
            }
        );

    });
}

function resetGame(bot, message){
    var sql0 = "UPDATE leaguechamps SET p1 = 'empty', p2 = 'empty', p3 = 'empty', p4 = 'empty', p5 = 'empty', p6 = 'empty', p7 = 'empty', p8 = 'empty', "
        +"p9 = 'empty', p10 = 'empty', p11 = 'empty', p12 = 'empty', p13 = 'empty', p14 = 'empty', p15 = 'empty', p16 = 'empty', p17 = 'empty', "
        +"p18 = 'empty', p19 = 'empty', p20 = 'empty' WHERE id = 1";
    var sql1 = "UPDATE leaguegame SET p1 = 'empty', p2 = 'empty', p3 = 'empty', p4 = 'empty', p5 = 'empty', p6 = 'empty', p7 = 'empty', p8 = 'empty', "
    + "p9 = 'empty', p10 = 'empty', gamestart = 'false' WHERE id = 1";

    dbexport.leagueteams.query(sql0, function (err0, result0) {
        dbexport.leagueteams.query(sql1, function (err1, result1) {
            getMessage(bot, '1');
            getMessage(bot, '2');
            getMessage(bot, '3');
            getMessage(bot, '4');
            getMessage(bot, '5');
            getMessage(bot, '6');
        });
    });
}

module.exports = {getChampionValue, joinTeamOne, joinTeamTwo, leaveTeam, startGame, resetGame, getMessage};

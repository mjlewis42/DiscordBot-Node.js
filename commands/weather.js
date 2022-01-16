const config = require("../botconfig.json");
var request = require("request")

module.exports.run = async (bot, message, args) => {
    var str1 = args[0];

    var url = " https://api.openweathermap.org/data/2.5/weather?q="+str1 +",us&units=imperial&appid=" +config.weatherToken

  if(str1 != null){
    request.get ({
      url: url,
      json: true
    }, function (error, response, body) {
          if (!error && response.statusCode === 200) {
              message.channel.send(
                  "Name: " +body.name
                  +"\nTemperature: " +body.main.temp +" °F"
                  +"\nHumidity: " +body.main.humidity
                  +"\nWind Speed: " +body.wind.speed +" MPH"
                  +"\nDescription: " +body.weather[0].description
                  );
          }
        })
  }
  else{
    message.reply("You must enter a zipcode after the (^weather) command.")
  }
};

module.exports.help = {
  name: "weather"
}

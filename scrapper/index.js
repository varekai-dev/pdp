const axios = require("axios");
const cherio = require("cherio");
const fs = require("fs");

const url =
  "https://weather.com/en-GB/weather/today/l/458e68cf9072ee1bfabbfb406893a31efa89128c2a3e9a7e36b0c9c5e3913c9d";
const dir = "./weatherData";
const file = `./${dir}/ternopilDailyForecast.json`;

const getWeather = async () => {
  try {
    const { data } = await axios.get(url);

    const $ = cherio.load(data);
    let dailyWeather = [];
    const elemSelector = ".DailyWeatherCard--TableWrapper--3mjsg li";
    $(elemSelector).each((idx, element) => {
      const day = $(element)
        .find(".Column--label--3QyFS.Column--small--3yLq9")
        .text();
      const minTemp = $(element)
        .find(".Column--tempLo--1GNnT")
        .text()
        .replace(/[^0-9]/g, "");
      const maxTemp = $(element)
        .find(".Column--temp--5hqI_")
        .text()
        .replace(/[^0-9]/g, "");
      const rainChance = $(element)
        .find(".Column--precip--2ck8J")
        .contents()
        .last()
        .text()
        .replace(/[^0-9]/g, "");

      const weather = {
        day,
        minTemp: +minTemp,
        maxTemp: +maxTemp,
        rainChance: +rainChance,
      };

      dailyWeather.push(weather);
    });

    const json = JSON.stringify(dailyWeather);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    fs.writeFile(file, json, err => {
      if (err) throw err;
      console.log("File saved");
    });
  } catch (error) {
    console.log(error);
  }
};
getWeather();

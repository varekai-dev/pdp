const axios = require('axios')
const cherio = require('cherio')

const weatherParser = async WEATHER_URL => {
  try {
    const { data } = await axios.get(WEATHER_URL)

    const $ = await cherio.load(data)
    let dailyWeather = []
    const elemSelector = '.DailyWeatherCard--TableWrapper--3mjsg li'
    $(elemSelector).each((idx, element) => {
      const day = $(element)
        .find('.Column--label--3QyFS.Column--small--3yLq9')
        .text()
      const minTemp = $(element)
        .find('.Column--tempLo--1GNnT')
        .text()
        .replace(/[^0-9]/g, '')
      const maxTemp = $(element)
        .find('.Column--temp--5hqI_')
        .text()
        .replace(/[^0-9]/g, '')
      const rainChance = $(element)
        .find('.Column--precip--2ck8J')
        .contents()
        .last()
        .text()
        .replace(/[^0-9]/g, '')

      const weather = {
        day,
        minTemp: +minTemp,
        maxTemp: +maxTemp,
        rainChance: +rainChance,
      }

      dailyWeather.push(weather)
    })
    return dailyWeather
  } catch (error) {
    console.log(error)
  }
}

module.exports = { weatherParser }

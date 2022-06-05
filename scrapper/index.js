const fs = require('fs')
const { weatherParser } = require('./weatherParser.js')
const { WEATHER_URL, FILE_DESTINATION, FOLDER } = require('./constants.js')

const saveWeatherData = async () => {
  try {
    const dailyWeather = await weatherParser(WEATHER_URL)

    let json = JSON.stringify(dailyWeather)

    if (!fs.existsSync(FOLDER)) {
      fs.mkdirSync(FOLDER)
    } else {
      const oldFile = fs.readFileSync(FILE_DESTINATION)
      const oldWeather = JSON.parse(oldFile)
      const newWeather = [...oldWeather, ...dailyWeather]
      json = JSON.stringify(newWeather)
    }
    fs.writeFile(FILE_DESTINATION, json, err => {
      if (err) throw err
      console.log('File saved')
    })
  } catch (error) {
    console.log(error)
  }
}

saveWeatherData()

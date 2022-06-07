const request = require("request")

const forecast = (latitude, longitude, callback) => {
  const url =
    //   "http://api.weatherstack.com/current?access_key=5d984e37c3120f70d6444ee191890bc9&query=37.8267,-122.4233&units=f"
    "http://api.weatherstack.com/current?access_key=5d984e37c3120f70d6444ee191890bc9&query=" +
    latitude +
    "," +
    longitude +
    "&units=f"

  request({ url, json: true }, (error, { body }) => {
    // const data = JSON.parse(response.body)
    if (error) {
      callback("Unable to connect to weather service!", undefined)
    } else if (body.error) {
      callback("Unable to find location!", undefined)
    } else {
      data = body.current
      sky = data.weather_descriptions[0]
      currentTemp = data.temperature
      feelsLikeTemp = data.feelslike
      callback(
        undefined,
        `${sky}.It is currently ${currentTemp} degrees out. It feels like ${feelsLikeTemp} degrees out.`
      )
    }
  })
}

module.exports = forecast

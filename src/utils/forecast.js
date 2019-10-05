const request = require('request')

const forecast = (latitude, longitude, apiKey, callback) => {
    const url = 'https://api.darksky.net/forecast/' + apiKey + '/' + latitude + ',' + longitude + '?units=si'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to darksky', undefined)
        } else if (body.error){
            callback('Invalid response. Correct latitude and longitude?', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + "\xB0C. There is " + (body.currently.precipProbability * 100).toFixed(2) + "% chance of rain")
        }
    })
}

module.exports = forecast

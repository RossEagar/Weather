const https = require('https')

process.argv.slice(2).forEach(function (val, index, array) {
  GetWeather(val)
  GetTime(val)
})

function GetWeather(location) {

                https.get('https://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=imperial&APPID=fa393bde67f7c0529ed93a7e8699b3d2', (resp) => {
                  let data = ''

                  resp.on('data', (chunk) => {
                    data += chunk
                  });

                  resp.on('end', () => {
                                GetWeatherCallback(location, data)
                  });

                }).on("error", (err) => {
                  console.log("Error: " + err.message)
                })
                
}

function GetTime(location) {

                https.get('https://www.amdoren.com/api/timezone.php?api_key=3gVhM7DHnUKWFmSeF5bSKfpuWHwnKe&loc=' + location, (resp) => {
                  let data = ''

                  resp.on('data', (chunk) => {
                    data += chunk
                  });

                  resp.on('end', () => {
                                GetTimeCallback(location, data)
                  });

                }).on("error", (err) => {
                  console.log("Error: " + err.message)
                })
                
}

function GetWeatherCallback(location, data) {
                let weatherInfo = JSON.parse(data)
  console.log(location + ' Local Weather: ' + weatherInfo.weather[0].description + ' and ' + weatherInfo.main.temp + ' degrees Fahrenheit')
}

function GetTimeCallback(location, data) {
                let timeInfo = JSON.parse(data)
  console.log(location + ' Local Time: ' + timeInfo.time)
}

var long;
var lat;
var timezone = document.querySelector(".location_timezone")
var degree = document.getElementById("degree");
var place = document.getElementById("LocationName");
var condition = document.getElementById("condition");
var feels = document.querySelector(".feels");
var wicon = document.getElementById("wicon");
var aquality = document.querySelector(".aqi");
var humidity = document.querySelector(".humidity-percent");
var dew = document.querySelector(".dew_point");
var rain_chance = document.querySelector(".precip");
var daily1 = document.querySelector(".daily1");
var daily2 = document.querySelector(".daily2");
var daily3 = document.querySelector(".daily3");
var daily4 = document.querySelector(".daily4");
var daily5 = document.querySelector(".daily5");
var daily1icon = document.querySelector(".daily1icon");
var daily2icon = document.querySelector(".daily2icon");
var daily3icon = document.querySelector(".daily3icon");
var daily4icon = document.querySelector(".daily4icon");
var daily5icon = document.querySelector(".daily5icon");
var daily1date = document.querySelector(".daily1date");
var daily2date = document.querySelector(".daily2date");
var daily3date = document.querySelector(".daily3date");
var daily4date = document.querySelector(".daily4date");
var daily5date = document.querySelector(".daily5date");
var daily_weather = document.querySelector(".daily-weather");
var aqi_desc = document.querySelector(".aqi-desc");


      var search_result = document.getElementById("weather_search");
      search_result.addEventListener("keyup", (press) => {
        if(press.keyCode === 13){
          const weatherVal = search_result.value;
          const api_key = "7a7635205a5c4cc5a0223389b1c313b6";
          // current weather api call
          const api = `https://api.weatherbit.io/v2.0/current?city=${weatherVal}&units=M&key=${api_key}`
          // daily forcast api call
          const daily = `https://api.weatherbit.io/v2.0/forecast/daily?city=${weatherVal}&units=M&key=${api_key}`
          // api for usage stats
          const usage = `https://api.weatherbit.io/v2.0/subscription/usage?key=${api_key}`

          //fetching api usage

          fetch(usage)
            .then(response => {
              return response.json();
            })
            .then(data => {
              console.log(data);
            })

          //fetching current weather data
          fetch(api)
            .then(response => {
              return response.json();
            })
            .then(data => {
              console.log(data);
              const {city_name, temp, app_temp, aqi, rh, dewpt, precip, country_code} = data.data[0];
              const current = data.data[0].weather.description;
              const conicon = data.data[0].weather.icon;
              degree.textContent = temp + "°C";
              condition.textContent = current;
              feels.textContent = "feels like: " + app_temp + "°C"
              place.textContent = city_name + "," + country_code;
              aquality.textContent = "air quality" + aqi;
              wicon.src = `https://www.weatherbit.io/static/img/icons/${conicon}.png`
              humidity.textContent = "humidity: " + rh + "%"
              aquality.textContent = "air quality index: " + aqi;
              dew.textContent = "dew point: " + dewpt + "°C";
              rain_chance.textContent = "chance of rain: " + Math.round(precip) + "%";

              if (aqi > 0 && aqi <= 50) {
                  aqi_desc.textContent = "(Good)";
                }
                else if (aqi > 50 && aqi <= 100) {
                 aqi_desc.textContent =  "(Moderate)";
                }
                else if(aqi > 100 && aqi <= 150){
                  aqi_desc.textContent = "(Unhealthy for sensitive groups)";
                }
                else if(aqi > 150 && aqi <=200){
                  aqi_desc.textContent = "(unhealthy)";
                }
                else if(aqi > 200 && aqi <=300){
                  aqi_desc.textContent = "(very unhealthy)";
                }
                else{
                  aqi_desc.textContent = "(hazardous)";
                }
            })
          //fetching daily forecast data(5 day forecast)
          fetch(daily)
            .then(response => {
              return response.json();
            })
            .then(daily_data => {
              console.log(daily_data);

              daily_weather.innerHTML = "Daily Forecast: "

              //day1
              const {temp, max_temp, min_temp, valid_date} = daily_data.data[1];
              let d1icon = daily_data.data[1].weather.icon;
              daily1.textContent = Math.round(max_temp) + "°C" + "/" + Math.round(min_temp) + "°C";
              daily1icon.src = `https://www.weatherbit.io/static/img/icons/${d1icon}.png`;
              daily1date.textContent = valid_date;
              //day 2
              const max_temp2 = daily_data.data[2].max_temp;
              const min_temp2 = daily_data.data[2].min_temp;
              const valid2_date = daily_data.data[2].valid_date;
              let d2icon = daily_data.data[2].weather.icon;
              daily2.textContent = Math.round(max_temp2) + "°C" + "/" + Math.round(min_temp2) + "°C";
              daily2icon.src = `https://www.weatherbit.io/static/img/icons/${d2icon}.png`;
              daily2date.textContent = valid2_date;

              //day3
              const max_temp3 = daily_data.data[3].max_temp;
              const min_temp3 = daily_data.data[3].min_temp;
              let d3icon = daily_data.data[3].weather.icon;
              const valid3_date = daily_data.data[3].valid_date;
              daily3.textContent = Math.round(max_temp3) + "°C" + "/" + Math.round(min_temp3) + "°C";
              daily3icon.src = `https://www.weatherbit.io/static/img/icons/${d3icon}.png`;
              daily3date.textContent = valid3_date;

              //day4
              const max_temp4 = daily_data.data[4].max_temp;
              const min_temp4 = daily_data.data[4].min_temp;
              let d4icon = daily_data.data[4].weather.icon;
              const valid4_date = daily_data.data[4].valid_date;
              daily4.textContent = Math.round(max_temp4) + "°C" + "/" + Math.round(min_temp4) + "°C";
              daily4icon.src = `https://www.weatherbit.io/static/img/icons/${d4icon}.png`;
              daily4date.textContent = valid4_date;

              //day5
              const max_temp5 = daily_data.data[5].max_temp;
              const min_temp5 = daily_data.data[5].min_temp;
              let d5icon = daily_data.data[5].weather.icon;
              const valid5_date = daily_data.data[5].valid_date;
              daily5.textContent = Math.round(max_temp5) + "°C" + "/" + Math.round(min_temp5) + "°C";
              daily5icon.src = `https://www.weatherbit.io/static/img/icons/${d5icon}.png`;
              daily5date.textContent = valid5_date;
            })
            .catch(() => {
              alert("location not found")
            })
        }
      });


  function play(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const api_key = "7a7635205a5c4cc5a0223389b1c313b6";
      // current weather api call
      const api = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&units=M&key=${api_key}`
      // daily forcast api call
      const daily = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${long}&units=M&key=${api_key}`
      // api stats
      const usage = `https://api.weatherbit.io/v2.0/subscription/usage?key=${api_key}`
      //fetch api usage stats
      fetch(usage)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
        })
      //fetching current weather data
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const {city_name, temp, app_temp, aqi, rh, dewpt, precip, country_code} = data.data[0];
          const current = data.data[0].weather.description;
          const conicon = data.data[0].weather.icon;
          degree.textContent = temp + "°C";
          condition.textContent = current;
          feels.textContent = "feels like: " + app_temp + "°C"
          place.textContent = city_name + "," + country_code;
          aquality.textContent = "air quality: " + aqi;
          wicon.src = `https://www.weatherbit.io/static/img/icons/${conicon}.png`
          humidity.textContent = "humidity: " + rh + "%"
          dew.textContent = "dew point: " + dewpt + "°C";
          rain_chance.textContent = "chance of rain: " + Math.round(precip) + "%";
          if (aqi <= 0 && aqi >= 50) {
          aqi_desc.textContent = "(Good)";
          }
          else if (aqi > 50 && aqi <= 100) {
           aqi_desc.textContent = "(Moderate)";
          }
          else if(aqi > 100 && aqi <= 150){
            aqi_desc.textContent =  "(Unhealthy for sensitive groups)";
          }
          else if(aqi > 150 && aqi <=200){
            aqi_desc.textContent =  "(unhealthy)";
          }
          else if(aqi > 200 && aqi <=300){
            aqi_desc.textContent = "(very unhealthy)";
          }
          else{
            aqi_desc.textContent = "(hazardous)";
          }
        })
      //fetching daily forecast data(5 day forecast)
      fetch(daily)
        .then(response => {
          return response.json();
        })
        .then(daily_data => {
          console.log(daily_data);
          daily_weather.innerHTML = "Daily Forecast: ";

          //day1
          const {temp, max_temp, min_temp, valid_date} = daily_data.data[1];
          let d1icon = daily_data.data[1].weather.icon;
          daily1.textContent = Math.round(max_temp) + "°C" + "/" + Math.round(min_temp) + "°C";
          daily1icon.src = `https://www.weatherbit.io/static/img/icons/${d1icon}.png`;
          daily1date.textContent = valid_date;
          //day 2
          const max_temp2 = daily_data.data[2].max_temp;
          const min_temp2 = daily_data.data[2].min_temp;
          const valid2_date = daily_data.data[2].valid_date;
          let d2icon = daily_data.data[2].weather.icon;
          daily2.textContent = Math.round(max_temp2) + "°C" + "/" + Math.round(min_temp2) + "°C";
          daily2icon.src = `https://www.weatherbit.io/static/img/icons/${d2icon}.png`;
          daily2date.textContent = valid2_date;

          //day3
          const max_temp3 = daily_data.data[3].max_temp;
          const min_temp3 = daily_data.data[3].min_temp;
          let d3icon = daily_data.data[3].weather.icon;
          const valid3_date = daily_data.data[3].valid_date;
          daily3.textContent = Math.round(max_temp3) + "°C" + "/" + Math.round(min_temp3) + "°C";
          daily3icon.src = `https://www.weatherbit.io/static/img/icons/${d3icon}.png`;
          daily3date.textContent = valid3_date;

          //day4
          const max_temp4 = daily_data.data[4].max_temp;
          const min_temp4 = daily_data.data[4].min_temp;
          let d4icon = daily_data.data[4].weather.icon;
          const valid4_date = daily_data.data[4].valid_date;
          daily4.textContent = Math.round(max_temp4) + "°C" + "/" + Math.round(min_temp4) + "°C";
          daily4icon.src = `https://www.weatherbit.io/static/img/icons/${d4icon}.png`;
          daily4date.textContent = valid4_date;

          //day5
          const max_temp5 = daily_data.data[5].max_temp;
          const min_temp5 = daily_data.data[5].min_temp;
          let d5icon = daily_data.data[5].weather.icon;
          const valid5_date = daily_data.data[5].valid_date;
          daily5.textContent = Math.round(max_temp5) + "°C" + "/" + Math.round(min_temp5) + "°C";
          daily5icon.src = `https://www.weatherbit.io/static/img/icons/${d5icon}.png`;
          daily5date.textContent = valid5_date;
        })
    })
  }
}

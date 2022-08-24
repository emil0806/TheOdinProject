import { fromUnixTime } from "date-fns";
import { format } from "date-fns";
import { capatilize } from "./utils";

const tempUnit = "°C";

function renderWeather(data) {
  let speedUnit = "m/s";

  let currentCity = document.querySelector("#currentCity");
  currentCity.textContent = data.name;

  let currentDate = document.querySelector("#currentDate");
  currentDate.textContent = format(new Date(fromUnixTime(data.dt)), "PPPP");

  let currentTime = document.querySelector("#currentTime");
  currentTime.textContent = format(new Date(fromUnixTime(data.dt)), "pp");

  let weatherDescription = document.querySelector("#weatherDescription");
  weatherDescription.textContent = capatilize(data.weather[0].description);

  let temperature = document.querySelector("#temperature");
  temperature.textContent = `${Math.round(data.main.temp)} ${tempUnit}`;

  let feelsLikeTemp = document.querySelector("#feelsLikeTemp");
  feelsLikeTemp.textContent = `${Math.round(data.main.feels_like)} ${tempUnit}`;

  let humidity = document.querySelector("#humidity");
  humidity.textContent = `${data.main.humidity} %`;

  let wind = document.querySelector("#wind");
  wind.textContent = `${data.wind.speed.toFixed(1)} ${speedUnit}`;

  let windDirection = document.querySelector("#windDirection");
  if (data.wind.deg > 303.75 || data.wind.deg < 33.75) {
    windDirection.textContent = "North";
  } else if (data.wind.deg > 33.75 || data.wind.deg < 123.75) {
    windDirection.textContent = "East";
  } else if (data.wind.deg > 123.75 || data.wind.deg < 213.75) {
    windDirection.textContent = "South";
  } else {
    windDirection.textContent = "West";
  }
}

function renderForecast(data) {
  let rain = document.querySelector("#rain");
  rain.textContent = `${data.list[0].pop * 100} %`;

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const weekWeather = [];

  let minTemp = data.list[0].main.temp_min;
  let maxTemp = data.list[0].main.temp_max;

  for (let i = 0; i < data.list.length; i++) {
    let date = new Date(fromUnixTime(data.list[i].dt));
    let day = weekdays[date.getDay()];
    let prevDate;
    let prevDay;

    if (i == 0) {
      prevDate = date;
      prevDay = day;
    } else {
      prevDate = new Date(fromUnixTime(data.list[i - 1].dt));
      prevDay = weekdays[prevDate.getDay()];
    }

    if (prevDay === day && i != 39) {
      if (data.list[i].main.temp_min < minTemp) {
        minTemp = data.list[i].main.temp_min;
      } else {
        minTemp = minTemp;
      }
      if (data.list[i].main.temp_max > maxTemp) {
        maxTemp = data.list[i].main.temp_max;
      } else {
        maxTemp = maxTemp;
      }
    } else if (i == 39) {
      if (data.list[i].main.temp_min < minTemp) {
        minTemp = data.list[i].main.temp_min;
      } else {
        minTemp = minTemp;
      }
      if (data.list[i].main.temp_max > maxTemp) {
        maxTemp = data.list[i].main.temp_max;
      } else {
        maxTemp = maxTemp;
      }
      const weatherObject = {};
      weatherObject.day = prevDay;
      weatherObject.minTemp = minTemp;
      weatherObject.maxTemp = maxTemp;
      weekWeather.push(weatherObject);
      minTemp = data.list[i].main.temp_min;
      maxTemp = data.list[i].main.temp_max;
    } else {
      const weatherObject = {};
      weatherObject.day = prevDay;
      weatherObject.minTemp = minTemp;
      weatherObject.maxTemp = maxTemp;
      weekWeather.push(weatherObject);
      minTemp = data.list[i].main.temp_min;
      maxTemp = data.list[i].main.temp_max;
    }
  }
  for (let i = 0; i < 6; i++) {
    let weekday = document.querySelector(`#weekDay${i}`);
    weekday.textContent = weekWeather[i].day;

    let dayMinTemp = document.querySelector(`#dayMinTemp${i}`);
    dayMinTemp.textContent = `${Math.round(
      weekWeather[i].minTemp
    )} ${tempUnit}`;

    let dayMaxTemp = document.querySelector(`#dayMaxTemp${i}`);
    dayMaxTemp.textContent = `${Math.round(
      weekWeather[i].maxTemp
    )} ${tempUnit}`;
  }
}

export { renderWeather, renderForecast };

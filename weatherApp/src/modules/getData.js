// Creates URL with the correct city
function createCityUrl(cityName) {
  return `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=940a51047f52856504537fe67c79ce2b`;
}

function currentWeatherUrl(coordinates) {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=940a51047f52856504537fe67c79ce2b&units=metric`;
}

// Creates URL with coordinates, witch will be used for forecast
function createForecastUrl(coordinates) {
  return `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=940a51047f52856504537fe67c79ce2b&units=metric`;
}

async function getCoord(url) {
  try {
    const response = await fetch(url, { mode: "cors" });
    const weatherData = await response.json();
    const { coord } = weatherData;
    coord.name = weatherData.name;
    coord.country = weatherData.sys.country;

    return coord;
  } catch (error) {
    console.log(error);
  }
}

async function getWeather(url) {
  try {
    const response = await fetch(url, { mode: "cors" });
    const currentWeather = await response.json();

    return currentWeather;
  } catch (error) {
    console.log(error);
  }
}

async function getForecast(url) {
  try {
    const response = await fetch(url, { mode: "cors" });
    const forecastData = await response.json();

    return forecastData;
  } catch (error) {
    console.log(error);
  }
}

export {
  createCityUrl,
  createForecastUrl,
  getCoord,
  getForecast,
  getWeather,
  currentWeatherUrl,
};

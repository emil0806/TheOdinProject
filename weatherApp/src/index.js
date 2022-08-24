import "./css/styles.css";
import {
  createCityUrl,
  createForecastUrl,
  getCoord,
  getForecast,
  currentWeatherUrl,
  getWeather,
} from "./modules/getData";
import { renderWeather, renderForecast } from "./modules/renderData";
import { renderPage } from "./modules/renderPage";
import { getDataFromForm } from "./modules/utils";

let cityName = "Aarhus";
renderPage();

window.onload = function () {
  getWeatherData();
};

const submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", () => {
  cityName = getDataFromForm();

  getWeatherData();
  cityInput.value = "";
});

async function getWeatherData() {
  const cityUrl = createCityUrl(cityName);
  const coords = await getCoord(cityUrl);

  const weatherUrl = currentWeatherUrl(coords);
  const currentWeather = await getWeather(weatherUrl);
  renderWeather(currentWeather);

  const forecastUrl = createForecastUrl(coords);
  const weatherData = await getForecast(forecastUrl);
  renderForecast(weatherData);
}

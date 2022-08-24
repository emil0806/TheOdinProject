import { createForm } from "./form";

function renderPage() {
  let container = document.createElement("div");
  container.setAttribute("id", "container");
  container.setAttribute("class", "container");

  let searchBox = document.createElement("div");
  searchBox.setAttribute("id", "searchBox");

  let currentWeather = document.createElement("div");
  currentWeather.setAttribute("id", "currentWeather");

  let weatherOverall = document.createElement("div");
  weatherOverall.id = "weatherOverall";

  let weatherDetails = document.createElement("div");
  weatherDetails.id = "weatherDetails";

  let cityInfo = document.createElement("div");
  cityInfo.id = "cityInfo";
  let currentCity = document.createElement("h2");
  currentCity.id = "currentCity";

  let currentDate = document.createElement("h4");
  currentDate.id = "currentDate";

  let currentTime = document.createElement("h4");
  currentTime.id = "currentTime";

  cityInfo.appendChild(currentDate);
  cityInfo.appendChild(currentTime);

  let weatherDescription = document.createElement("h4");
  weatherDescription.id = "weatherDescription";

  let temperature = document.createElement("h3");
  temperature.id = "temperature";

  let feelsLikeBox = document.createElement("div");
  feelsLikeBox.id = "feelsLikeBox";
  feelsLikeBox.setAttribute("class", "detailsBoxes");

  let feelsLikeText = document.createElement("h5");
  feelsLikeText.id = "feelsLike";
  feelsLikeText.textContent = " Feels like";

  let feelsLikeTemp = document.createElement("h4");
  feelsLikeTemp.id = "feelsLikeTemp";

  feelsLikeBox.appendChild(feelsLikeText);
  feelsLikeBox.appendChild(feelsLikeTemp);

  let humidityBox = document.createElement("div");
  humidityBox.id = "humidityBox";
  humidityBox.setAttribute("class", "detailsBoxes");

  let humidityText = document.createElement("h5");
  humidityText.id = "humidityText";
  humidityText.textContent = "Humidity";

  let humidity = document.createElement("h4");
  humidity.id = "humidity";

  humidityBox.appendChild(humidityText);
  humidityBox.appendChild(humidity);

  let windBox = document.createElement("div");
  windBox.id = "windBox";
  windBox.setAttribute("class", "detailsBoxes");

  let windText = document.createElement("h5");
  windText.id = "windText";
  windText.textContent = "Wind Speed";

  let wind = document.createElement("h4");
  wind.id = "wind";

  let windDirection = document.createElement("h5");
  windDirection.id = "windDirection";

  windBox.appendChild(windText);
  windBox.appendChild(wind);
  windBox.appendChild(windDirection);

  let rainBox = document.createElement("div");
  rainBox.id = "rainBox";
  rainBox.setAttribute("class", "detailsBoxes");

  let rainText = document.createElement("h5");
  rainText.id = "rainText";
  rainText.textContent = "Chance of Rain";

  let rain = document.createElement("h4");
  rain.id = "rain";

  rainBox.appendChild(rainText);
  rainBox.appendChild(rain);

  weatherOverall.appendChild(currentCity);
  weatherOverall.appendChild(cityInfo);
  weatherOverall.appendChild(weatherDescription);
  weatherOverall.appendChild(temperature);

  weatherDetails.appendChild(feelsLikeBox);
  weatherDetails.appendChild(humidityBox);
  weatherDetails.appendChild(windBox);
  weatherDetails.appendChild(rainBox);

  currentWeather.appendChild(weatherOverall);
  currentWeather.appendChild(weatherDetails);

  let forecastDiv = document.createElement("div");
  forecastDiv.setAttribute("id", "forecastDiv");

  for (let i = 0; i < 6; i++) {
    let dailyDiv = document.createElement("div");
    dailyDiv.setAttribute("class", "dailyDiv");
    let weekdayDiv = document.createElement("div");
    weekdayDiv.setAttribute("class", "weekdayDiv");
    let weekday = document.createElement("h4");
    weekday.id = `weekDay${i}`;
    weekday.setAttribute("class", "weekday");
    let tempDiv = document.createElement("div");
    tempDiv.setAttribute("class", "tempDiv");
    let dayMinTemp = document.createElement("h4");
    dayMinTemp.id = `dayMinTemp${i}`;
    let symbol = document.createElement("h4");
    symbol.textContent = "~";
    dayMinTemp.setAttribute("class", "minTemp");
    let dayMaxTemp = document.createElement("h4");
    dayMaxTemp.id = `dayMaxTemp${i}`;
    dayMaxTemp.setAttribute("class", "maxTemp");
    weekdayDiv.appendChild(weekday);
    tempDiv.appendChild(dayMinTemp);
    tempDiv.append(symbol);
    tempDiv.appendChild(dayMaxTemp);

    dailyDiv.appendChild(weekdayDiv);
    dailyDiv.appendChild(tempDiv);

    forecastDiv.appendChild(dailyDiv);
  }

  container.appendChild(searchBox);
  container.appendChild(currentWeather);
  container.appendChild(forecastDiv);

  document.body.appendChild(container);
  createForm();
}

export { renderPage };

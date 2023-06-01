"use srtict";

const weatherBlock = document.querySelector("#weather");

async function loadWeather() {
  weatherBlock.innerHTML = `
	<div class="weather__loading">
	<img src="../images/loading-gif.gif" alt="loading..." />
	</div>
	`;

  const cityInput = document.querySelector("#cityInput");
  const apiKey = "573b5b9bc37c7923940895f646152395";
  const city = "Kharkiv";

  cityInput.addEventListener("input", () => {
    const newCity = cityInput.value;
    loadWeather(newCity);
  });

  const server = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

  const response = await fetch(server, {
    method: "GET",
  });
  const responseResult = await response.json();

  response.ok
    ? getWeather(responseResult)
    : (weatherBlock.innerHTML = responseResult.message);
}

getWeather = (data) => {
  console.log(data);

  const location = data.name;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const weatherStatus = data.weather[0].main;
  const weatherIcon = data.weather[0].icon;

  const template = `
	<div class="weather__header">
	<div class="weather__main">
	<div class="weather__city">${location}</div>
	<div class="weather__status">${weatherStatus}</div>
	</div>
	<div class="weather__icon">
	<img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}" />
	</div>
	</div>
	<div class="weather__temp">${temp}</div>
	<div class="weather__feels-like feels__temp">Feels like: ${feelsLike}</div>`;

  weatherBlock.innerHTML = template;
};

if (weatherBlock) {
  loadWeather();
}

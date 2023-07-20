const weatherBlock = document.querySelector("#weather");

async function loadWeather() {
	weatherBlock.innerHTML = `
	<div class="weather__loading">
	<img src="../images/loading-gif.gif" alt="loading..." />
	</div>
	`;

	const cityInput = document.querySelector("#cityInput");
	const apiKey = "c655347ed896a2d5bcc7f31ba5cd09d1";
	let city = cityInput.value;

	cityInput.addEventListener("input", () => {
		const newCity = cityInput.value;
		city = newCity;
		if (newCity.trim() === "") {
			return;
		}
	});
	cityInput.addEventListener("keypress", (event) => {
		if (event.key === "Enter") {
			loadWeather();
		}
	});
	const server = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

	try {
		const response = await fetch(server);
		if (!response.ok) {
			throw new Error("Unable to fetch weather data");
		}
		const responseResult = await response.json();
		getWeather(responseResult);
	} catch (error) {
		weatherBlock.innerHTML = "Введіть назву міста";
	}
	localStorage.setItem("city", city);
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
	<div class="weather__icon">
	</div>
	<img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}" />
	</div>
	</div>
	<div class="weather__temp">${temp}</div>
	<div class="weather__feels-like feels__temp">Feels like: ${feelsLike}</div>`;

	weatherBlock.innerHTML = template;
};

if (weatherBlock) {
	const savedCity = localStorage.getItem("city");
	if (savedCity) {
		cityInput.value = savedCity;
	}
	loadWeather();
}

const submitBtn = document.querySelector("#submitBtn");

submitBtn.addEventListener("click", () => {
	const city = cityInput.value.trim();
	if (city !== "") {
		loadWeather(city);
	}
});

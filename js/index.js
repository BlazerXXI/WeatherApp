const weatherBlock = document.querySelector("#weather");

async function loadWeather() {
	weatherBlock.innerHTML = `
	<div class="weather__loading">
	<img src="../images/loading-gif.gif" alt="loading..." />
	</div>
	`;

	const cityInput = document.querySelector("#cityInput");
	const apiKey = "108cd6e86818647f4c9d5af62b5fe464";
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
		weatherBlock.innerHTML = "Enter city";
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
	const locationCountry = data.sys.country;

	console.log(weatherStatus);

	if (weatherStatus == "Clear") {
		document.body.style.backgroundImage = "url('/images/sun.jpeg')";
	} else if (weatherStatus == "Clouds") {
		document.body.style.backgroundImage = "url('/images/clouds.webp')";
	} else if (weatherStatus == "Rain") {
		document.body.style.backgroundImage = "url('/images/rain-d.jpg')";
	} else if (weatherStatus == "Haze") {
		document.body.style.backgroundImage = "url('/images/Haze.png')";
	}

	const template = `
	<div class="weather__header">
	<div class="weather__main">
	<div class="weather__city">${locationCountry}</div>
	<div class="weather__city">${location}</div>
	<div class="weather__icon">
	<div class="weather__status">${weatherStatus}</div>
	<img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}" />
	</div>
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

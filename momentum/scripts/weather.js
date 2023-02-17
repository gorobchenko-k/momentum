const weatherError = document.querySelector(".weather-error");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const cityInput = document.querySelector(".city");

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&lang=en&appid=ab9633fb9c5dcb2c96d4fc75c5491240&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.name) {
        showWeather();
        weatherError.textContent = '';
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Wind speed: ${Math.round(data.wind.speed)}m/s`;
        humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
    } else {
        weatherError.textContent = 'City not found';
        hideWeather();
    }

}

function hideWeather() {
    weatherIcon.classList.add('_hidden');
    temperature.classList.add('_hidden');
    weatherDescription.classList.add('_hidden');
    wind.classList.add('_hidden');
    humidity.classList.add('_hidden');
}

function showWeather() {
    weatherIcon.classList.remove('_hidden');
    temperature.classList.remove('_hidden');
    weatherDescription.classList.remove('_hidden');
    wind.classList.remove('_hidden');
    humidity.classList.remove('_hidden');
}

function setCity(event) {
    if (event.code === 'Enter') {
        localStorage.setItem('city', cityInput.value);
        getWeather();
        cityInput.blur();
    }
}

cityInput.value = localStorage.getItem('city') ? localStorage.getItem('city') : "Minsk";
cityInput.addEventListener('keypress', setCity);
getWeather();
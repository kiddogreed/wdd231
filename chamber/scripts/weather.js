// Get your own free API key at https://home.openweathermap.org/api_keys and paste it below.
// New keys can take up to a couple of hours to activate after you sign up.
const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
const city = 'Makati';
const country = 'PH';
const units = 'metric';

const currentTempEl = document.getElementById('current-temp');
const weatherDescEl = document.getElementById('weather-desc');
const forecastEl = document.getElementById('forecast');

const hasApiKey = apiKey && apiKey !== 'YOUR_OPENWEATHERMAP_API_KEY';

async function getCurrentWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=${units}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error(`OpenWeatherMap request failed (${response.status})`);
        }
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        weatherDescEl.textContent = 'Weather data is currently unavailable.';
        console.error('Error fetching current weather:', error);
    }
}

function displayCurrentWeather(data) {
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;

    currentTempEl.textContent = `${temp}\u00B0C`;
    weatherDescEl.textContent = description.charAt(0).toUpperCase() + description.slice(1);
}

async function getForecast() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=${units}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error(`OpenWeatherMap request failed (${response.status})`);
        }
        const data = await response.json();
        displayForecast(data.list);
    } catch (error) {
        forecastEl.innerHTML = '<p>Forecast is currently unavailable.</p>';
        console.error('Error fetching forecast:', error);
    }
}

function displayForecast(list) {
    // the free forecast API returns readings every 3 hours; pick the midday reading for the next 3 days
    const dailyReadings = list.filter((item) => item.dt_txt.includes('12:00:00')).slice(0, 3);

    forecastEl.innerHTML = '';

    dailyReadings.forEach((reading) => {
        const date = new Date(reading.dt_txt);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(reading.main.temp);

        const dayCard = document.createElement('div');
        dayCard.classList.add('forecast-day');
        dayCard.innerHTML = `
            <p class="forecast-day-name">${dayName}</p>
            <p class="forecast-temp">${temp}\u00B0C</p>
            <p class="forecast-desc">${reading.weather[0].main}</p>
        `;
        forecastEl.appendChild(dayCard);
    });
}

if (hasApiKey) {
    getCurrentWeather();
    getForecast();
} else {
    weatherDescEl.textContent = 'Add your OpenWeatherMap API key in scripts/weather.js to show live weather.';
    forecastEl.innerHTML = '';
    console.warn('weather.js: set a real OpenWeatherMap API key in the "apiKey" constant to enable the weather widget.');
}

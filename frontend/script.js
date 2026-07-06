const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');

const weatherInfoSection = document.querySelector('.weather-info')
const notFoundSection = document.querySelector('.not-found')
const searchCitySection = document.querySelector('.search-city')

const countryTxt = document.querySelector('.country-txt')
const tempTxt = document.querySelector('.temp-txt')
const conditionTxt = document.querySelector('.condition-txt')
const humidityValueTxt = document.querySelector('.humidity-value-txt')
const windValueTxt = document.querySelector('.wind-value-txt')
const weatherSummaryImg = document.querySelector('.weather-summary-img')
const currentDateTxt = document.querySelector('.current-date-txt')

const forecastItemsContainer = document.querySelector('.forecast-items-container')

let currentWeather = null;
let forecastDays = [];
let selectedForecastIndex = 0;

searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() != '') {
        updateWeatherInfo(cityInput.value)
        cityInput.value = ''
        cityInput.blur()
    }
})

cityInput.addEventListener('keydown', (event) => {
    if (event.key == 'Enter' && cityInput.value.trim() != '') {
        updateWeatherInfo(cityInput.value)
        cityInput.value = ''
        cityInput.blur()
    }
})

async function getFetchData(endPoint, city) {
    const apiUrl = `http://127.0.0.1:8000/weather/${endPoint}?city=${encodeURIComponent(city)}`;

    const response = await fetch(apiUrl);

    return response.json();
}

function getWeatherIcon(code) {
    if (code === 1282 || code === 1279 || code === 1276 || code === 1273 || code === 1087) return 'thunderstorm.svg'
    if (code === 1150 || code === 1153 || code === 1168 || code === 1171 || code === 1072) return 'drizzle.svg'
    if (code === 1180 || code === 1183 || code === 1186 || code === 1189 || code === 1192 || code === 1195 || code === 1198 || code === 1201 || code === 1240 || code === 1243 || code === 1246 || code === 1063) return 'rain.svg'
    if (code === 1210 || code === 1213 || code === 1216 || code === 1219 || code === 1222 || code === 1225 || code === 1255 || code === 1258 || code === 1066 || code === 1114) return 'snow.svg'
    if (code === 1000) return 'clear.svg'
    if (code === 1003 || code === 1006) return 'clouds.svg'
    else return 'atmosphere.svg'
}

function getCurrentDate() {
    const currentDate = new Date()
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }

    return currentDate.toLocaleDateString('en-GB', options)
}

async function updateWeatherInfo(city) {

    const weatherData = await getFetchData('current', city);

    if (weatherData.error) {
        showDisplaySection(notFoundSection);
        return;
    }

    currentWeather = weatherData;

    selectedForecastIndex = -1;

    showCurrentWeather();

    await updateForecastsInfo(city)

    showDisplaySection(weatherInfoSection)
}

async function updateForecastsInfo(city) {

    const forecastsData = await getFetchData('forecast', city);

    forecastDays = forecastsData.forecast.forecastday;

    forecastItemsContainer.innerHTML = '';

    forecastsData.forecast.forecastday.forEach((forecastDay, index) => {
        if (index == 0) return;

        updateForecastsItems(forecastDay, index);
    });
}

function updateForecastsItems(forecastDay, index) {
    const {
        date,
        day: {
            avgtemp_c,
            condition: { code }
        }
    } = forecastDay;

    const dateTaken = new Date(date)

    const dateOption = {
        day: '2-digit',
        month: 'short'
    }

    const dateResult = dateTaken.toLocaleDateString('en-US', dateOption)

    const forecastItem = `
    <div class="forecast-item">
       <h5 class="forecast-item-date regular-txt">${dateResult}</h5>
       <img src="assets/weather/${getWeatherIcon(code)}" class="forecast-item-img">
       <h5 class="forecast-item-temp">${Math.round(avgtemp_c)} °C</h5>
    </div>
    `

    forecastItemsContainer.insertAdjacentHTML('beforeend', forecastItem)

    const forecastElement = forecastItemsContainer.lastElementChild;

    forecastElement.addEventListener("click", () => {
        selectedForecastIndex = index;
        showForecastDetails(index);
    });

}

function showForecastDetails(index) {
    const day = forecastDays[index];

    tempTxt.textContent =
        Math.round(day.day.avgtemp_c) + ' °C';

    conditionTxt.textContent =
        day.day.condition.text;

    humidityValueTxt.textContent =
        day.day.avghumidity + '%';

    windValueTxt.textContent =
        day.day.maxwind_kph + ' KM/h';

    currentDateTxt.textContent =
        new Date(day.date).toLocaleDateString(
            'en-GB',
            {
                weekday: 'short',
                day: '2-digit',
                month: 'short'
            });

    weatherSummaryImg.src =
        `assets/weather/${getWeatherIcon(day.day.condition.code)}`;
}

function showCurrentWeather() {

    const {
        location: { name },
        current: {
            temp_c,
            humidity,
            wind_kph,
            condition: { code, text }
        }
    } = currentWeather;

    countryTxt.textContent = name;

    tempTxt.textContent = Math.round(temp_c) + ' °C';
    conditionTxt.textContent = text;
    humidityValueTxt.textContent = humidity + '%';
    windValueTxt.textContent = wind_kph + ' KM/h';

    currentDateTxt.textContent = getCurrentDate();

    weatherSummaryImg.src =
        `assets/weather/${getWeatherIcon(code)}`;
}

function showDisplaySection(section) {
    [weatherInfoSection, searchCitySection, notFoundSection]
        .forEach(section => section.style.display = 'none')

    section.style.display = 'flex'
}

document.addEventListener("keydown", (event) => {

    if (event.key !== "ArrowLeft")
        return;

    if (selectedForecastIndex > 1) {

        selectedForecastIndex--;
        showForecastDetails(selectedForecastIndex);

    }
    else if (selectedForecastIndex === 1) {

        selectedForecastIndex = -1;
        showCurrentWeather();

    }

});
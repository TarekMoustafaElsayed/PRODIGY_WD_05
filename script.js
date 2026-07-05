const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');

const weatherInfoSection = document.querySelector('.weather-info')
const notFoundSection = document.querySelector('.not-found')
const searchCitySection = document.querySelector('.search-city')

searchBtn.addEventListener('click' , () => {
    if(cityInput.value.trim() != '') {
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
    const apiUrl = `https://api.weatherapi.com/v1/${endPoint}?key=${apiKey}&q=${city}`

    const response = await fetch(apiUrl)

    return response.json()
}

async function updateWeatherInfo(city) {
    const weatherData = await getFetchData('current.json', city)
    if(weatherData.error) {
        showDisplaySection(notFoundSection)
        return
    }

    showDisplaySection(weatherInfoSection)
}

function showDisplaySection(section) {
    [weatherInfoSection, searchCitySection, notFoundSection]
     .forEach(section => section.style.display = 'none')

     section.style.display = 'flex'
}
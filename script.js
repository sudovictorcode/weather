function getWeather() {
    const apikey = 'fcea6fc2836994a8931c0afcc64f8d91';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter city');
        return;
    }

    const currentWeatherURL = `'https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}'`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;


    fetch(currentWeatherURL)
    .then(response => response.json())
    .then(data=> {
        displayWeather(data);
    })
    .catch(error =>{
        console.error('Error fetching current weather data', error);
       
    });


    fetch(forecastURL)
    .then(response => response.json())
    .then(data => {
       displayHourlyForecast(data.list);
    })
    .catch(error =>{
        console.error('Error fetching hourly forecast data:', error);
        alert('Error fetching hourly forecast data. Please try again.');
    });


    function displayWeather(data) {
        const tempDivinfo = document.getElementById('temp-div')
        const weatherInfoDiv = document.getElementById('weather-info');
        const weatherIcon = document.getElementById('weather-info')
        const hourlyForecastDiv = document.getElementById('hourly-forecast');
    
        // Clear previous content
        weatherInfoDiv.innerHTML = ''
        hourlyForecastDiv.innerHTML = ''
        tempDivinfo.innerHTML = ''
    
        if (data.cod === '404') {
            weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
        }else{
            const cityName = data.name;
            const temperature = Math.round(data.main.temp - 273.15);
            const description = data.weather[0].description;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    
            const temperatureHtml = `<p>${temperature}°C</p>`;
    
            const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
            `;
            tempDivinfo.innerHTML = temperatureHtml;
            weatherInfoDiv.innerHTML = weatherHtml;
            weatherIcon.src = iconUrl;
            weatherIcon.alt = description;
    
            showImage();
        }
    }


    function displayHourlyForecast(hourlyData) {
        const hourlyForecastDiv = document.getElementById('hourly-forecast');
        const next24Hours = hourlyData.slice(0, 8);
    
        next24Hours.forEach(item => {
    
            const dataTime = new Date(item.dt * 1000);
            const hour = dataTime.getHours();
            const temperature = Math.round(item.main.temp - 273.15);
            const iconCode = item.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
    
            const hourlyItemHtml = `
            <div class="hourly-item">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="Hourly Weather Icon">
            <span>${temperature}°C</span>
            </div>
            `;
            hourlyForecastDiv.innerHTML += hourlyItemHtml
        });
    }


    
     const weatherImage =   document.getElementById('weather-icon')
     weatherImage.style.display = 'block'

    
    
    
    
    
}







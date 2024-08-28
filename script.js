const apiKey = 'fcae99916c81566b42276009eaa95b82';

document.getElementById('get-weather-btn').addEventListener('click', () => {
    const location = document.getElementById('location-input').value.trim();
    if (location) {
        fetchWeather(location);
    } else {
        alert("Please enter a location.");
    }
});

document.getElementById('get-location-weather-btn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoords(lat, lon);
        }, error => {
            alert("Error getting your location: " + error.message);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

function fetchWeather(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Weather data not found for location: ${location}`);
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            alert("Error: " + error.message);
            console.error(error);
        });
}

function fetchWeatherByCoords(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data not found for your location.');
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            alert("Error: " + error.message);
            console.error(error);
        });
}

function displayWeather(data) {
    document.getElementById('city-name').innerText = data.name;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
    document.getElementById('conditions').innerText = `Conditions: ${data.weather[0].description}`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').innerText = `Wind Speed: ${data.wind.speed} m/s`;
}
function displayWeather(data) {
    document.getElementById('city-name').innerText = data.name;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
    document.getElementById('conditions').innerText = `Conditions: ${data.weather[0].description}`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').innerText = `Wind Speed: ${data.wind.speed} m/s`;

    // Hide the "Get Weather" button after displaying weather info
    document.getElementById('get-weather-btn').style.display = 'none';
}
function displayWeather(data) {
    document.getElementById('city-name').innerText = data.name;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
    document.getElementById('conditions').innerText = `Conditions: ${data.weather[0].description}`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').innerText = `Wind Speed: ${data.wind.speed} m/s`;

    // Hide the "Get Weather" button after displaying weather info
    document.getElementById('get-weather-btn').style.display = 'none';

    // Hide the input field and display the weather image
    const locationInput = document.getElementById('location-input');
    const weatherImage = document.getElementById('weather-image');
    
    locationInput.style.display = 'none';
    weatherImage.style.display = 'block';

    // Update the image source based on weather conditions
    const weatherCondition = data.weather[0].main.toLowerCase();
    switch (weatherCondition) {
        case 'clear':
            weatherImage.src = 'images/clear.png';  // Example: sunny weather image
            break;
        case 'clouds':
            weatherImage.src = 'images/clouds.png';  // Example: cloudy weather image
            break;
        case 'rain':
            weatherImage.src = 'images/rain.png';  // Example: rainy weather image
            break;
            case 'rain':
                weatherImage.src = 'images/mist.png';  // Example: rainy weather image
                break;
        case 'snow':
            weatherImage.src = 'images/snow.png';  // Example: snowy weather image
            break;
        default:
            weatherImage.src = 'images/wind.png';  // Default weather image
            break;
    }
}

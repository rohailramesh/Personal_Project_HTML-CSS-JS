//select elements
const notification = document.querySelector('.notification');
const icon = document.querySelector('.weather-icon');
const temp_value = document.querySelector('.temperature-value p');
const temp_description = document.querySelector('.temperature-description p');
const temp_location = document.querySelector('.location p');
const show_date = document.querySelector('.date');

//App key
const key = "c4ffa2ebfcd4dc0fe70f5d2f20b7fb42";

//App data
const weather = {};
weather.temperature = {
    unit : 'celsius'
}

//Temperature units
const KELVIN = 273

//Check that browser supports user's geo location
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setLocation, errorMessage);
}
else{
    notification.style.display = 'block';
    notification.innerHTML = '<p>Brwoser does not support Geolocation</p>';
}

//Set user's location
function setLocation(location){
    let latitude = location.coords.latitude;
    let longitude = location.coords.longitude;

    getWeatherData(latitude, longitude);
}

//Display error message if problem with user's location
function errorMessage(error){
    notification.style.display = 'block';
    notification.innerHTML = `<p> ${error.message} </p>`;
}

//Get weather from the API
function getWeatherData(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api)
        .then(function(response){
            let weatherData = response.json();
            return weatherData;
        })
        .then(function(weatherData){
            weather.icon = weatherData.weather[0].icon;
            weather.temperature.value = Math.floor(weatherData.main.temp - KELVIN);
            weather.description = weatherData.weather[0].description;
            weather.city = weatherData.name;
            weather.country = weatherData.sys.country;
        })
        .then(function(){
            displayWeatherData();
        });
}

//Display weather data to the UI
function displayWeatherData(){
    show_date.innerHTML = `<h2>${Date('DD/MM/YYYY')}</h2>`;
    icon.innerHTML = `<img src="icons/${weather.icon}.png"/>`;
    temp_value.innerHTML = `<h2>${weather.temperature.value}°<span>C</span></h2> `;
    temp_description.innerHTML = `<h2>${weather.description}</h2>`;
    temp_location.innerHTML = `<h2>${weather.city}, ${weather.country} </h2> `;
    
}
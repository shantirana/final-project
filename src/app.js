let current = new Date();
let hours = current.getHours();
if (hours < 10){
    hours = `0${hours}`;
}
let minutes = current.getMinutes();
if (minutes < 10){
    minutes = `0${minutes}`;
}
let days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
]
let day = days[current.getDay()];
let currentTime = document.querySelector("#date");
currentTime.innerHTML = `${day} ${hours}:${minutes}`;

function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
    let day = days[date.getDay()];
    return day;
}



function displayForecast(response){
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML  = `<div class="row">`;
    forecast.forEach(function (forecastDay, index){
        if(index < 6){
            forecastHTML =
            forecastHTML +
            `
                <div class="col-2">
                <div class="weather-forecast-day">${formatDay(forecastDay.dt)}</div>
                <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="70">
                <div class="weather-forecast-temp">
                    <span class="weather-forecast-temp-max">${Math.round(forecastDay.temp.max)}°</span>
                    <span class="weather-forecast-temp-min">${Math.round(forecastDay.temp.min)}°</span>
                </div>
                </div>
            `;
        }
       
    });   
     forecastHTML = forecastHTML + `</div>`;
     forecastElement.innerHTML = forecastHTML;   
}

function getForecast(coordinates){
    let apiKey = "5ef4de8cd6b7fefcd7c42f98cf464ce8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response){
    console.log(response.data);
    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;

    cityElement.innerHTML = response.data.name;
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    
    getForecast(response.data.coord);

}
function search(city){
    let apiKey = "cd173a006b0e51dac58c6d8064c94178";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
                 
}

function handleSubmit(event){
    event.preventDefault();
    let inputCityElement = document.querySelector("#city-input");
    search(inputCityElement.value);
}


function displayFahrenheitTemperature(event){
    event.preventDefault();
    celsius.classList.remove("active");
    fahrenheit.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
    event.preventDefault();
    celsius.classList.add("active");
    fahrenheit.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheitTemperature);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsiusTemperature);

function searchLocation(position){
    apiKey = "645d010554ad9de36d3aed2874744589";
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayTemperature);
}
function displayCurrentLocation(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", displayCurrentLocation);

search("New York");
displayForecast();
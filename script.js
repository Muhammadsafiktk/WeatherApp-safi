const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');


async function checkWeather(city){
    city = city.trim();
    if(!city) return;

    // NAYI API KEY yahan lagayen (purani wali use na karen)
    const api_key = "621c014da6a40d77b6f6e8d740474a0c";

    // ,PK se sirf Pakistan ke shehar aayenge. units=metric se temperature seedha Celsius mein aata hai.
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},PK&units=metric&appid=${"621c014da6a40d77b6f6e8d740474a0c"}`;

    let weather_data;
    try{
        weather_data = await fetch(url).then(response => response.json());
    }catch(error){
        console.log("Network error", error);
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        return;
    }

    // Success par cod number 200 hota hai, error par string (404, 401, 400 waghaira)
    if(weather_data.cod != 200){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error", weather_data);
        return;
    }

    location_not_found.style.display = "none";
    weather_body.style.display = "flex";

    temperature.innerHTML = `${Math.round(weather_data.main.temp)}<sup>°C</sup>`;
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    // API m/s mein deti hai, 3.6 se multiply karke Km/H banta hai
    wind_speed.innerHTML = `${Math.round(weather_data.wind.speed * 3.6)} Km/H`;

    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "assets/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "assets/clear.png";
            break;
        case 'Rain':
        case 'Drizzle':
        case 'Thunderstorm':
            weather_img.src = "assets/rain.png";
            break;
        case 'Mist':
        case 'Haze':
        case 'Smoke':
        case 'Fog':
        case 'Dust':
            weather_img.src = "assets/mist.png";
            break;
        case 'Snow':
            weather_img.src = "assets/snow.png";
            break;
        default:
            weather_img.src = "assets/cloud.png";
    }

    console.log(weather_data);
}


searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});

// Enter dabane se bhi search ho
inputBox.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
        checkWeather(inputBox.value);
    }
});
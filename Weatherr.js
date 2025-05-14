import React, { useState, useEffect } from 'react';
import searchicon from './Searchicon.png';
import broken from './broken_clouds.png';
import clear from './clearsky.png';
import few from './fewclouds.png';
import mist from './mist.png';
import scatter from './scatterclouds.png';
import shower from './shower_rain.png';
import snow from './snow.png';
import thunder from './Thunder.png';
import rain from './Rain.png'
import './App.css';


function WeatherDetails({ icon, temp, city, country, lat, lon, speed, humidity }) {
    return (
        <div className='weather-details'>
            <div id="img-icon">
                <img src={icon} alt='Weather Icon' />
            </div>
            <div className='temp'>Temp - {temp}C</div>
            <div className='city'>{city}</div>
            <div className='country'>{country}</div>
            <div className='coord'>
                <div id="lat"> <span>Lat:</span>{lat} </div>
                <div id="lon"><span>Lon:</span>{lon}</div>
            </div>
            <div id="weather">
                <div className='speed'>Speed - {speed}</div>
                <div className='humidity'>Humidity - {humidity}%</div>
            </div>
        </div>
    );
}

function Weather() {
    const API_key = "71ffbe542a66947d7b24a1fe40adff8b";
    const [text, setText] = useState("chennai");
    const [icon, setIcon] = useState(clear);
    const [city, setCity] = useState("chennai");
    const [country, setCountry] = useState("IN");
    const [lon, setLon] = useState(0);
    const [lat, setLat] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [temp, setTemp] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [error, setError] = useState("");

    const weatherMap = {
        "01d": clear, "01n": clear,
        "02d": few, "02n": few,
        "03d": scatter, "03n": scatter,
        "04d": broken, "04n": broken,
        "09d": shower, "09n": shower,
        "10d": rain, "10n": rain,
        "11d": thunder, "11n": thunder,
        "13d": snow, "13n": snow,
        "50d": mist, "50n": mist,
    };

    const fetchWeather = async () => {
        try {
            setError("");
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${API_key}&units=metric`;
            const res = await fetch(url);
            const data = await res.json();

            if (data.cod === "404") {
                setError("City not found. Please try again");
            } else {
                setTemp(Math.floor(data.main.temp));
                setCity(data.name);
                setCountry(data.sys.country);
                setLat(data.coord.lat);
                setLon(data.coord.lon);
                setSpeed(data.wind.speed);
                setHumidity(data.main.humidity);
                setIcon(weatherMap[data.weather[0].icon] || clear);
            }
        } catch (e) {
            console.error("Error Fetching weather data:", e);
            setError("Failed to fetch data. Please try again later");
        }
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    return (
        <div>
            <h1>Weather Application</h1>
            <div className='container'>
                <div className='input_container'>
                    <input type='text' value={text} onChange={(e) => setText(e.target.value)} placeholder='Enter City...' />
                    <div className='searchIcon' onClick={fetchWeather}>
                        <img src={searchicon} alt='Search Icon' />
                    </div>
                </div>
                {error && <p className='error-message'>{error}</p>}
                <WeatherDetails
                    icon={icon}
                    temp={temp}
                    city={city}
                    country={country}
                    speed={speed}
                    lat={lat}
                    lon={lon}
                    humidity={humidity}
                />
            </div>
        </div>
    );
}


export default Weather;
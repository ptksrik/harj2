import React, { useState, useEffect } from 'react'
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const ICON_URL = 'https://openweathermap.org/img/wn/';
const API_KEY = '';


export default function Weather({ lat, lng }) {
    const [temperature, setTemperature] = useState(0);
    const [wind, setWind] = useState(0);
    const [direction, setDirection] = useState(0);
    const [weatherDescription, setWeatherDescription] = useState('');
    const [icon, setIcon] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        //tarkistaa mitkä arvot lat ja lng omistavat tässä komponentissa
        console.log(lat, lng);
        console.log("@ Weather.js");

        const url = API_URL + 'lat=' + lat + '&lon=' + lng + '&units=metric&appid=' + API_KEY;

        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.main !== undefined) {
                        setIsLoaded(true);
                        setTemperature(result.main.temp);
                        setWind(result.wind.speed);
                        setDirection(result.wind.deg);
                        setWeatherDescription(result.weather[0].description);
                        setIcon(ICON_URL + result.weather[0].icon + '@2x.png');
                    }
                    else {
                        alert('Could not read weather information!');
                    }
                }, (error) => {
                    alert(error);
                }
            )
    }, [])

    if (!isLoaded) {
        return <div><p>Loading..</p></div>;
    }
    else {
        return (
            <div className="row pt-3">
                <div className="pt-3 col-sm-6 text-center ownBg shadow">
                    <h3 className="ownHeader"><u>Weather at your location</u></h3>
                    <p>Temperature {temperature} &#176;C</p>
                    <p>Wind {wind} m/s {direction} degrees</p>
                    <p>Weather description</p>
                    <p>{weatherDescription}
                        <img src={icon} alt="description_icon" /></p>
                </div>
            </div>
        )
    }
}

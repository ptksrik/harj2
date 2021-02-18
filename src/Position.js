import React, { useState, useEffect } from 'react';
import Weather from './Weather.js';

export default function Position() {
 
    const [isLoaded, setIsLoaded] = useState(false);
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
                setIsLoaded(true);
            }, (error) => {
                alert(error);
            })
        }
        else {
            alert('Your browser does not support geolocation!')
        }
    }, [])

    if (!isLoaded) {
        return <div className="row px-4"><p>Searching for your location..</p></div>;
    }

    //tarkistaa mitkä arvot lat ja lng omistavat tässä komponentissa
    console.log(lat, lng);
    console.log("@ Position.js");
    return (
        <div className="p-3">
            <div className="row">
            <div className="p-3 col-sm-6 text-center ownBg shadow">
                <h3 className="pb-2 ownHeader"><u>Your location</u></h3>
                <p>Latitude: {lat.toFixed(3)}°</p>
                <p>Longitude: {lng.toFixed(3)}°</p>
            </div>
            </div>
            <Weather lat={lat} lng={lng} />
        </div>
        
    )
}

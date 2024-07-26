import React, { useRef, useEffect, useState } from "react";
import "./Content.css";
import sunrise from "./sunrise.svg";
import sunset from "./sunset.svg";

export default function Content(props) {
  let apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const [weatherData, setWeatherData] = useState({});
  
  const inputRef = useRef();

  const search = async (city) => {
    props.setProgress(10);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      props.setProgress(50);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();

      setWeatherData({
        country: data.name,
        icon: data.weather[0].icon,
        temp: data.main.temp,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        rain: data.rain ? data.rain[0] + "mm" : "N/A",
        snow: data.snow ? data.snow[0] + "mm" : "N/A",
        clouds: data.clouds.all,
        sunrise: timeConvert(data.sys.sunrise),
        sunset: timeConvert(data.sys.sunset),
      });
    } catch (error) {
      alert(`Error: ${error.message}`);
      search("Delhi");
    }
    props.setProgress(100);
  };

  useEffect(() => {
    search("Delhi");
  }, []);

  const imgUrl = `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;

  function timeConvert(t) {
    const date = new Date(t * 1000);
    const ist = date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "numeric",
    });
    return ist;
  }

  return (
    <div>
      <div className="container">
        <input ref={inputRef} type="text" placeholder="Search For Your City" />
        <button>
          <i
            class="fa-solid fa-magnifying-glass"
            onClick={() => search(inputRef.current.value)}
          ></i>
        </button>
        {weatherData && (
          <>
            <div className="city">
              <h1>{weatherData.country}</h1>
              <img src={imgUrl} alt="weather img" />
            </div>

            <div className="weather">
              <h1>{Math.floor(weatherData.temp)}°C</h1>

              <div className="weather-desc">
                <div className="weather-info">
                  <h2>{weatherData.humidity}%</h2>
                  <i className="fa-solid fa-tint"></i>
                </div>
                <div className="weather-info">
                  <h2>{weatherData.wind} m/s</h2>
                  <i className="fa-solid fa-wind"></i>
                </div>
                <div className="weather-info">
                  <h2>{weatherData.rain}</h2>
                  <i className="fa-solid fa-cloud-rain"></i>
                </div>
                <div className="weather-info">
                  <h2>{weatherData.clouds}%</h2>
                  <i className="fa-solid fa-cloud"></i>
                </div>
                <div className="weather-info">
                  <h2>{weatherData.sunrise}</h2>
                  <img src={sunrise} alt="" />
                </div>
                <div className="weather-info">
                  <h2>{weatherData.sunset}</h2>
                  <img src={sunset} alt="" />
                </div>
                <div className="weather-info">
                  <h2>{weatherData.snow}</h2>
                  <i class="fa-solid fa-snowflake"></i>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

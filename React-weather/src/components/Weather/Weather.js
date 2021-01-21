import React, { useState, useEffect } from 'react';
import Day from './Day';
import './weather.css';

const API_KEY = "cc5f5e38038949ec979eb2463943e070";

export default function Weather(props) {
  const { city, mode, updateMode } = props;

  function changeMode() {
    updateMode({});
  }

  async function getWeather(city, mode) { // отправляем запрос, получаем данные
    const api_url = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&exclude=minutely,hourly&units=metric&lang=ru&appid=${API_KEY}`);
    const data = await api_url.json();
    const daysInfo = parseWeather(data, mode);

    setDaysInfo(daysInfo);
  }

  function parseWeather(data, mode) {
    const weatherInfo = [];

    // парсим то что нужно (в зависимости от режима)
    if (mode.id === "now") {
      const { dt, temp, clouds, pressure, humidity, wind_speed, weather } = data.current;
      const { icon, description } = weather[0];

      const weather_ = {
        time: dt,
        temperature: temp,
        cloudness: clouds,
        pressure,
        humidity,
        wind: wind_speed,
        icon,
        description
      };

      weatherInfo.push(weather_);
    }
    else if (mode.id === "3days") {
      for (let i = 0; i < mode.count; i++) {
        const currentDay = data.daily[i];
        const { clouds, temp: { morn, day, eve, night }, weather } = currentDay;
        const { icon, description } = weather[0];

        const weather_ = {
          temperature: {
            morn,
            day,
            eve,
            night
          },
          cloudness: clouds,
          icon,
          description
        };

        weatherInfo.push(weather_);
      }
    }
    else if (mode.id === "5days") {
      for (let i = 0; i < mode.count; i++) {
        const currentDay = data.daily[i];
        const { clouds, temp: { min, max }, weather } = currentDay;
        const { icon, description } = weather[0];

        const weather_ = {
          temperature: {
            min,
            max
          },
          cloudness: clouds,
          icon,
          description
        };

        weatherInfo.push(weather_);
      }
    }

    return weatherInfo; // выдаем инфу в виде массива по дням
  }

  const days = [];
  const [daysInfo, setDaysInfo] = useState([]); // флаг - пришли ли данные

  useEffect(() => {
    getWeather(city, mode);
  }, []);

  const date = new Date(); // начинаем с сегодня

  for (let i = 0; i < mode.count && daysInfo.length; i++) {
    const currentDate = new Date(date);
    const day = <Day number={i} mode={mode} key={mode.id + i} weatherInfo={daysInfo[i]} currentDate={currentDate}></Day>
    days.push(day);
    date.setDate(date.getDate() + 1);
  }

  if (days.length)
    return (
      <>
        <h1>Погода в {city.where}</h1>
        <div className="weather__days">
          {days}
        </div>
        <button className="button-change" onClick={changeMode}>Сменить режим</button>
      </>
    );

  return (
    <>
      <div>
        Подождите, загрузка...
      </div>
    </>
  );

}

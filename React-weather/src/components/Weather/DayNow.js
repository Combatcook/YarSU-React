import React, { useState } from 'react';
import * as date from './date';

export default function DayNow(props) {

  const { info, currentDate } = props;

  return (
    <div className="dayNow">
      <h2 className="title-now">Сейчас {date.addZero(currentDate.getHours())}:{date.addZero(currentDate.getMinutes())}</h2>
      <div className="row">
        <div className="temperature-now">{info.temperature}°</div>
        <img src={`/images/${info.icon}.png`} alt={info.description}></img>
        <p>{info.description}</p>
      </div>
      <div className="row">
        <p className="info-now">Облачность: <span className="number">{info.cloudness}%</span></p>
        <p className="info-now">Ветер: <span className="number">{info.wind} м/с</span></p>
        <p className="info-now">Давление: <span className="number">{Math.round(info.pressure * 100 / 133.322)} мм рт.ст.</span></p>
        <p className="info-now">Влажность: <span className="number">{info.humidity}%</span></p>
      </div>
    </div>
  )
}
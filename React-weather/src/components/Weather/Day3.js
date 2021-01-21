import React, { useState } from 'react';
import * as date from './date';

export default function Day3(props) {

  const { info, currentDate } = props;

  return (
    <div className="day3">
      <div className="row">
        <h2 className="title-3days">{date.getDayOfWeek(currentDate)}, {currentDate.getDate()} {date.getMonthName(currentDate)}</h2>
        <img src={`/images/${info.icon}.png`} alt={info.description}></img>
      </div>
      <p>{info.description}</p>
      <div className="info-3days">Облачность: <span className="number">{info.cloudness}%</span></div>
      <div className="row">
        <div className="day3__card">
          <p>Ночь</p>
          <p className="temperature-3days">{info.temperature.night}°</p>
        </div>
        <div className="day3__card">
          <p>Утро</p>
          <p className="temperature-3days">{info.temperature.morn}°</p>
        </div>
        <div className="day3__card">
          <p>День</p>
          <p className="temperature-3days">{info.temperature.day}°</p>
        </div>
        <div className="day3__card">
          <p>Вечер</p>
          <p className="temperature-3days">{info.temperature.eve}°</p>
        </div>
      </div>
    </div>
  )

}
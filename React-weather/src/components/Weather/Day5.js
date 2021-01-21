import React, { useState } from 'react';
import * as date from './date';

export default function Day5(props) {

  const {info, currentDate} = props;

  return (
    <div className="day5">
      <h2 className="title-5days">{date.getDayOfWeek(currentDate)}</h2>
      <h4 className="subtitle-5days">{currentDate.getDate()} {date.getMonthName(currentDate)}</h4>
      <img src={`/images/${info.icon}.png`} alt={info.description}></img>
      <p>{info.description}</p>
      <p className="temperature-5days">{info.temperature.max}°</p>
      <p className="temperature-5days">{info.temperature.min}°</p>
      <p>Облачность: <span className="number">{info.cloudness}%</span></p>
    </div>
  ) 
}
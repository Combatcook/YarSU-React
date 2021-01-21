import React, { useState } from 'react';
import DayNow from './DayNow';
import Day3 from './Day3';
import Day5 from './Day5';

export default function Day(props) {

  const {mode, weatherInfo, currentDate} = props;

  if (mode.id === 'now') {
    return (
      <DayNow info={weatherInfo} currentDate={currentDate}>

      </DayNow>
    )
  } else if (mode.id === '3days') {
    return (
      <Day3 info={weatherInfo} currentDate={currentDate}>

      </Day3>
    )
  } else {
    return (
      <Day5 info={weatherInfo} currentDate={currentDate}>

      </Day5>
    )
  }
}
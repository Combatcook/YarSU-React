import React, { useState } from 'react';
import _data from './data';
import Mode from './Mode';
import Weather from '../Weather/Weather';

export default function Modes(props) {
  const {updateCity} = props;

  function updateMode(name) {
    setMode(name);
  }

  function changeCity() {
    updateCity({}); 
  }

  const modes = _data;
  const [mode, setMode] = useState({});
  const {city} = props;

  const listModes = modes.map( modeItem => <Mode info={modeItem} key={modeItem.id} updateMode={updateMode}></Mode>);
  
  if (!mode.id)
    return (
      <>
        <div className="modes">{listModes}</div>
        <p>Прогноз на сколько дней?</p>
        <button className="button-change" onClick={changeCity}>Сменить город</button>
      </>
    );
  
  return (
    <Weather className="weather" updateMode={updateMode} city={city} mode={mode}></Weather>
  )  
}

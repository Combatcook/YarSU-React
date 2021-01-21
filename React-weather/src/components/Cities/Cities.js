import React, { useState } from 'react';
import City from './City';
import _data from './data';
import Modes from '../Modes/Modes';

export default function Cities(props) {

  function updateCity(value) {
    setCity(value);
  }

  const cities = _data;
  const [city, setCity] = useState({});
  const listCities = cities.map( cityItem => <City info={cityItem} key={cityItem.id} updateCity={updateCity}></City>);
  
  if (!city.id)
    return (
      <>
        <div className="cities">{listCities}</div>
        <p>Выбери город!</p>
      </>
    );
  
  return (
    <Modes className="modes" updateCity={updateCity} city={city}></Modes>
  )  
}

import React from 'react';

export default function City(props) {

  const {info} = props;
  const {name, where, id, lat, lon} = props.info;

  function handleClick() {
    props.updateCity(info);
  }

  return (
    <button className="button-pick" onClick={handleClick}>{name}</button>
  )

}

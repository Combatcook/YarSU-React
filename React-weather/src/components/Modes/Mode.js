import React, { useState } from 'react';

export default function Mode(props) {

  const {info, updateMode} = props;
  const {name, count, id} = info;

  function handleClick() {
    updateMode(info);
  }

  return (
    <button className="button-pick" onClick={handleClick}>{name}</button>
  )
}
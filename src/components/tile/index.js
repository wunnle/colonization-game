import React, { Component } from 'react';

const Tile = ({ state, handleClick }) => {
  return (
    <TileHolder handleClick={handleClick}>
      {(state === 'seed') && '🌱'}
      {(state === 'lvl1') && '🏠'}
      {(state === 'lvl2') && '🚀'}
    </TileHolder>
  )
}

const TileHolder = ({ children, handleClick }) => {
  return (
    <div className="tile" onClick={handleClick}>
      {children}
    </div>
  )
}

export default Tile;
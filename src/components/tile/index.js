import React, { Component } from 'react';

const Tile = ({ level = 0, handleClick }) => {
  return (
    <TileHolder handleClick={handleClick}>
      {(level === 0) && '-'}
      {(level === 1) && '🌱'}
      {(level === 2) && '🏠'}
      {(level === 3) && '🚀'}
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
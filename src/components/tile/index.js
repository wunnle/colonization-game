import React, { Component } from 'react';

const Tile = ({ level = 0, owner, handleClick }) => {
  return (
    <TileHolder handleClick={handleClick} owner={owner}>
      {(level === 0) && '-'}
      {(level === 1) && '🌱'}
      {(level === 2) && '🏠'}
      {(level === 3) && '🚀'}
    </TileHolder>
  )
}

const TileHolder = ({ children, owner, handleClick }) => {
  return (
    <div className={`tile tile--${owner}`} onClick={handleClick}>
      {children}
    </div>
  )
}

export default Tile;